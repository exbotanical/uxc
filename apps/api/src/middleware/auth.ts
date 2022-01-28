import { UnauthorizedError } from './error';
import type { Context } from '@uxc/types';
import { buildWrapResolver } from './wrapResolver';

export async function authMiddleware({ req }: Context) {
	if (!req.user) {
		throw new UnauthorizedError();
	}
}

export const authGuard = buildWrapResolver(authMiddleware);
