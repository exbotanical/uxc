import type {
	User,
	ResponseOpcode,
	JWT,
	TransactionId,
	Opcode
} from '@uxc/types';

type ErroneousResult = { error: string };
type PromiseResult<R> = ErroneousResult | R;

export enum LOGGER_ACTION {
	SEND = 'send',
	RECV = 'recv'
}

export interface ErrorHandler {
	(errorMessage: string): void;
}

export interface Logger<Data = any> {
	(
		direction: LOGGER_ACTION,
		opcode: Opcode | ResponseOpcode,
		data?: Data,
		txId?: TransactionId,
		raw?: string
	): void;
}

export interface ResponseMessage<Data = any> {
	op: ResponseOpcode;
	d: Data;
	txId: TransactionId;
}

export interface SubscriberHandler<Data = any> {
	(data: Data, txId?: TransactionId): void;
}

export type Subscriber<Data = any> = SubscriberHandler<Data>;

export interface Connection {
	close: () => void;
	once: <Data = any>(opcode: Opcode, handler: SubscriberHandler<Data>) => void;
	send: <Data = any>(opcode: Opcode, data: Data, txId?: TransactionId) => void;
	subscribe: <Data = any>(
		opcode: Opcode,
		handler: SubscriberHandler<Data>
	) => () => void;
	user: User;
	wait: <T, Data = any>(
		opcode: Opcode,
		data: Data
	) => Promise<PromiseResult<T>>;
}

export interface ConnectorOptions {
	logger?: Logger;
	onError?: ErrorHandler;
	url?: string;
	waitTimeout?: number;
	shouldReconnect?: boolean;
	getAuthOptions: () => Partial<{
		accessToken: JWT;
	}>;
}

export interface Connector {
	(opts: ConnectorOptions): Promise<Connection>;
}
