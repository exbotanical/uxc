import { ERROR_MESSAGES } from '@uxc/types/node';
import { AuthenticationError } from 'apollo-server-core';

import { buildWrapResolver } from './wrapResolver';

import type { Context } from '@uxc/types/node';


export function authMiddleware({ req }: Context) {
	if (!req.session.meta) {
		throw new AuthenticationError(ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED);
	}
}

export const authGuard = buildWrapResolver(authMiddleware);
