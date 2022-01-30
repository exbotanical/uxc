import { Schema, model } from 'mongoose';

import type { Model, Document } from 'mongoose';
import { DirectRoom as DirectRoomType } from '@uxc/types';

type ReturnDocument = {
	_id?: DirectRoomType['_id'];
	__v?: string;
};

interface DirectRoomDocument extends DirectRoomType, Omit<Document, '_id'> {}

interface DirectRoomModel extends Model<DirectRoomType> {
	build(
		attrs: Omit<DirectRoomType, '_id' & 'createdAt' & 'updatedAt'>
	): DirectRoomDocument;
}

const DirectRoomSchema = new Schema(
	{
		users: {
			type: [Schema.Types.ObjectId],
			required: true
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

DirectRoomSchema.statics.build = (
	attrs: Omit<DirectRoomType, '_id' & 'createdAt' & 'updatedAt'>
) => {
	return new DirectRoom(attrs);
};

export const DirectRoom = model<DirectRoomType, DirectRoomModel>(
	'DirectRoom',
	DirectRoomSchema
);
