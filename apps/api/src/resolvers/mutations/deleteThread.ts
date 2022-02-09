import { ERROR_MESSAGES } from '@/utils/constants';
import { UserInputError } from 'apollo-server-core';
import { PrivateThread } from '@/db';
import type { ObjectID } from '@uxc/types';
import type { Resolver } from '../types';

export const deleteThread: Resolver<ObjectID, { threadId: ObjectID }> = async (
	_,
	{ threadId },
	context
) => {
	if (!threadId) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_THREAD_ID);
	}
	await PrivateThread.deleteOne({ _id: threadId });

	return threadId;
};
