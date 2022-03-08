import { SubscriptionResolvers } from '@uxc/types/generated';
import { withFilter } from 'graphql-subscriptions';

import type { Message } from '@uxc/types/node';

import { pubsub } from '@/redis';
import { EVENTS } from '@/utils/constants';

export const onThreadMessageCreated: SubscriptionResolvers['onThreadMessageCreated'] =
	{
		// @ts-expect-error
		subscribe: withFilter(
			() => pubsub.asyncIterator([EVENTS.MESSAGE_CREATED]),
			(payload, { threadId }) => {
				return payload.message.threadId === threadId;
			}
		),
		// @ts-expect-error
		resolve: ({ message }: { message: Message }) => {
			return [message];
		}
	};
