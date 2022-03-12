import { GraphQLDateTime } from 'graphql-iso-date';

import type { Resolvers } from '@uxc/types/generated';
import type { GraphQLScalarType } from 'graphql';

import { authGuard } from '@/middleware/auth';
import {
	joinResolver as join,
	signinResolver as signin,
	signoutResolver as signout
} from '@/resolvers/mutations';
import { seedWrapper, purge } from '@/resolvers/mutations/computed';
import { createMessage } from '@/resolvers/mutations/createMessage';
import { createThread } from '@/resolvers/mutations/createThread';
import { deleteThread } from '@/resolvers/mutations/deleteThread';
import { updateMessage } from '@/resolvers/mutations/updateMessage';
import {
	getMessages,
	getThreads,
	getThread,
	getCurrentUser,
	getUser,
	search
} from '@/resolvers/queries';
import {
	onThreadMessageCreated,
	onAnyMessageCreated
} from '@/resolvers/subscriptions';

export const resolvers: Resolvers = {
	Date: GraphQLDateTime as unknown as GraphQLScalarType,

	Subscription: {
		onThreadMessageCreated,
		onAnyMessageCreated
	},

	Query: {
		getThread: authGuard(getThread),
		getThreads: authGuard(getThreads),
		getMessages: authGuard(getMessages),
		getUser: authGuard(getUser),
		getCurrentUser: authGuard(getCurrentUser),
		search: authGuard(search)
	},

	// User: {
	// 	__isTypeOf: (obj) => {
	// 		return obj instanceof User;
	// 	}
	// },

	// Message: {
	// 	__isTypeOf: (obj) => {
	// 		return obj instanceof Message;
	// 	}
	// },

	Mutation: {
		seed: authGuard(seedWrapper),
		purge: authGuard(purge),
		signout,
		signin,
		join,
		createMessage: authGuard(createMessage),
		updateMessage: authGuard(updateMessage),
		createThread: authGuard(createThread),
		deleteThread: authGuard(deleteThread)
	}
};
