import { User } from '@/db';
import { ERROR_MESSAGES } from '@/utils/constants';
import { AuthenticationError } from 'apollo-server-core';
import type { User as UserType } from '@uxc/types';
import type { Resolver } from '../types';

export const getCurrentUser: Resolver<UserType> = async (_, __, { req }) => {
	const userId = req?.session?.meta?.id;
	if (!userId) {
		throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION);
	}

	const user = await User.findById(userId);

	return user;
};
