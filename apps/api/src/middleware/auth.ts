import { UnauthorizedError } from './error';
import type { NextFunction, Request, Response } from 'express';

export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!req.user) {
		throw new UnauthorizedError();
	}

	return next();
}
