import { ObjectID, PrivateThread as PrivateThreadType } from '@uxc/common/node';
import { Schema, model } from 'mongoose';

import type { AsRawDocument, AsBuildArgs, AsReturnDocument } from '../types';
import type { Model, Query } from 'mongoose';

type RawDocument = AsRawDocument<PrivateThreadType>;
type ReturnDocument = AsReturnDocument<PrivateThreadType>;
type NewPrivateThreadArgs = AsBuildArgs<PrivateThreadType>;
type PrivateThreadQuery = Query<PrivateThreadType, any>;

interface PrivateThreadModel extends Model<PrivateThreadType> {
	build(attrs: NewPrivateThreadArgs): ReturnDocument;
	findUserThreads(userId: ObjectID): PrivateThreadType[];
}

const PrivateThreadSchema = new Schema<PrivateThreadType>(
	{
		users: [
			{
				ref: 'User',
				required: true,
				type: Schema.Types.ObjectId
			}
		]
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

PrivateThreadSchema.index({ '$**': 'text' });

PrivateThreadSchema.statics.findUserThreads = function findUserThreads(
	userId: ObjectID
) {
	return (
		this.find({
			users: { $in: [{ _id: userId }] }
		}) as PrivateThreadQuery
	).populate('users');
};

PrivateThreadSchema.statics.build = (attrs) => {
	return new PrivateThread(attrs);
};

export const PrivateThread = model<RawDocument, PrivateThreadModel>(
	'PrivateThread',
	PrivateThreadSchema
);
