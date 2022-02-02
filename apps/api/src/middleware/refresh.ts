import type { JWTPayload, User } from '@uxc/types';
import type { NextFunction, Request, Response } from 'express';
import { decode, verify } from '@/utils';
import { createSession } from '@/utils/auth';

export function refreshMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { accessToken, refreshToken } = req.session;
	if (!accessToken) {
		return next();
	}

	const { payload, expired } = verify({ token: accessToken });

	if (payload) {
		req.meta = payload;
		return next();
	}

	const { payload: refresh } =
		expired && refreshToken
			? verify({ token: refreshToken, isRefresh: true })
			: { payload: null };

	if (!refresh) {
		return next();
	}

	const session = createSession(refresh.id);
	const decoded = decode(session.accessToken);

	const { payload: meta } = decoded!;

	req.meta = meta as JWTPayload;

	Object.assign(req.session, session);

	return next();
}
