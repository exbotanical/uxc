import { SubscriptionResolvers } from '@uxc/types/generated';

import { pubsub } from '@/redis';
import { EVENTS } from '@/utils/constants';
import type { Message } from '@uxc/types';
import type { SocketContext } from './types';
import { withFilter } from 'graphql-subscriptions';

export const onAnyMessageCreated: SubscriptionResolvers['onAnyMessageCreated'] =
	{
		// @ts-expect-error
		subscribe: withFilter(
			() => pubsub.asyncIterator([EVENTS.MESSAGE_CREATED]),
			(payload, {}, ctx) => {
				return payload.message.sender._id !== ctx.id;
			}
		),
		resolve: ({ message }: { message: Message }) => {
			return [message];
		}
	};
