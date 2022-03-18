import {
	EMAIL_CHARS_MAX,
	ERROR_MESSAGES,
	PASSWORD_CHARS_MAX,
	PASSWORD_CHARS_MIN,
	USERNAME_CHARS_MAX,
	USERNAME_CHARS_MIN
} from '@uxc/common/node';
import isEmail from 'isemail';

import type {
	InputMaybe,
	JoinInput,
	MutationResolvers
} from '@uxc/common/generated';

import { User } from '@/db';
import { BadRequestError, UserInputError } from '@/services/error';
import { createSession } from '@/utils';

export const joinResolver: MutationResolvers['join'] = async (
	_,
	{ args },
	{ req }
) => {
	const { email, password, username, userImage } = validateInputs(args);

	const userExists = await User.findOne({
		$or: [{ email }, { username }]
	});

	if (userExists) {
		throw new BadRequestError(
			ERROR_MESSAGES.E_CREDENTIALS_TAKEN_FRIENDLY,
			ERROR_MESSAGES.E_CREDENTIALS_TAKEN
		);
	}

	const newUser = User.build({
		email,
		password,
		userImage: userImage ?? null,
		username
	});

	await newUser.save();

	Object.assign(req.session, createSession(newUser._id));
	return newUser;
};

function validateInputs(args?: InputMaybe<JoinInput>) {
	if (!args) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_CREDENTIALS, '*');
	}

	const { email, password, username, userImage } = args;

	if (!email) {
		throw new UserInputError(ERROR_MESSAGES.E_INVALID_EMAIL, 'email');
	}

	if (!password) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_NEW_PASSWORD, 'password');
	}

	if (!username) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_USERNAME, 'username');
	}

	if (email.length > EMAIL_CHARS_MAX) {
		throw new UserInputError(ERROR_MESSAGES.E_INVALID_EMAIL, 'email');
	}

	if (!isEmail.validate(email, { minDomainAtoms: 2 })) {
		throw new UserInputError(ERROR_MESSAGES.E_INVALID_EMAIL, 'email');
	}

	if (password.length < PASSWORD_CHARS_MIN) {
		throw new UserInputError(ERROR_MESSAGES.E_SHORT_PASSWORD, 'password');
	}

	if (password.length > PASSWORD_CHARS_MAX) {
		throw new UserInputError(ERROR_MESSAGES.E_LONG_PASSWORD, 'password');
	}

	if (username.length < USERNAME_CHARS_MIN) {
		throw new UserInputError(ERROR_MESSAGES.E_SHORT_USERNAME, 'username');
	}

	if (username.length > USERNAME_CHARS_MAX) {
		throw new UserInputError(ERROR_MESSAGES.E_LONG_USERNAME, 'username');
	}

	// @todo @tmp
	if (userImage != null && typeof userImage !== 'string') {
		throw new UserInputError(
			ERROR_MESSAGES.E_INVALID_PROGRAMMATIC_INPUTS,
			'userImage'
		);
	}

	return { email, password, userImage, username };
}
