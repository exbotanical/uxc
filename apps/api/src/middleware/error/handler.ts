import { BaseError } from '.';

import type { Request, Response, NextFunction } from 'express';

export const errorhandler = (
	err: Error,
	_: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof BaseError) {
		return res.status(err.statusCode).send(err.serialize());
	}

	res.status(400).send({
		errors: [{ message: 'unknown error' }],
		friendly: 'An unknown error occurred'
	});

	next();
};
