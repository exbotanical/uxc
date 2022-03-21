import { ERROR_MESSAGES } from '@uxc/common/node';
import { AuthenticationError, UserInputError } from 'apollo-server-core';

import type { Resolver } from '../types';
import type { Friend as FriendType } from '@uxc/common/node';

import { Friend } from '@/db';

const filter = {
	score: { $meta: 'textScore' }
};

/**
 * @todo Test.
 * @todo Filter: ensure messages from friends of current user.
 * @todo Escape query input.
 */
export const searchFriends: Resolver<FriendType[], { query: string }> = async (
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

	const textQuery = {
		$text: {
			$search: query,
			$caseSensitive: false,
			$diacriticSensitive: false
		}
	};

	const resolved = await Friend.findFriends(userId, [textQuery], filter);

	const results = resolved
		.filter((result) => !!Object.keys(result).length)
		.flat();

	return results;
};
