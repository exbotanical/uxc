/* eslint-disable sort-keys */
import { v4 } from 'uuid';

import { pubsub } from '../redis';
import { messages, user } from '../state';

import type { Message } from '@uxc/types';
import type { Resolvers } from '@uxc/types/generated';
import { loginController } from '../controllers/login';
import { authGuard } from '../middleware/auth';
import { UserInputError } from 'apollo-server-core';

const subscribers: (() => void)[] = [];

const onMessageUpdates = (fn: () => Promise<void>) => {
	subscribers.push(fn);
};

export const resolvers: Resolvers = {
	Query: {
		getAllMessages: authGuard((_, __, context) => {
			return messages;
		}),

		getUser: authGuard((_, __, context) => {
			return user;
		})
	},

	Subscription: {
		messages: {
			// @todo
			// @ts-expect-error
			subscribe: authGuard((_, args, context) => {
				console.log({ context });
				const chan = Math.random().toString(32).slice(2, 5);
				const subscription = async () => pubsub.publish(chan, { messages });

				onMessageUpdates(subscription);
				setTimeout(subscription, 0);

				return pubsub.asyncIterator<number>(chan);
			})
		}
	},

	Mutation: {
		addMessage: authGuard((_, { message, user, timestamp }) => {
			// @todo
			if (!message || !user || !timestamp) {
				throw new UserInputError('missing data @todo');
			}

			if (!user.userImage || !user.username || !user.uuid) {
				throw new UserInputError('missing data @todo');
			}

			const uuid = v4();
			const newMessage: Message = { message, user, timestamp, uuid };

			messages.push(newMessage);
			subscribers.forEach((subscription) => {
				subscription();
			});

			return uuid;
		}),

		updateMessage: authGuard((_, { uuid, message, timestamp }) => {
			const oldMessage = messages.find((message) => message.uuid === uuid);
			if (!oldMessage) {
				throw new Error(`could not find a message with id ${uuid}`);
			}

			Object.assign(oldMessage, { uuid, message, timestamp });
			return oldMessage.uuid;
		}),

		login(_, { email, password, rememberMe }, { req }) {
			if (!email || !password) {
				throw new UserInputError('missing credentials');
			}
			return loginController({ email, password }, req);
		}
	}
};
