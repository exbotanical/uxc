import { Message as MessageType } from '@uxc/common/node';
import { Schema, model } from 'mongoose';

import type { AsBuildArgs, AsRawDocument, AsReturnDocument } from '../types';
import type { Model } from 'mongoose';

type RawDocument = AsRawDocument<MessageType>;
type ReturnDocument = AsReturnDocument<MessageType>;
type NewMessageArgs = AsBuildArgs<MessageType>;

interface MessageModel extends Model<MessageType> {
	build(attrs: NewMessageArgs): ReturnDocument;
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
			transform(_, ret: RawDocument) {
				delete ret.__v;
			}
		}
	}
);

MessageSchema.index({ body: 'text' });

MessageSchema.statics.build = (attrs) => {
	return new Message(attrs);
};

export const Message = model<MessageType, MessageModel>(
	'Message',
	MessageSchema
);
