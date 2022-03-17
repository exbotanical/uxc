import { ERROR_MESSAGES } from '@uxc/types/node';
import type { ObjectID, Context, User as UserType } from '@uxc/types/node';

import { Friend, FriendRequest, User } from '@/db';
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

	const populatedFriendRequest = await FriendRequest.findOne({
		_id: requestId
	}).populate('requester');

	if (!populatedFriendRequest) {
		return null;
	}

	const { requester } = populatedFriendRequest as { requester: UserType };

	// only the recipient may edit friend requests
	if (maybeRecipient.toString() === requester._id.toString()) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_SELF_REQUEST_EDIT);
	}

	// if the status is not to be changed (for whatever reason), quietly return without executing an update op
	if (populatedFriendRequest.status === status) {
		return populatedFriendRequest._id || null;
	}

	if (status === 'REJECTED') {
		populatedFriendRequest?.deleteOne();
	}

	if (status === 'ACCEPTED') {
		populatedFriendRequest?.deleteOne();

		Friend.create({
			friendNodeX: maybeRecipient,
			friendNodeY: requester
		});
	}

	pubsub.publish(EVENTS.FRIEND_REQUEST_SAVED, {
		friendRequest: [Object.assign(populatedFriendRequest, status)]
	});

	return populatedFriendRequest._id;
};
