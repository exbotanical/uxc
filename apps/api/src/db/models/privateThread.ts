import { PrivateThread as PrivateThreadType } from '@uxc/types/node';
import { Schema, model } from 'mongoose';

import type { AsRawDocument, AsBuildArgs, AsReturnDocument } from '../types';
import type { Model } from 'mongoose';

type RawDocument = AsRawDocument<PrivateThreadType>;
type ReturnDocument = AsReturnDocument<PrivateThreadType>;
type NewPrivateThreadArgs = AsBuildArgs<PrivateThreadType>;

interface PrivateThreadModel extends Model<PrivateThreadType> {
	build(attrs: NewPrivateThreadArgs): ReturnDocument;
}

const PrivateThreadSchema = new Schema(
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

PrivateThreadSchema.statics.build = (attrs) => {
	return new PrivateThread(attrs);
};

export const PrivateThread = model<PrivateThreadType, PrivateThreadModel>(
	'PrivateThread',
	PrivateThreadSchema
);
