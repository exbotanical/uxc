import session from 'express-session';

import { buildStore } from '@/redis';
import { isTestRuntime } from '@/utils';

export const sessionMiddleware = session({
	cookie: {
		httpOnly: !isTestRuntime,
		maxAge: 24 * 60 * 60 * 1000,
		sameSite: !isTestRuntime,
		secure: !isTestRuntime,
		signed: true
	},
	name: 'sid',
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET || 'secret',
	store: buildStore(session)
});

export type SessionMiddleware = typeof session;
