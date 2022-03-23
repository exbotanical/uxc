import { Schema, model } from 'mongoose';

import type { AsBuildArgs, AsRawDocument, AsReturnDocument } from '../types';
import type { ObjectID, Friend as FriendType } from '@uxc/common/node';
import type { Model, Query } from 'mongoose';

type RawDocument = AsRawDocument<FriendType>;
type ReturnDocument = AsReturnDocument<FriendType>;
type NewFriendArgs = AsBuildArgs<FriendType>;
type FriendQuery = Query<FriendType, any>;

interface FriendModel extends Model<RawDocument> {
	build(attrs: NewFriendArgs): ReturnDocument;
	findFriends(
		currentUserId: ObjectID,
		otherFilters?: Record<string, any>[],
		options?: Record<string, any>
	): Promise<FriendType[]>;
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

FriendSchema.statics.findFriends = function findFriends(
	currentUserId: ObjectID,
	otherFilters?: Record<string, any>[],
	options?: Record<string, any>
) {
	return (
		this.find(
			{
				$or: [
					{
						friendNodeX: currentUserId
					},
					{
						friendNodeY: currentUserId
					}
				],
				...(otherFilters ? otherFilters : [])
			},
			options || {}
		) as FriendQuery
	)
		.populate('friendNodeX')
		.populate('friendNodeY');
};

FriendSchema.statics.build = (attrs) => {
	return new Friend(attrs);
};

export const Friend = model<RawDocument, FriendModel>('Friend', FriendSchema);
