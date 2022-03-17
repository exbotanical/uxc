import { Schema, model } from 'mongoose';

import type { AsBuildArgs, AsRawDocument, AsReturnDocument } from '../types';
import type { ObjectID, Friend as FriendType } from '@uxc/types/node';
import type { Model } from 'mongoose';

type RawDocument = AsRawDocument<FriendType>;
type ReturnDocument = AsReturnDocument<FriendType>;
type NewFriendArgs = AsBuildArgs<FriendType>;

interface FriendModel extends Model<RawDocument> {
	build(attrs: NewFriendArgs): ReturnDocument;
	findFriends(id: ObjectID): Promise<FriendType[]>;
}

const FriendSchema = new Schema<FriendType>(
	{
		friendNodeX: {
			ref: 'User',
			required: true,
			type: Schema.Types.ObjectId
		},
		friendNodeY: {
			ref: 'User',
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

FriendSchema.statics.findFriends = function findFriends(id: ObjectID) {
	return this.find({
		$or: [
			{
				friendNodeX: id
			},
			{
				friendNodeY: id
			}
		]
	});
};

FriendSchema.statics.build = (attrs) => {
	return new Friend(attrs);
};

export const Friend = model<RawDocument, FriendModel>('Friend', FriendSchema);
