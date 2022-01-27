import type { User } from '@uxc/types';
import type { Request, Response } from 'express';
import { BadRequestError } from '../middleware';
import { compare, createSession } from '../utils/auth';

import { messages, user } from '../state';

function getUser(email: string) {
	return user;
}

export async function loginController(
	{ email, password }: { email: string; password: string },
	req: Request
) {
	const user = getUser(email);

	if (!user) {
		throw new BadRequestError('invalid credentials');
	}

	// const isCorrectPassword = await compare(user.password, password);
	// if (!isCorrectPassword) {
	// 	throw new BadRequestError('invalid credentials');
	// }

	const { uuid: id } = user;

	Object.assign(req.session, createSession(id));
	console.log({ SESSION: req.session });
	return user;
}
