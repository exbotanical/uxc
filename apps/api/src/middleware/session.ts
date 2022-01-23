import session from 'express-session';

import { buildStore } from '../redis';

const isProd = process.env.NODE_ENV === 'production';

export const sessionMiddleware = session({
	cookie: {
		httpOnly: isProd,
		maxAge: 24 * 60 * 60 * 1000,
		sameSite: true,
		secure: isProd,
		signed: true
	},
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET!,
	store: buildStore(session)
});

export type Session = typeof session;
