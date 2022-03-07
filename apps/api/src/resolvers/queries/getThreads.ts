import type { Resolver } from '../types';
import type {
	ObjectID,
	PrivateThread as PrivateThreadType
} from '@uxc/types/node';

import { PrivateThread } from '@/db';

/**
 * @todo paginate
 */
export const getThreads: Resolver<PrivateThreadType[], { userId: ObjectID }> =
	async (_, { userId }) => {
		const privateThreads = await PrivateThread.find({
			users: { $in: [{ _id: userId }] }
		}).populate('users');

		return privateThreads;
	};
