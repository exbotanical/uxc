import mongoose from 'mongoose';
import type { RefType } from 'mongoose';

export type AllNullable<T> = { [K in keyof T]: T[K] | null };
export type AllNullableOrUndef<T> = { [K in keyof T]?: T[K] | null };

export type ObjectID = string;

export type JWT = string;

export type UnixTimestamp = number;

export interface JWTPayload {
	id: ObjectID;
	iat: UnixTimestamp;
	exp: UnixTimestamp;
	iss: string;
}

export type PopulatedDoc<
	PopulatedType,
	RawId extends RefType = PopulatedType extends { _id?: RefType }
		? NonNullable<PopulatedType['_id']>
		: mongoose.Types.ObjectId
> = PopulatedType | RawId;
