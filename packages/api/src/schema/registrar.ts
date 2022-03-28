import { GraphQLDateTime } from 'graphql-iso-date';
import { isValidObjectId } from 'mongoose';

import type { Resolvers } from '@uxc/common/generated';
import type { GraphQLScalarType } from 'graphql';

import { User, Message, PrivateThread, FriendRequest } from '@/db';
import { authGuard } from '@/middleware/auth';
import {
	joinResolver as join,
	signinResolver as signin,
	signoutResolver as signout
} from '@/schema/resolvers/mutations';
import * as mutations from '@/schema/resolvers/mutations';
import {
	seedResolver as seed,
	purge
} from '@/schema/resolvers/mutations/computed';
import * as queries from '@/schema/resolvers/queries';
import {
	onThreadMessageCreated,
	onAnyMessageCreated,
	onFriendRequestSaved
} from '@/schema/resolvers/subscriptions';

export const resolvers: Resolvers = {
	Date: GraphQLDateTime as unknown as GraphQLScalarType,

	Subscription: {
		onThreadMessageCreated,
		onAnyMessageCreated,
		onFriendRequestSaved
	},

	Query: {
		getThread: authGuard(queries.getThread),
		getThreads: authGuard(queries.getThreads),
		getMessages: authGuard(queries.getMessages),
		getUser: authGuard(queries.getUser),
		getCurrentUser: authGuard(queries.getCurrentUser),
		search: authGuard(queries.search),
		searchFriends: authGuard(queries.searchFriends),
		getFriendRequests: authGuard(queries.getFriendRequests),
		getFriends: authGuard(queries.getFriends)
	},

	User: {
		__isTypeOf: (obj) => {
			return obj instanceof User;
		}
	},

	Message: {
		__isTypeOf: (obj) => {
			return obj instanceof Message;
		}
	},

	PrivateThread: {
		__isTypeOf: (obj) => {
			return obj instanceof PrivateThread;
		}
	},

	Result: {
		__resolveType: (result) => {
			if ('body' in result) {
				return 'MessageResult';
			} else if ('users' in result) {
				return 'PrivateThread';
			}

			return null;
		}
	},

	SentFriendRequest: {
		__isTypeOf: (obj) => {
			return obj instanceof FriendRequest;
		}
	},

	ReceivedFriendRequest: {
		__isTypeOf: (obj) => {
			return obj instanceof FriendRequest;
		}
	},

	FriendRequestResult: {
		__resolveType: (friendRequest) => {
			if (
				typeof friendRequest.recipient === 'object' &&
				typeof friendRequest.recipient?.username === 'string' &&
				isValidObjectId(friendRequest.requester)
			) {
				return 'SentFriendRequest';
			} else if (
				typeof friendRequest.requester === 'object' &&
				typeof friendRequest.requester?.username === 'string' &&
				isValidObjectId(friendRequest.recipient)
			) {
				return 'ReceivedFriendRequest';
			}

			return null;
		}
	},

	Mutation: {
		seed: authGuard(seed),
		purge: authGuard(purge),
		signout,
		signin,
		join,
		createMessage: authGuard(mutations.createMessage),
		updateMessage: authGuard(mutations.updateMessage),
		createThread: authGuard(mutations.createThread),
		deleteThread: authGuard(mutations.deleteThread),
		createFriendRequest: authGuard(mutations.createFriendRequest),
		updateFriendRequest: authGuard(mutations.updateFriendRequest),
		removeFriend: authGuard(mutations.removeFriend)
	}
};
