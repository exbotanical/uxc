import WebSocket from 'isomorphic-ws';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { v4 as generateUuid } from 'uuid';

import { deserialize, serialize, toResponseCode } from './serialize';
import { LOGGER_ACTION } from './types';

import type {
	ResponseMessage,
	Subscriber,
	Connection,
	Connector,
	SubscriberHandler
} from './types';
import type { User, TransactionId, Opcode, ResponseOpcode } from '@uxc/types';

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
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			WebSocket,
			connectionTimeout
		});

		const subscribersMap = new Map<ResponseOpcode, Set<Subscriber>>();

		const getSubscriptions = (opcode: Opcode) => {
			const responseCode = toResponseCode(opcode);

			let subscriptions = subscribersMap.get(responseCode);

			if (!subscriptions) {
				subscribersMap.set(responseCode, (subscriptions = new Set()));
			}

			return subscriptions;
		};

		const send = (opcode: Opcode, data: any, txId?: TransactionId) => {
			if (socket.readyState !== socket.OPEN) {
				return;
			}

			const raw = serialize(opcode, data, txId);

			socket.send(raw);

			logger(LOGGER_ACTION.SEND, opcode, data, txId, raw);
		};

		socket.addEventListener('close', (error) => {
			logger(
				LOGGER_ACTION.RECV,
				'error',
				null,
				undefined,
				JSON.stringify(error)
			);

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

			if (!shouldReconnect) {
				reject(error);
			}
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
			if (typeof e.data !== 'string') {
				return;
			}

			if (e.data === 'ack') {
				return;
			}

			const message: ResponseMessage = deserialize(e.data);

			logger(LOGGER_ACTION.RECV, message.op, message.d, message.txId, e.data);

			if (message.op === 'authorize:reply') {
				const user = (message as ResponseMessage<User>).d;

				if (!user) {
					reject(new Error('failed to load user session'));
				}

				const connection: Connection = {
					close: socket.close,

					once: (opcode, handler) => {
						const subscriptions = getSubscriptions(opcode);

						const subscription: SubscriberHandler = (...args) => {
							handler(...args);
							subscriptions.delete(subscription);
						};

						subscriptions.add(subscription);
					},

					send,
					subscribe: (opcode, handler) => {
						const subscriptions = getSubscriptions(opcode);

						subscriptions.add(handler);

						// cleanup function for `useEffect` et al
						return () => subscriptions.delete(handler);
					},

					user,

					wait: async <T>(opcode: Opcode, args: unknown) => {
						// eslint-disable-next-line promise/param-names
						return new Promise<T>((resolveWait, rejectWait) => {
							if (socket.readyState !== socket.OPEN) {
								rejectWait(new Error('websocket not connected TODO'));
								return;
							}

							const ref: TransactionId = generateUuid();

							let timeoutId: NodeJS.Timeout | null = null;

							const unsubscribe = connection.subscribe(opcode, (data, txId) => {
								if (txId !== ref) {
									return;
								}

								if (timeoutId) {
									clearTimeout(timeoutId);
								}

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
				subscribersMap.get(message.op)?.forEach((handler) => {
					handler(message.d, message.txId);
				});
			}
		});
	});
};
