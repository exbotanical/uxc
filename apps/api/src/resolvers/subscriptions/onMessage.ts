import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '@/redis';
import { EVENTS } from '@/utils/constants';

export const onMessage = {
	subscribe: withFilter(
		() => pubsub.asyncIterator([EVENTS.MESSAGE_CREATED]),
		(payload, { threadId }) => {
			return payload.onMessage[0].threadId === threadId;
		}
	)
};
