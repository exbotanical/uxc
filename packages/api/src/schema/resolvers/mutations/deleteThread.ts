import { ERROR_MESSAGES } from '@uxc/common/node';
import { isValidObjectId } from 'mongoose';

import type { Resolver } from '../types';
import type { ObjectID } from '@uxc/common/node';

import { PrivateThread } from '@/db';
import { UserInputError } from '@/services/error';

export const deleteThread: Resolver<ObjectID, { threadId: ObjectID }> = async (
	_,
	{ threadId }
) => {
	if (!threadId) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_THREAD_ID);
	}

	if (!isValidObjectId(threadId)) {
		throw new UserInputError(
			`The provided threadId ${threadId} is not a valid ObjectID.`
		);
	}

	// @todo soft delete so we don't delete for both users
	await PrivateThread.deleteOne({ _id: threadId });

	return threadId;
};
