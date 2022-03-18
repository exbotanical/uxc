import type { BaseModel } from '@uxc/common';
import type { Document } from 'mongoose';

export type AsBuildArgs<T extends BaseModel> = Omit<
	T,
	'_id' | 'createdAt' | 'updatedAt'
>;

export type AsRawDocument<T> = T & { __v?: string };

export type AsReturnDocument<T> = DocumentSansId & T;

export type DocumentSansId = Omit<Document, '_id'>;

export interface UserPassword {
	password?: string;
}
