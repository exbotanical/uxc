import { ERROR_MESSAGES } from '@uxc/types/node';
import { AuthenticationError } from 'apollo-server-core';

import type { Resolver } from '../types';
import type { FriendRequest } from '@uxc/types/node';

import { User } from '@/db';

export const getFriendRequests: Resolver<FriendRequest[]> = async (
	_,
	__,
	{ req }
) => {
	const userId = req.session.meta?.id;
	if (!userId) {
		throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION);
	}

	const friendRequests = await User.findFriendRequestsSent(userId);

	return friendRequests;
};
