import type { Document } from 'mongoose';
import type { BaseModel } from '@uxc/types';

export type AsBuildArgs<T extends BaseModel> = Omit<
	T,
	'_id' | 'createdAt' | 'updatedAt'
>;

export type AsRawDocument<T> = T & { __v?: string };

export type AsReturnDocument<T> = T & DocumentSansId;

export type DocumentSansId = Omit<Document, '_id'>;

export type UserPassword = { password?: string };
