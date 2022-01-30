import { BaseError } from '.';

import type { Request, Response, NextFunction } from 'express';

export const errorhandler = (
	err: Error,
	_: Request,
	res: Response,
	next: NextFunction
) => {
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
