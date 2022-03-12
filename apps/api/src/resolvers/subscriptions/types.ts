import type { ObjectID, MessageWithSender } from '@uxc/types/node';

export interface SocketContext {
	id: ObjectID;
}

export interface WithMessage {
	message: MessageWithSender;
}
