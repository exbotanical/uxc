import { ERROR_MESSAGES } from '@uxc/common/node';
import { Schema, model } from 'mongoose';

import type { AsBuildArgs, AsRawDocument, AsReturnDocument } from '../types';
import type {
	ObjectID,
	FriendRequest as FriendRequestType,
	ReceivedFriendRequest,
	SentFriendRequest
} from '@uxc/common/node';
import type { Model, Query } from 'mongoose';

type RawDocument = AsRawDocument<FriendRequestType>;
type ReturnDocument = AsReturnDocument<FriendRequestType>;
type NewFriendRequestArgs = AsBuildArgs<FriendRequestType>;
type FriendRequestQuery = Query<FriendRequestType, any>;

interface FriendRequestModel extends Model<RawDocument> {
	build(attrs: NewFriendRequestArgs): ReturnDocument;
	findFriendRequestsSent(userId: ObjectID): SentFriendRequest[];
	findFriendRequestsRecv(userId: ObjectID): ReceivedFriendRequest[];
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

FriendRequestSchema.index({ requester: 1, recipient: 1 }, { unique: true });

FriendRequestSchema.path('recipient').validate(function validate(
	this: NewFriendRequestArgs & { _id: string }
) {
	// cannot send or amend friend request to self
	return (
		(this.recipient as ObjectID).toString() !==
		(this.requester as ObjectID).toString()
	);
},
ERROR_MESSAGES.E_NO_SELF_REQUEST);

FriendRequestSchema.statics.findFriendRequestsSent =
	function findFriendRequestsSent(requester: ObjectID) {
		return (
			this.find({ requester, status: 'PENDING' }) as FriendRequestQuery
		).populate('recipient');
	};

FriendRequestSchema.statics.findFriendRequestsRecv =
	function findFriendRequestsRecv(recipient: ObjectID) {
		return (
			this.find({ recipient, status: 'PENDING' }) as FriendRequestQuery
		).populate('requester');
	};

FriendRequestSchema.statics.build = (attrs: NewFriendRequestArgs) => {
	return new FriendRequest(attrs);
};

export const FriendRequest = model<FriendRequestType, FriendRequestModel>(
	'FriendRequest',
	FriendRequestSchema
);
