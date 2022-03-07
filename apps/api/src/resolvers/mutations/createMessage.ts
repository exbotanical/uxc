import { AuthenticationError, UserInputError } from 'apollo-server-core';
import { isValidObjectId } from 'mongoose';

import type { Resolver } from '../types';
import type { Message as MessageType, ObjectID } from '@uxc/types/node';

import { Message, PrivateThread } from '@/db';
import { pubsub } from '@/redis';
import { EVENTS } from '@/utils/constants';
import { ERROR_MESSAGES } from '@uxc/types/node';

export const createMessage: Resolver<
	MessageType,
	{ threadId: ObjectID; body: string }
> = async (_, { threadId, body }, { req }) => {
	const userId = req.session.meta?.id;
	if (!userId) {
		throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION);
	}

	if (!threadId) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_THREAD_ID);
	}

	if (!isValidObjectId(threadId)) {
		throw new UserInputError(
			`The provided threadId ${threadId} is not a valid ObjectID`
		);
	}

	const threadExists = await PrivateThread.exists({ _id: threadId });

	if (!threadExists) {
		throw new UserInputError(
			`The provided threadId ${threadId} does not represent a resource in the database`
		);
	}

	const message = await Message.create({
		body,
		sender: userId,
		threadId
	});

	const populatedMessage = await message.populate('sender');

	pubsub.publish(EVENTS.MESSAGE_CREATED, {
		message: populatedMessage
	});

	return message;
};
