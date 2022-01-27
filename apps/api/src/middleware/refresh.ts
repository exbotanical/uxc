import type { User } from '@uxc/types';
import type { NextFunction, Request, Response } from 'express';
import { decode, verify } from '../utils';
import { createSession } from '../utils/auth';

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
		req.user = payload;
		return next();
	}

	const { payload: refresh } =
		expired && refreshToken
			? verify({ token: refreshToken, isRefresh: true })
			: { payload: null };

	if (!refresh) {
		return next();
	}

	const session = createSession(refresh.uuid);
	const decoded = decode(session.accessToken);
	console.log({ decoded });

	const { payload: user } = decoded!;
	req.user = user as User;

	Object.assign(req.session, session);

	return next();
}
