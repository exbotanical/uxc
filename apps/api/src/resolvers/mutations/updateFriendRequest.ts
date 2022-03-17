import { ERROR_MESSAGES } from '@uxc/types/node';
import type { ObjectID, Context } from '@uxc/types/node';

import { FriendRequest, User } from '@/db';
import { AuthenticationError } from 'apollo-server-core';
import { logger } from '@/services/logger';
import { pubsub } from '@/redis';
import { EVENTS } from '@/utils/constants';
import { UserInputError } from '@/services/error';
import { isValidObjectId } from 'mongoose';
import { ObjectId } from 'mongodb';

interface UpdateFriendRequestArgs {
	requestId?: ObjectID | null;
	status?: string | null;
}

export const updateFriendRequest = async (
	_: Record<string, unknown>,
	{ requestId, status }: UpdateFriendRequestArgs,
	{ req }: Context
): Promise<ObjectID | null> => {
	const maybeRecipient = req.session.meta?.id;
	if (!maybeRecipient) {
		throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION);
	}

	if (!requestId) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_REQUESTID);
	}

	if (!status) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_REQUEST_STATUS);
	}

	if (!isValidObjectId(requestId)) {
		throw new UserInputError(
			`The provided requestId ${requestId} is not a valid ObjectID.`
		);
	}

	const requestExists = await FriendRequest.exists({ _id: requestId });

	if (!requestExists) {
		throw new UserInputError(
			`The provided requestId ${requestId} does not represent a resource in the database.`
		);
	}

	const friendRequest = await FriendRequest.findOne({ _id: requestId });

	// only the recipient may edit friend requests
	if (maybeRecipient?.toString() === friendRequest?.requester?.toString()) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_SELF_REQUEST_EDIT);
	}

	// if the status is not to be changed (for whatever reason), quietly return without executing an update op
	if (friendRequest?.status === status) {
		return friendRequest._id || null;
	}

	// unfortunately, mongoose gives us few options here; we must use `findOneAndUpdate` lest we lose the return document.
	// furthermore, we cannot implement any validation on the found doc prior to saving, hence the use of a preceding `findOne`.
	const populatedFriendRequest = await FriendRequest?.findOneAndUpdate(
		{ _id: requestId },
		{
			status
		}
	).populate('requester');

	pubsub.publish(EVENTS.FRIEND_REQUEST_SAVED, {
		friendRequest: [populatedFriendRequest]
	});

	return friendRequest?._id || null;
};
