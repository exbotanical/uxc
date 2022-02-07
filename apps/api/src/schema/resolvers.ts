/* eslint-disable sort-keys */

import type { Resolvers } from '@uxc/types/generated';
import { authGuard } from '../middleware/auth';
import {
	joinResolver as join,
	loginResolver as login,
	logoutResolver as logout
} from '@/resolvers';
import { GraphQLDateTime } from 'graphql-iso-date';
import { User, Message, PrivateThread } from '@/db';
import { seed } from '../resolvers/seed';
import type { GraphQLScalarType } from 'graphql';
import { ObjectID } from '@uxc/types';
import { pubsub } from '@/redis';
import { withFilter } from 'graphql-subscriptions';

const EVENTS = {
	MESSAGE_CREATED: 'MESSAGE_CREATED'
};

export const resolvers: Resolvers = {
	Date: GraphQLDateTime as unknown as GraphQLScalarType,

	Subscription: {
		onMessage: {
			// @ts-ignore
			subscribe: withFilter(
				() => pubsub.asyncIterator([EVENTS.MESSAGE_CREATED]),
				(payload, { threadId }) => {
					return payload.onMessage[0].threadId === threadId;
				}
			)
		}
	},

	Query: {
		getThread: authGuard(async (_, { threadId }, context) => {
			const thread = await PrivateThread.findById(threadId).populate('users');

			return thread;
		}),

		getThreads: authGuard(async (_, { userId }, context) => {
			const privateThreads = await PrivateThread.find({
				users: { $in: [{ _id: userId }] }
			}).populate('users');

			return privateThreads;
		}),

		getMessages: authGuard(async (_, { threadId }, context) => {
			/**  @todo paginate */
			/**  @todo deduplicate sender */
			const messages = await Message.find({ threadId }).populate('sender');

			return messages;
		}),

		getUser: authGuard(async (_, userId: ObjectID, { req }) => {
			const user = await User.findById(userId);

			return user;
		}),

		getCurrentUser: authGuard(async (_, __, { req }) => {
			const user = await User.findById(req.session.meta.id);

			return user;
		})
	},

	Mutation: {
		seed: authGuard(seed),
		logout,
		login,
		join,
		createMessage: authGuard(async (_, { threadId, body }, { req }) => {
			const message = await Message.create({
				body,
				threadId,
				sender: req.session.meta.id
			});

			pubsub.publish(EVENTS.MESSAGE_CREATED, {
				onMessage: [message]
			});

			return message;
		}),

		updateMessage: authGuard(async (_, { messageId, body }, { req }) => {
			const message = await Message.findOneAndUpdate(
				{ _id: messageId },
				{ body }
			);

			return message._id;
		}),

		createThread: authGuard(async (_, { receiverId }, { req }) => {
			const thread = await PrivateThread.create({
				users: [req.session.meta.id, receiverId]
			});

			return thread;
		}),

		deleteThread: authGuard(async (_, { threadId }, context) => {
			await PrivateThread.deleteOne({ _id: threadId });

			return threadId;
		})
	}
};
