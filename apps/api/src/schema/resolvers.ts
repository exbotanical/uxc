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
import { seed } from './seed';
import type { GraphQLScalarType } from 'graphql';
import {
	Message as MessageType,
	ObjectID,
	PrivateThread as PrivateThreadType,
	User as UserType
} from '@uxc/types';

// const query = {
// 	// getThreads: authGuard(async (_, { userId }, context) => {
// 	// 	const privateThreads = await PrivateThread.find({
// 	// 		users: { $in: [{ _id: userId }] }
// 	// 	}).populate('users');

// 	// 	return privateThreads as unknown as PrivateThreadType & {
// 	// 		users: UserType[];
// 	// 	};
// 	// }),

// 	getMessages: authGuard(async (_, { threadId }, context) => {
// 		const messages = await Message.find({ threadId }).populate('sender');

// 		return messages;
// 	}),

// 	getUser: authGuard(async (_, userId: ObjectID, { req }) => {
// 		const user = await User.findById(userId);

// 		return user;
// 	}),

// 	getCurrentUser: authGuard(async (_, __, { req }) => {
// 		const user = await User.findById(req.meta.id);

// 		return user;
// 	}),

// 	getThread: authGuard(async (_, { threadId }, context) => {
// 		const thread = await PrivateThread.findById(threadId);

// 		return thread;
// 	})
// };

// const q = Object.fromEntries(
// 	Object.entries(query).map(([key, value]) => {
// 		return [key, authGuard(value)];
// 	})
// );

export const resolvers: Resolvers = {
	Date: GraphQLDateTime as unknown as GraphQLScalarType,

	Query: {
		getThread: authGuard(async (_, { threadId }, context) => {
			const thread = await PrivateThread.findById(threadId);

			return thread;
		}),

		getThreads: authGuard(async (_, { userId }, context) => {
			const privateThreads = await PrivateThread.find({
				users: { $in: [{ _id: userId }] }
			}).populate('users');

			return privateThreads;
		}),

		getMessages: authGuard(async (_, { threadId }, context) => {
			const messages = await Message.find({ threadId }).populate('sender');

			return messages;
		}),

		getUser: authGuard(async (_, userId: ObjectID, { req }) => {
			const user = await User.findById(userId);

			return user;
		}),

		getCurrentUser: authGuard(async (_, __, { req }) => {
			const user = await User.findById(req.meta.id);

			return user;
		})
	},

	Mutation: {
		seed,
		logout,
		login,
		join,
		createMessage: authGuard(async (_, { threadId, body }, { req }) => {
			const message = await Message.create({
				body,
				threadId,
				sender: req.meta.id
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
			const message = await PrivateThread.create({
				users: [req.meta.id, receiverId]
			});

			return message;
		}),

		deleteThread: authGuard(async (_, { threadId }, context) => {
			await PrivateThread.deleteOne({ _id: threadId });

			return threadId;
		})
	}
};
