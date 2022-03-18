import { ERROR_MESSAGES } from '@uxc/common/node';
import { AuthenticationError } from 'apollo-server-core';

import type { Resolver } from '../types';
import type { PopulatedFriendRequest } from '@uxc/common/node';

import { FriendRequest } from '@/db';

export const getFriendRequests: Resolver<
	PopulatedFriendRequest[],
	{ type: 'RECV' | 'SENT' }
> = (_, { type }, { req }) => {
	const userId = req.session.meta?.id;
	if (!userId) {
		throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION);
	}

	if (type === 'SENT') {
		return FriendRequest.findFriendRequestsSent(userId);
	}

	return FriendRequest.findFriendRequestsRecv(userId);
};
