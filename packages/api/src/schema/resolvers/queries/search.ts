import { ERROR_MESSAGES } from '@uxc/common/node';
import { AuthenticationError, UserInputError } from 'apollo-server-core';

import type { Resolver } from '../types';
import type {
	PrivateThread as PrivateThreadType,
	Message as MessageType
} from '@uxc/common/node';

import { Message, PrivateThread } from '@/db';

type PopulatedMessage = MessageType & { threadId: PrivateThreadType };

const filter = {
	score: { $meta: 'textScore' }
};

/**
 * @todo Filter: ensure messages from friends of current user.
 * @todo Filter: ensure threads from friends of current user.
 * @todo Replace thread filter; use filtered query via mongo server.
 * @todo Escape query input.
 */
export const search: Resolver<
	(PopulatedMessage | PrivateThreadType)[],
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

	const messageTask = Message.find(
		{
			...textQuery
		},
		filter
	)
		.populate({
			path: 'threadId',
			populate: {
				path: 'users',
				match: {
					_id: userId
				}
			}
		})
		.populate('sender')
		.limit(10)
		.then((records) => {
			return records.filter(
				(record) =>
					!!(record.threadId as PrivateThreadType).users.filter(
						(user) => !!user // eslint-disable-line @typescript-eslint/no-unnecessary-condition
					).length
			) as PopulatedMessage[];
		});

	const threadTask = PrivateThread.find({
		users: { $in: [{ _id: userId }] }
	})
		.populate('users')
		.then((records) =>
			records
				.filter(({ users }) => {
					let keep = 0;

					users.forEach(({ _id, username }) => {
						// always increment for the current user; if other user, only increment if our query matches
						if (
							_id === userId ||
							username.toLowerCase().includes(query.toLowerCase())
						) {
							keep |= 1;
						}
					});

					return keep === 1;
				})
				.slice(0, 11)
		);

	const tasks = [messageTask, threadTask];

	const resolved = await Promise.all<(PopulatedMessage | PrivateThreadType)[]>(
		tasks
	);

	const results = resolved
		.filter((result) => !!Object.keys(result).length)
		.flat();

	return results;
};
