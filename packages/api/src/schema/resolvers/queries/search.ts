import { ERROR_MESSAGES } from '@uxc/common/node';
import { UserInputError } from 'apollo-server-core';

import type { Resolver } from '../types';
import type {
	User as UserType,
	Message as MessageType
} from '@uxc/common/node';

import { Message, User } from '@/db';

export const search: Resolver<(MessageType | UserType)[], { query: string }> =
	async (_, { query }) => {
		if (!query) {
			throw new UserInputError(ERROR_MESSAGES.E_NO_THREAD_ID);
		}

		const textQuery = {
			$text: {
				$search: query,
				$caseSensitive: false,
				$diacriticSensitive: false
			}
		};

		const filter = { score: { $meta: 'textScore' } };
		const tasks = [];

		tasks.push(User.find(textQuery, filter));

		tasks.push(Message.find(textQuery, filter).populate('sender'));

		const ret = await Promise.all<(MessageType | UserType)[]>(tasks);

		return ret.flat();
	};
