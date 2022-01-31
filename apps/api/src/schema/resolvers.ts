/* eslint-disable sort-keys */

// import { pubsub } from '../redis';

// import type { Message } from '@uxc/types';
import type { Resolvers } from '@uxc/types/generated';
import { authGuard } from '../middleware/auth';
import { joinResolver, loginResolver, logoutResolver } from '@/resolvers';
import { GraphQLDateTime } from 'graphql-iso-date';
import { User, Message, DirectRoom } from '@/db';
import { seed } from './seed';

const subscribers: (() => void)[] = [];

const onMessageUpdates = (fn: () => Promise<void>) => {
	subscribers.push(fn);
};

export const resolvers: Resolvers = {
	// @ts-ignore
	Date: GraphQLDateTime,

	Query: {
		// @ts-ignore

		getDirects: authGuard(async (_, { userId }, context) => {
			const directsWithUser = await DirectRoom.find({
				users: { $in: [{ _id: userId }] }
			}).populate('users');

			return directsWithUser;
		}),
		// @ts-ignore
		getMessages: authGuard(async (_, { roomId }, context) => {
			const messages = await Message.find({ roomId }).populate('sender');
			console.log({ roomId, messages });

			return messages;
		}),

		getUser: authGuard(async (_, __, { req }) => {
			// @ts-ignore
			const user = await User.findById(req.meta.id);

			return user;
		})
	},

	// Subscription: {
	// 	messages: {
	// 		// @ts-ignore
	// 		subscribe: authGuard(
	// 			withFilter(
	// 				() => pubsub.asyncIterator('NEW_MESSAGE'),
	// 				(payload, { roomId }) => payload._id === roomId
	// 			)
	// 		)
	// 	}
	// },

	Mutation: {
		// addMessage: authGuard((_, { roomId, body }, { req }) => {
		// 	// @todo
		// 	if (!body || !roomId) {
		// 		throw new UserInputError('missing data @todo');
		// 	}

		// 	const id = 'v4()';
		// 	const newMessage: Message = {
		// 		_id: id,
		// 		roomId,
		// 		body,
		// 		sender: req.meta!._id!,
		// 		createdAt: new Date(),
		// 		updatedAt: new Date()
		// 	};

		// 	messages.push(newMessage);
		// 	subscribers.forEach((subscription) => {
		// 		subscription();
		// 	});

		// 	return id;
		// }),

		// updateMessage: authGuard((_, { id, body }, { req }) => {
		// 	const oldMessage = messages.find((message) => message._id === id);
		// 	if (!oldMessage) {
		// 		throw new Error(`could not find a message with id ${id}`);
		// 	}

		// 	Object.assign(oldMessage, { body });
		// 	return oldMessage._id;
		// }),
		seed,
		logout: logoutResolver,
		login: loginResolver,
		join: joinResolver
	}
};
