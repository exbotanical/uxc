import { Schema, model } from 'mongoose';

import type { Model, Document } from 'mongoose';
import { Message as MessageType } from '@uxc/types';

type ReturnDocument = {
	_id?: MessageType['_id'];
	__v?: string;
};

interface MessageDocument extends MessageType, Omit<Document, '_id'> {}

interface MessageModel extends Model<MessageType> {
	build(
		attrs: Omit<MessageType, '_id' & 'createdAt' & 'updatedAt'>
	): MessageDocument;
}

const MessageSchema = new Schema(
	{
		roomId: {
			type: Schema.Types.ObjectId,
			ref: 'DirectRoom',
			required: true
		},
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		body: {
			type: String,
			required: true
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

MessageSchema.statics.build = (
	attrs: Omit<MessageType, '_id' & 'createdAt' & 'updatedAt'>
) => {
	return new Message(attrs);
};

export const Message = model<MessageType, MessageModel>(
	'Message',
	MessageSchema
);
