import { SubscriptionResolvers } from '@uxc/common/generated';
import { withFilter } from 'graphql-subscriptions';

import type { WithMessage } from './types';
import type { Message, ObjectID } from '@uxc/common/node';

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
		return [message];
	}
	// @see https://github.com/apollographql/apollo-server/issues/4556
} as unknown as SubscriptionResolvers['onThreadMessageCreated'];
