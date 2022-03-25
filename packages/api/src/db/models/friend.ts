import { Schema, model } from 'mongoose';

import type { AsBuildArgs, AsRawDocument, AsReturnDocument } from '../types';
import type { User, ObjectID, Friend as FriendType } from '@uxc/common/node';
import type { Model, Query } from 'mongoose';

type RawDocument = AsRawDocument<FriendType>;
type ReturnDocument = AsReturnDocument<FriendType>;
type NewFriendArgs = AsBuildArgs<FriendType>;
type FriendsQuery = Query<FriendType[], any>;

interface FriendModel extends Model<RawDocument> {
	build(attrs: NewFriendArgs): ReturnDocument;
	findFriends(currentUserId: ObjectID): Promise<User[]>;
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

FriendSchema.index({ '$**': 'text' });

FriendSchema.index({ friendNodeX: 1, friendNodeY: 1 }, { unique: true });

FriendSchema.statics.findFriends = async function findFriends(
	currentUserId: ObjectID
) {
	const friendsX = (
		this.find({
			friendNodeY: currentUserId
		}) as FriendsQuery
	).populate('friendNodeX');

	const friendsY = (
		this.find({
			friendNodeX: currentUserId
		}) as FriendsQuery
	).populate('friendNodeY');

	const [x, y] = await Promise.all([friendsX, friendsY]);

	return [
		...x.map((friend) => friend.friendNodeX),
		...y.map((friend) => friend.friendNodeY)
	];
};

FriendSchema.statics.build = (attrs) => {
	return new Friend(attrs);
};

export const Friend = model<RawDocument, FriendModel>('Friend', FriendSchema);
