import { PrivateThread } from '@/db';
import type { ObjectID, PrivateThread as PrivateThreadType } from '@uxc/types';
import type { Resolver } from '../types';

/**
 * @todo paginate
 */
export const getThreads: Resolver<PrivateThreadType[], { userId: ObjectID }> =
	async (_, { userId }, context) => {
		const privateThreads = await PrivateThread.find({
			users: { $in: [{ _id: userId }] }
		}).populate('users');

		return privateThreads;
	};
