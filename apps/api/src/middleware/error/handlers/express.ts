import { BaseError } from '..';

import type { Request, Response, NextFunction } from 'express';
import { logger } from '@/services/logger';

/**
 * Handle errors that pass through the Apollo server and onto the Express server instance.
 */
export const expressErrorHandler = (
	err: Error,
	_: Request,
	res: Response,
	next: NextFunction
) => {
	logger.error('express error handler', err);

	// status codes will take effect in express but will be overridden in apollo
	// which is what we want; the errors will propagate and be formatted per gql spec
	if (err instanceof BaseError) {
		return res.status(err.statusCode).send(err.serialize());
	}

	res.status(400).send({
		errors: [{ message: 'unknown error' }],
		friendly: 'An unknown error occurred'
	});

	next();
};
