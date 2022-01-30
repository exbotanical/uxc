/* eslint-disable sort-keys */

// import { pubsub } from '../redis';

// import type { Message } from '@uxc/types';
import type { Resolvers } from '@uxc/types/generated';
import { authGuard } from '../middleware/auth';
import { joinResolver, loginResolver, logoutResolver } from '@/resolvers';
import { GraphQLDateTime } from 'graphql-iso-date';
import { User } from '@/db';

const subscribers: (() => void)[] = [];

const onMessageUpdates = (fn: () => Promise<void>) => {
	subscribers.push(fn);
};

export const resolvers: Resolvers = {
	// @ts-ignore
	Date: GraphQLDateTime,

	Query: {
		// getAllMessages: authGuard((_, __, context) => {
		// 	return messages;
		// }),

		getUser: authGuard(async (_, __, { req }) => {
			const user = await User.findById(req.meta.id);

			return user;
		})
	},

	// Subscription: {
	// 	messages: {
	// 		// @todo
	// 		// @ts-expect-error
	// 		subscribe: authGuard((_, args, context) => {
	// 			console.log({ context });
	// 			const chan = Math.random().toString(32).slice(2, 5);
	// 			const subscription = async () => pubsub.publish(chan, { messages });

	// 			onMessageUpdates(subscription);
	// 			setTimeout(subscription, 0);

	// 			return pubsub.asyncIterator<number>(chan);
	// 		})
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

		logout: logoutResolver,
		login: loginResolver,
		join: joinResolver
	}
};
