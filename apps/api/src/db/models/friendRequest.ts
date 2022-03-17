import { Schema, model } from 'mongoose';
import { ERROR_MESSAGES } from '@uxc/types/node';

import type {
	ObjectID,
	FriendRequest as FriendRequestType,
	PopulatedFriendRequest
} from '@uxc/types/node';
import type { Model } from 'mongoose';
import type { AsBuildArgs, AsRawDocument, AsReturnDocument } from '../types';

type RawDocument = AsRawDocument<FriendRequestType>;
type ReturnDocument = AsReturnDocument<FriendRequestType>;
type NewFriendRequestArgs = AsBuildArgs<FriendRequestType>;

interface FriendRequestModel extends Model<RawDocument> {
	build(attrs: NewFriendRequestArgs): ReturnDocument;
	findFriendRequestsSent(userId: ObjectID): Promise<PopulatedFriendRequest[]>;
	findFriendRequestsRecv(userId: ObjectID): Promise<PopulatedFriendRequest[]>;
}

const FriendRequestSchema = new Schema<FriendRequestType>(
	{
		requester: {
			ref: 'User',
			required: true,
			type: Schema.Types.ObjectId
		},
		recipient: {
			ref: 'User',
			required: true,
			type: Schema.Types.ObjectId
		},
		status: {
			type: String,
			enum: ['PENDING', 'REJECTED', 'ACCEPTED'],
			default: 'PENDING'
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

FriendRequestSchema.path('recipient').validate(function (
	this: NewFriendRequestArgs & { _id: string }
) {
	// cannot send or amend friend request to self
	return this.recipient.toString() !== this.requester.toString();
},
ERROR_MESSAGES.E_NO_SELF_REQUEST);

FriendRequestSchema.statics.findFriendRequestsSent = async function (
	requester
) {
	return await this.find({ requester, status: 'PENDING' }).populate(
		'recipient'
	);
};

FriendRequestSchema.statics.findFriendRequestsRecv = async function (
	recipient
) {
	return await this.find({ recipient, status: 'PENDING' }).populate(
		'requester'
	);
};

FriendRequestSchema.statics.build = (attrs: NewFriendRequestArgs) => {
	return new FriendRequest(attrs);
};

export const FriendRequest = model<FriendRequestType, FriendRequestModel>(
	'FriendRequest',
	FriendRequestSchema
);
