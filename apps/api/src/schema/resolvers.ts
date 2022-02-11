/* eslint-disable sort-keys */
'@uxc/types';
import { GraphQLDateTime } from 'graphql-iso-date';

import { authGuard } from '../middleware/auth';
import { seedWrapper } from '../resolvers/seed';

import type { Resolvers } from '@uxc/types/generated';
import type { GraphQLScalarType } from 'graphql';


import {
	joinResolver as join,
	loginResolver as login,
	logoutResolver as logout
} from '@/resolvers/mutations';
import { createMessage } from '@/resolvers/mutations/createMessage';
import { createThread } from '@/resolvers/mutations/createThread';
import { deleteThread } from '@/resolvers/mutations/deleteThread';
import { updateMessage } from '@/resolvers/mutations/updateMessage';
import {
	getMessages,
	getThreads,
	getThread,
	getCurrentUser,
	getUser
} from '@/resolvers/queries';
import { onMessage } from '@/resolvers/subscriptions/onMessage';

export const resolvers: Resolvers = {
	Date: GraphQLDateTime as unknown as GraphQLScalarType,

	Subscription: {
		// @ts-expect-error
		onMessage
	},

	Query: {
		getThread: authGuard(getThread),
		getThreads: authGuard(getThreads),
		getMessages: authGuard(getMessages),
		getUser: authGuard(getUser),
		getCurrentUser: authGuard(getCurrentUser)
	},

	Mutation: {
		seed: authGuard(seedWrapper),
		logout,
		login,
		join,
		createMessage: authGuard(createMessage),
		updateMessage: authGuard(updateMessage),
		createThread: authGuard(createThread),
		deleteThread: authGuard(deleteThread)
	}
};
