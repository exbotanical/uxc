import { ERROR_MESSAGES } from '@uxc/types/node';
import { AuthenticationError } from 'apollo-server-core';

import type { Resolver } from '../types';
import type { Friend as FriendType } from '@uxc/types/node';

import { Friend } from '@/db';

export const getFriends: Resolver<FriendType[]> = async (_, __, { req }) => {
	const userId = req.session.meta?.id;
	if (!userId) {
		throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION);
	}

	return Friend.findFriends(userId);
};
