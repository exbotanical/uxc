import WebSocket from 'isomorphic-ws';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { v4 as generateUuid } from 'uuid';

import type { UUID, JWT } from '@/types/const';

import { User } from '@/types/user';

/*
	BEGIN TYPES

	These will be relocated to an external package
	TODO, FIXME
*/

/* ID Types */

type TransactionID = UUID;

/* Opcodes */
type AuthCode = 'authenticate' | 'authorize' | 'logout' | 'renew';
type CommandCode = 'create_channel' | 'message';
type QueryCode = 'channel' | 'message';
type SysCode = 'ack' | 'error' | 'syn';

// TODO use discriminated union
type ResponseOpcode =
	| Omit<SysCode, 'syn'>
	| 'authenticate:reply'
	| 'authorize:reply'
	| 'channel:reply'
	| 'create_channel:reply'
	| 'message:reply'
	| 'renew:reply';

type Opcode = AuthCode | CommandCode | QueryCode | SysCode;

interface ErrorHandler {
	(errorMessage: string): void;
}

interface Logger {
	(
		direction: 'recv' | 'send',
		opcode: Opcode | ResponseOpcode,
		data?: unknown,
		txId?: TransactionID,
		raw?: string
	): void;
}

interface ResponseMessage<Data = unknown> {
	op: ResponseOpcode;
	d: Data;
	txId: TransactionID;
}

interface SubscriberHandler<Data = unknown> {
	(data: Data, txId?: TransactionID): void;
}

interface Subscriber<Data = unknown> {
	opcode: Opcode | ResponseOpcode;
	handler: SubscriberHandler<Data>;
}

type BaseConnectionSender = (
	opcode: Opcode,
	data: unknown,
	txId?: TransactionID
) => void;

export interface Connection {
	close: () => void;
	once: <Data = unknown>(
		opcode: ResponseOpcode,
		handler: SubscriberHandler<Data>
	) => void;
	send: BaseConnectionSender;
	subscribe: <Data = unknown>(
		opcode: Opcode,
		handler: SubscriberHandler<Data>
	) => () => void;
	user: User;
	wait: (opcode: Opcode, data: unknown) => Promise<unknown>;
}

interface ConnectorOptions {
	logger?: Logger;
	onError?: ErrorHandler;
	url?: string;
	waitTimeout?: number;
	shouldReconnect?: boolean;
	getAuthOptions: () => Partial<{
		accessToken: JWT;
	}>;
}

interface Connector {
	(opts: ConnectorOptions): Promise<Connection>;
}

/*
	END TYPES
*/

const heartbeatInterval = 8000;
const apiUrl = 'ws://localhost:5000';
const connectionTimeout = 15000;

export const connect: Connector = async ({
	logger = () => {},
	onError = () => {},
	waitTimeout,
	getAuthOptions,
	shouldReconnect,
	url = apiUrl
}) => {
	return new Promise((resolve, reject) => {
		const socket = new ReconnectingWebSocket(url, [], {
			WebSocket,
			connectionTimeout
		});

		const subscribers: Subscriber[] = [];

		const send: BaseConnectionSender = (opcode, data, txId) => {
			if (socket.readyState !== socket.OPEN) {
				return;
			}

			const raw = `{"op":"${opcode}","d":${JSON.stringify(data)}${
				txId ? `,"txId":"${txId}"` : ''
			}}`;

			socket.send(raw);

			logger('send', opcode, data, txId, raw);
		};

		/** ***********************
		 * Event Registrations
		 *************************/
		socket.addEventListener('close', (error) => {
			logger('recv', 'error', null, undefined, JSON.stringify(error));

			const errorMessage = 'The socket connection has closed.';
			const timeoutInSeconds = connectionTimeout / 1000;
			const reconnectMessage = shouldReconnect
				? ` Please try refreshing if it does not reconnect in ${timeoutInSeconds} seconds.`
				: '';

			const defaultMsg = errorMessage + reconnectMessage;
			switch (error.code) {
				case 4000:
				case 4001:
				case 4003:
				case 4004:
				default:
					onError(defaultMsg);
					socket.close();
			}

			if (!shouldReconnect) reject(error);
		});

		socket.addEventListener('open', () => {
			const id = setInterval(() => {
				if (socket.readyState === socket.CLOSED) {
					clearInterval(id);
				} else {
					socket.send('syn');
				}
			}, heartbeatInterval);

			send('authorize', {
				...getAuthOptions()
			});
		});

		socket.addEventListener('message', (e) => {
			// we want to maintain the connection, so we poll
			if (e.data === 'ack') {
				return;
			}

			const message: ResponseMessage = JSON.parse(e.data); // TODO verify

			logger('recv', message.op, message.d, message.txId, e.data);

			// presumably, the first message is the response to our auth request with which we initiated the connection
			// we reply to the caller with the entire core API, `Connection`
			if (message.op === 'authorize:reply') {
				const user = (message as ResponseMessage<User>).d;

				if (!user) {
					reject(new Error('failed to load user session'));
				}

				// TODO relocate connection to external module
				const connection: Connection = {
					close: socket.close,

					once: (opcode, handler) => {
						const subscriber = {
							handler,
							opcode
						} as Subscriber;

						// we proxy the original handler so we can remove the subscriber once invoked
						subscriber.handler = (...args) => {
							handler(...(args as Parameters<typeof handler>));
							subscribers.splice(subscribers.indexOf(subscriber), 1);
						};

						subscribers.push(subscriber);
					},

					send,
					// TODO TS does not verify the opcode type
					subscribe: (opcode, handler) => {
						const listener = {
							handler,
							opcode: `${opcode}:reply`
						} as Subscriber;

						subscribers.push(listener);

						// cleanup function for `useEffect` et al
						return () => subscribers.splice(subscribers.indexOf(listener), 1);
					},

					user,

					wait: async (opcode: Opcode, args: unknown) => {
						// eslint-disable-next-line promise/param-names
						return new Promise((resolveWait, rejectWait) => {
							if (socket.readyState !== socket.OPEN) {
								rejectWait(new Error('websocket not connected TODO'));
								return;
							}

							const ref: TransactionID = generateUuid();

							let timeoutId: NodeJS.Timeout | null = null;

							const unsubscribe = connection.subscribe(opcode, (data, txId) => {
								if (txId !== ref) return;

								if (timeoutId) clearTimeout(timeoutId);

								unsubscribe();

								resolveWait(data);
							});

							if (waitTimeout) {
								timeoutId = setTimeout(() => {
									unsubscribe();
									rejectWait(new Error('timed out TODO'));
								}, waitTimeout);
							}

							send(opcode, args, ref);
						});
					}
				};

				resolve(connection);
			} else {
				// it's not an auth response, invoke any subscribers
				subscribers
					.filter(({ opcode }) => opcode === message.op)
					.forEach((it) => {
						it.handler(message.d, message.txId);
					});
			}
		});
	});
};
