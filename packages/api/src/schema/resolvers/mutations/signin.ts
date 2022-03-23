import { ERROR_MESSAGES } from '@uxc/common/node';

import type {
	InputMaybe,
	SigninInput,
	MutationResolvers
} from '@uxc/common/generated';

import { User } from '@/db';
import { BadRequestError, UserInputError } from '@/services/error';
import { compare, createSession } from '@/utils/auth';

export const signinResolver: MutationResolvers['signin'] = async (
	_,
	{ args },
	{ req }
) => {
	const { email, password } = validateInputs(args);

	const user = await User.findOne({ email });

	if (!user) {
		throw new BadRequestError(ERROR_MESSAGES.E_INVALID_CREDENTIALS);
	}

	const isCorrectPassword = await compare(user.password!, password);
	if (!isCorrectPassword) {
		throw new BadRequestError(ERROR_MESSAGES.E_INVALID_CREDENTIALS);
	}

	Object.assign(req.session, createSession(user._id));

	return user;
};

function validateInputs(args?: InputMaybe<SigninInput>) {
	if (!args) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_CREDENTIALS);
	}

	const { email, password } = args;

	if (!email) {
		throw new UserInputError(ERROR_MESSAGES.E_INVALID_EMAIL, 'email');
	}

	if (!password) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_PASSWORD, 'password');
	}

	return {
		email,
		password
	};
}
