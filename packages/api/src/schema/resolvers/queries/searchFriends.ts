import { ERROR_MESSAGES } from '@uxc/common/node';
import { AuthenticationError } from 'apollo-server-core';

import type { Resolver } from '../types';
import type {
	FriendRequestOptions,
	SearchFriendsResult
} from '@uxc/common/node';

import { Friend, FriendRequest } from '@/db';
import { Document } from 'mongodb';

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

	const friends = await Friend.findFriends(userId);

	const ret: SearchFriendsResult = {
		friends: query
			? friends.filter((friend) =>
					friend.username.toLowerCase().includes(query.toLowerCase())
			  )
			: friends,
		sent: [],
		received: []
	};

	if (type === 'RECV' || type === 'BOTH') {
		const received: Document[] = await FriendRequest.findFriendRequestsRecv(
			userId
		);

		ret.received.push(
			...(query
				? received.filter((request) =>
						request.requester.username
							.toLowerCase()
							.includes(query.toLowerCase())
				  )
				: received
			).map(({ requester, _id }) => ({ ...requester._doc, requestId: _id }))
		);
	}

	if (type === 'SENT' || type === 'BOTH') {
		const sent: Document[] = await FriendRequest.findFriendRequestsSent(userId);

		ret.sent.push(
			...(query
				? sent.filter((request) =>
						request.recipient.username
							.toLowerCase()
							.includes(query.toLowerCase())
				  )
				: sent
			).map(({ recipient, _id }) => ({ ...recipient._doc, requestId: _id }))
		);
	}

	return ret;
};
