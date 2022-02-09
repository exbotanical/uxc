export type AllNullable<T> = { [K in keyof T]: T[K] | null };
export type AllNullableOrUndef<T> = { [K in keyof T]?: T[K] | null };

export type ObjectID = string;

export type JWT = string;

export type UNIX_TS = number;

export interface JWTPayload {
	id: ObjectID;
	iat: UNIX_TS;
	exp: UNIX_TS;
	iss: string;
}
