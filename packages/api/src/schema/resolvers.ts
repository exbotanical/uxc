import type { Message, User } from '@uxc/types';

import { v4 } from 'uuid';
import { pubsub } from '../pubsub/redis';
import { messages, user } from '../state';

const subscribers: (() => void)[] = [];

const onMessageUpdates = (fn) => subscribers.push(fn);

export const resolvers = {
	Query: {
		getAllMessages(): Message[] {
			return messages;
		},

		getUser(): User {
			return user;
		}
	},

	Subscription: {
		messages: {
			subscribe: (parent, args, context) => {
				console.log({ context });
				const chan = Math.random().toString(32).slice(2, 5);
				const cb = () => pubsub.publish(chan, { messages });

				onMessageUpdates(cb);
				setTimeout(cb, 0);

				return pubsub.asyncIterator(chan);
			}
		}
	},

	Mutation: {
		addMessage(_, { message, user, timestamp }: Omit<Message, 'uuid'>, arg) {
			console.log({ _, arg });
			const uuid = v4();
			const newMessage = { message, user, timestamp, uuid };

			messages.push(newMessage);
			subscribers.forEach((fn) => fn());

			return uuid;
		},

		updateMessage(_, { uuid, message, timestamp }: Omit<Message, 'user'>) {
			const oldMessage = messages.find((message) => message.uuid === uuid);

			if (!oldMessage) {
				throw new Error(`could not find a message with id ${uuid}`);
			}

			Object.assign(oldMessage, { uuid, message, timestamp });

			return messages;
		}
	}
};
