import { ERROR_MESSAGES } from '@uxc/common/node';
import { AuthenticationError, UserInputError } from 'apollo-server-core';

import type { Resolver } from '../types';
import type {
	PrivateThread as PrivateThreadType,
	Message as MessageType
} from '@uxc/common/node';

import { Message, PrivateThread } from '@/db';

/**
 * @todo Test.
 * @todo Filter: ensure messages from friends of current user.
 * @todo Replace thread filter; use filtered query via mongo server.
 * @todo Escape query input.
 */
export const search: Resolver<
	(MessageType | PrivateThreadType)[],
	{ query: string }
> = async (_, { query }, { req }) => {
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

	const filter = {
		score: { $meta: 'textScore' }
	};

	const tasks = [
		Message.find(
			{
				...textQuery,
				users: { $in: [{ _id: userId }] }
			},
			filter
		)
			.populate('sender')
			.limit(10),
		PrivateThread.find({
			users: { $in: [{ _id: userId }] }
		})
			.populate('users')
			.limit(10)
			.then((records) =>
				records.filter((record) => {
					return record.users.filter((user) =>
						user.username.toLowerCase().includes(query.toLowerCase())
					).length;
				})
			)
	];

	const resolved = await Promise.all<(MessageType | PrivateThreadType)[]>(
		tasks
	);

	const results = resolved
		.filter((result) => !!Object.keys(result).length)
		.flat();

	return results;
};
