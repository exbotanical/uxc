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
		next();
		return;
	}

	const { payload, expired } = verify({ token: accessToken });

	if (payload) {
		req.session.meta = payload;
		next();
		return;
	}

	const { payload: refresh } =
		expired && refreshToken
			? verify({
					isRefresh: true,
					token: refreshToken
			  })
			: { payload: null };

	if (!refresh) {
		next();
		return;
	}

	const session = createSession(refresh.id);
	const decoded = decode(session.accessToken);

	const { payload: meta } = decoded!;

	Object.assign(req.session, session, { meta });

	next();
}
