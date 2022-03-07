import { Message as MessageType } from '@uxc/types';
import { Schema, model } from 'mongoose';

import type { Model, Document } from 'mongoose';

interface ReturnDocument {
	_id?: MessageType['_id'];
	__v?: string;
}

type NewMessage = Omit<MessageType, '_id' | 'createdAt' | 'updatedAt'>;

interface MessageDocument extends MessageType, Omit<Document, '_id'> {}

interface MessageModel extends Model<MessageType> {
	build(attrs: NewMessage): MessageDocument;
}

const MessageSchema = new Schema(
	{
		body: {
			required: true,
			type: String,
			index: true
		},
		sender: {
			ref: 'User',
			required: true,
			type: Schema.Types.ObjectId
		},
		threadId: {
			ref: 'PrivateThread',
			required: true,
			type: Schema.Types.ObjectId
		}
	},
	{
		timestamps: true,
		toJSON: {
			transform(_, ret: ReturnDocument) {
				delete ret.__v;
			}
		}
	}
);

MessageSchema.index({ body: 'text' });

MessageSchema.statics.build = (attrs: NewMessage) => {
	return new Message(attrs);
};

export const Message = model<MessageType, MessageModel>(
	'Message',
	MessageSchema
);
