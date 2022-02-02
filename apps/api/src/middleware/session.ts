import session from 'express-session';

import { buildStore } from '@/redis';
import { isInsecureMode } from '@/utils';

export const sessionMiddleware = session({
	cookie: {
		httpOnly: !isInsecureMode,
		maxAge: 24 * 60 * 60 * 1000,
		sameSite: !isInsecureMode,
		secure: !isInsecureMode,
		signed: true
	},
	name: 'sid',
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET!,
	store: buildStore(session)
});

export type SessionMiddleware = typeof session;
