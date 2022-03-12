import { withFilter } from 'graphql-subscriptions';

import type { WithMessage } from './types';
import type { Message, ObjectID } from '@uxc/types/node';

import { pubsub } from '@/redis';
import { EVENTS } from '@/utils/constants';

interface SubscriberArgs {
	threadId: ObjectID;
}
export const onThreadMessageCreated = {
	subscribe: withFilter(
		() => pubsub.asyncIterator([EVENTS.MESSAGE_CREATED]),
		(payload: WithMessage, { threadId }: SubscriberArgs) => {
			return payload.message.threadId === threadId;
		}
	),
	resolve: ({ message }: { message: Message }) => {
		console.log({ message });
		return [message];
	}
};
