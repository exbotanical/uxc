import { ERROR_MESSAGES } from '@uxc/common/node';
import { AuthenticationError, UserInputError } from 'apollo-server-core';

import type { Resolver } from '../types';
import type {
	FriendRequestOptions,
	SearchFriendsResult
} from '@uxc/common/node';

import { Friend, FriendRequest } from '@/db';

/**
 * @todo Test.
 * @todo Filter: ensure messages from friends of current user.
 * @todo Escape query input.
 */
export const searchFriends: Resolver<
	SearchFriendsResult,
	{ query: string; type: FriendRequestOptions }
> = async (_, { query, type }, { req }) => {
	const userId = req.session.meta?.id;
	if (!userId) {
		throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION);
	}

	if (!query) {
		throw new UserInputError(ERROR_MESSAGES.E_NO_QUERY);
	}

	const friends = await Friend.findFriends(userId);

	const ret: SearchFriendsResult = {
		friends: friends.filter((friend) =>
			friend.username.toLowerCase().includes(query.toLowerCase())
		),
		sent: [],
		received: []
	};

	if (type === 'RECV' || type === 'BOTH') {
		const received = await FriendRequest.findFriendRequestsRecv(userId);

		ret.received.push(
			...received
				.filter((request) =>
					request.requester.username.toLowerCase().includes(query.toLowerCase())
				)
				.map(({ requester }) => requester)
		);
	}

	if (type === 'SENT' || type === 'BOTH') {
		const sent = await FriendRequest.findFriendRequestsSent(userId);

		ret.sent.push(
			...sent
				.filter((request) =>
					request.recipient.username.toLowerCase().includes(query.toLowerCase())
				)
				.map(({ recipient }) => recipient)
		);
	}

	return ret;
};
