import jwt from 'jsonwebtoken';

import type { JWT, ObjectID, JWTPayload } from '@uxc/types';

export function sign({ id, isRefresh }: { id: ObjectID; isRefresh?: boolean }) {
	const secret =
		process.env[
			isRefresh ? 'REFRESH_TOKEN_SIGNING_KEY' : 'ACCESS_TOKEN_SIGNING_KEY'
		];
	const expiresIn = isRefresh ? '7d' : '1h';

	const token = jwt.sign({ id }, secret!, {
		expiresIn,
		issuer: process.env.JWT_AUTHORITY!
	});

	return token;
}

export function verify({
	token,
	isRefresh
}: {
	token: JWT;
	isRefresh?: boolean;
}): {
	payload: JWTPayload | null;
	expired: boolean;
} {
	const secret =
		process.env[
			isRefresh ? 'REFRESH_TOKEN_SIGNING_KEY' : 'ACCESS_TOKEN_SIGNING_KEY'
		];

	try {
		const decoded = jwt.verify(token, secret!);
		return {
			expired: false,
			payload: decoded as unknown as JWTPayload
		};
	} catch (ex: any) {
		const expired =
			ex instanceof Error ? ex.message.includes('jwt expired') : false;

		return {
			expired,
			payload: null
		};
	}
}

export function decode(token: JWT) {
	return jwt.decode(token, { complete: true });
}
