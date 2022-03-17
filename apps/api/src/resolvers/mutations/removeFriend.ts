import { ERROR_MESSAGES } from '@uxc/types/node';
import { UserInputError } from '@/services/error';
import { isValidObjectId } from 'mongoose';

import type { Resolver } from '../types';
import type { ObjectID } from '@uxc/types/node';
import { Friend } from '@/db';
import { AuthenticationError } from 'apollo-server-core';

export const removeFriend: Resolver<ObjectID, { friendId: ObjectID }> = async (
	_,
	{ friendId },
	{ req }
) => {
	const userId = req.session.meta?.id;
	if (!userId) {
		throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION);
	}

	if (!friendId) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_FRIEND_ID);
	}

	if (!isValidObjectId(friendId)) {
		throw new UserInputError(
			`The provided friendId ${friendId} is not a valid ObjectID.`
		);
	}

	const deletedFriend = await Friend.findOneAndDelete({
		$and: [
			{
				id: friendId
			},
			{
				$or: [
					{
						friendNodeX: userId
					},
					{
						friendNodeY: userId
					}
				]
			}
		]
	});

	return deletedFriend?._id || null;
};
