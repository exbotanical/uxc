import { SubscriptionResolvers } from '@uxc/types/generated';
import { withFilter } from 'graphql-subscriptions';

import type { WithMessage } from './types';
import type { MessageWithSender, JWTPayload } from '@uxc/types/node';

import { pubsub } from '@/redis';
import { EVENTS } from '@/utils/constants';

export const onAnyMessageCreated = {
	subscribe: withFilter(
		() => pubsub.asyncIterator([EVENTS.MESSAGE_CREATED]),
		(payload: WithMessage, _, ctx: JWTPayload) => {
			return payload.message.sender._id !== ctx.id;
		}
	),
	resolve: ({ message }: { message: MessageWithSender }) => {
		return [message];
	}
	// @see https://github.com/apollographql/apollo-server/issues/4556
} as unknown as SubscriptionResolvers['onAnyMessageCreated'];
