import { SubscriptionResolvers } from '@uxc/types/generated';
import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '@/redis';
import { EVENTS } from '@/utils/constants';
import type { Message } from '@uxc/types';

export const onThreadMessageCreated: SubscriptionResolvers['onThreadMessageCreated'] =
	{
		// @ts-expect-error
		subscribe: withFilter(
			() => pubsub.asyncIterator([EVENTS.MESSAGE_CREATED]),
			(payload, { threadId }) => {
				return payload.message.threadId === threadId;
			}
		),
		resolve: ({ message }: { message: Message }) => {
			return [message];
		}
	};
