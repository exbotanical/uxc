import { PrivateThread as PrivateThreadType } from '@uxc/types';
import { Schema, model } from 'mongoose';

import type { Model, Document } from 'mongoose';

interface ReturnDocument {
	_id?: PrivateThreadType['_id'];
	__v?: string;
}

type NewPrivateThreadAttrs = Pick<PrivateThreadType, 'users'>;

interface PrivateThreadDocument
	extends PrivateThreadType,
		Omit<Document, '_id'> {}

interface PrivateThreadModel extends Model<PrivateThreadType> {
	build(attrs: NewPrivateThreadAttrs): PrivateThreadDocument;
}

const PrivateThreadSchema = new Schema(
	{
		users: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true
			}
		]
	},
	{
		timestamps: true,
		toJSON: {
			transform(_, ret: ReturnDocument) {
				delete ret.__v;
			}
		}
	}
);

PrivateThreadSchema.statics.build = (attrs: NewPrivateThreadAttrs) => {
	return new PrivateThread(attrs);
};

export const PrivateThread = model<PrivateThreadType, PrivateThreadModel>(
	'PrivateThread',
	PrivateThreadSchema
);