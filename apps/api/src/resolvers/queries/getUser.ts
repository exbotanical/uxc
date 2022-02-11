import { User } from '@/db';
import { ERROR_MESSAGES } from '@/utils/constants';
import type { ObjectID, User as UserType } from '@uxc/types';
import { UserInputError } from 'apollo-server-core';
import { isValidObjectId } from 'mongoose';
import type { Resolver } from '../types';

export const getUser: Resolver<UserType, { userId: ObjectID }> = async (
	_,
	{ userId },
	{ req }
) => {
	if (!userId) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_USER_ID);
	}

	if (!isValidObjectId(userId)) {
		throw new UserInputError(
			`The provided userId ${userId} is not a valid ObjectID`
		);
	}
	const user = await User.findById(userId);

	return user;
};
