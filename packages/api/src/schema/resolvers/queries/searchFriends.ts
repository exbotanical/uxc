import { ERROR_MESSAGES } from '@uxc/common/node';
import { AuthenticationError, UserInputError } from 'apollo-server-core';

import type { Resolver } from '../types';
import type { User as UserType } from '@uxc/common/node';

import { Friend } from '@/db';

/**
 * @todo Test.
 * @todo Filter: ensure messages from friends of current user.
 * @todo Escape query input.
 */
export const searchFriends: Resolver<UserType[], { query: string }> = async (
	_,
	{ query },
	{ req }
) => {
	const userId = req.session.meta?.id;
	if (!userId) {
		throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION);
	}

	if (!query) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_QUERY);
	}

	const friends = await Friend.findFriends(userId);

	const ret = friends.filter((friend) =>
		friend.username.toLowerCase().includes(query.toLowerCase())
	);

	return ret;
};
