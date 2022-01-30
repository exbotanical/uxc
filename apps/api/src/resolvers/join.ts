import { BadRequestError } from '@/middleware';
import { createSession } from '@/utils';
import isEmail from 'isemail';

import { User } from '@/db';
import type {
	InputMaybe,
	JoinInput,
	MutationResolvers
} from '@uxc/types/generated';
import { UserInputError } from 'apollo-server-core';
import { ERROR_MESSAGES } from '@/utils/constants';

export const joinResolver: MutationResolvers['join'] = async (
	_,
	{ args },
	{ req }
) => {
	const { email, password, username, userImage, currentRoomId } =
		validateInputs(args);

	const userExists = await User.findOne({
		$or: [{ email }, { username }]
	});

	if (userExists) {
		throw new BadRequestError('Email or username in use');
	}

	const newUser = User.build({
		email,
		password,
		username,
		userImage,
		currentRoomId
	});

	await newUser.save();

	Object.assign(req.session, createSession(newUser._id));

	return newUser;
};

function validateInputs(args?: InputMaybe<JoinInput>) {
	if (!args) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_CREDENTIALS);
	}

	const { email, password, username, userImage, currentRoomId } = args;

	if (!email) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_EMAIL);
	}

	if (!password) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_PASSWORD);
	}

	if (!username) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_USERNAME);
	}

	if (!isEmail.validate(email, { minDomainAtoms: 2 })) {
		throw new UserInputError(ERROR_MESSAGES.E_INVALID_EMAIL);
	}

	if (password.length <= 6) {
		throw new UserInputError(ERROR_MESSAGES.E_SHORT_PASSWORD);
	}

	if (password.length >= 21) {
		throw new UserInputError(ERROR_MESSAGES.E_LONG_PASSWORD);
	}

	if (username.length <= 4) {
		throw new UserInputError(ERROR_MESSAGES.E_SHORT_USERNAME);
	}

	if (username.length >= 21) {
		throw new UserInputError(ERROR_MESSAGES.E_LONG_USERNAME);
	}

	if (userImage != null && typeof userImage !== 'string') {
		throw new UserInputError(ERROR_MESSAGES.E_INVALID_PROGRAMMATIC_INPUTS);
	}

	if (currentRoomId != null && typeof currentRoomId !== 'string') {
		throw new UserInputError(ERROR_MESSAGES.E_INVALID_PROGRAMMATIC_INPUTS);
	}
	return { email, password, username, userImage, currentRoomId };
}
