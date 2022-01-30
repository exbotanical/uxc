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
			required: true
		},
		sender: {
			type: Schema.Types.ObjectId,
			required: true
		},
		body: {
			type: String,
			required: true
		},
		on: {
			type: 'ObjectId',
			required: true,
			refPath: 'onModel'
		},
		onModel: {
			type: String,
			required: true,
			enum: ['Room', 'DirectRoom']
		}
	},
	{
		timestamps: true,

		// modify internal `toJSON` method to serialize the user object sans password, __v;
		// convert mongo-specific `_id` to a db-agnostic format
		toJSON: {
			// mongoose types are terrible here
			transform(_, ret: ReturnDocument) {
				// @ts-expect-error
				delete ret.password;
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
