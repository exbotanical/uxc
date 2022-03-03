import { SubscriptionResolvers } from '@uxc/types/generated';
import { withFilter } from 'graphql-subscriptions';

import type { Message } from '@uxc/types';

import { pubsub } from '@/redis';
import { EVENTS } from '@/utils/constants';

export const onAnyMessageCreated: SubscriptionResolvers['onAnyMessageCreated'] =
	{
		// @ts-ignore
		subscribe: withFilter(
			() => pubsub.asyncIterator([EVENTS.MESSAGE_CREATED]),
			(payload, _, ctx) => {
				return payload.message.sender._id !== ctx.id;
			}
		),
		// @ts-ignore
		resolve: ({ message }: { message: Message }) => {
			return [message];
		}
	};
