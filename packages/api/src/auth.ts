import jwt from 'jsonwebtoken';

import type { JWT, User } from '@uxc/types';
import { user } from './state';

/** @todo */
const SECRET = 'w';

function validateToken(token: JWT, refreshToken: JWT) {
	return token && refreshToken;
}

function resolveUser(req, res, next) {
	req.user = req.session.user;
	return next();
}

export async function authOnConnect({ token, refreshToken }, sock) {
	if (validateToken(token, refreshToken)) {
		console.log('HERE');
	}

	/** @tmp */
	return {
		currentUser: user
	};
}
