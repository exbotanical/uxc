import { ERROR_MESSAGES } from '@uxc/common/node';
import { AuthenticationError } from 'apollo-server-core';
import { MongoServerError } from 'mongodb';
import { isValidObjectId, Error as MongooseError } from 'mongoose';

import type { ObjectID, Context } from '@uxc/common/node';

import { FriendRequest, User } from '@/db';
import { pubsub } from '@/redis';
import { BadRequestError, UserInputError } from '@/services/error';
import { EVENTS } from '@/utils/constants';

interface CreateFriendRequestArgs {
	recipientId?: ObjectID | null;
}

/**
 * @todo Remove friend model. Just use accepted friend request documents as "friends".
 */
export const createFriendRequest = async (
	_: Record<string, unknown>,
	{ recipientId: recipient }: CreateFriendRequestArgs,
	{ req }: Context
): Promise<ObjectID | null> => {
	const requester = req.session.meta?.id;
	if (!requester) {
		throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION);
	}

	if (!recipient) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_RECIPIENT);
	}

	if (!isValidObjectId(recipient)) {
		throw new UserInputError(
			// @todo store all error templates in lib/types
			`The provided recipientId ${recipient} is not a valid ObjectID.`
		);
	}

	const userExists = await User.exists({ _id: recipient });

	if (!userExists) {
		throw new UserInputError(
			`The provided recipientId ${recipient} does not represent a resource in the database.`
		);
	}

	try {
		const friendRequest = await FriendRequest.create({
			recipient,
			requester
		});

		const populatedFriendRequest = await friendRequest.populate('requester');

		pubsub.publish(EVENTS.FRIEND_REQUEST_SAVED, {
			friendRequest: [populatedFriendRequest]
		});

		return populatedFriendRequest._id;
	} catch (ex) {
		let internal;

		if (ex instanceof Error) {
			if (
				ex instanceof MongooseError.ValidationError &&
				'recipient' in ex.errors
			) {
				throw new UserInputError(ex.errors.recipient.message);
			}

			if (
				ex.name === 'MongoServerError' &&
				(ex as MongoServerError).code === 11000
			) {
				throw new UserInputError(ERROR_MESSAGES.E_DUPE_FRIEND_RQ, ex.message);
			}

			internal = ex.message;
		}

		throw new BadRequestError(
			ERROR_MESSAGES.E_GENERIC_FRIENDLY,
			(internal || ex) as string
		);
	}
};
