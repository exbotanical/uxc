import { PrivateThread } from '@/db';
import type {
	ObjectID,
	User,
	PrivateThread as PrivateThreadType
} from '@uxc/types';
import type { Resolver } from '../types';

export const getThread: Resolver<
	PrivateThreadType & { users: User[] },
	{ threadId: ObjectID }
> = async (_, { threadId }, context) => {
	const thread = await PrivateThread.findById(threadId).populate('users');

	return thread;
};
