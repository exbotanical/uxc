import { BadRequestError } from '@/middleware';
import { compare, createSession } from '@/utils/auth';

import { User } from '@/db';
import type {
	InputMaybe,
	LoginInput,
	MutationResolvers
} from '@uxc/types/generated';
import { UserInputError } from 'apollo-server-core';
import { ERROR_MESSAGES } from '@/utils/constants';

export const loginResolver: MutationResolvers['login'] = async (
	_,
	{ args },
	{ req }
) => {
	const { email, password } = validateInputs(args);

	const user = await User.findOne({ email });
	if (!user) {
		throw new BadRequestError(ERROR_MESSAGES.E_INVALID_CREDENTIALS);
	}

	const isCorrectPassword = await compare(user.password, password);
	if (!isCorrectPassword) {
		throw new BadRequestError(ERROR_MESSAGES.E_INVALID_CREDENTIALS);
	}

	Object.assign(req.session, createSession(user._id));

	return user;
};

function validateInputs(args?: InputMaybe<LoginInput>) {
	if (!args) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_CREDENTIALS);
	}

	const { email, password } = args;

	if (!email) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_EMAIL);
	}

	if (!password) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_PASSWORD);
	}

	return { email, password };
}
