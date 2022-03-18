import { SubscriptionResolvers } from '@uxc/common/generated';

import { pubsub } from '@/redis';
import { EVENTS } from '@/utils/constants';

export const onFriendRequestSaved = {
	subscribe: () => pubsub.asyncIterator([EVENTS.FRIEND_REQUEST_SAVED])

	// @see https://github.com/apollographql/apollo-server/issues/4556
} as unknown as SubscriptionResolvers['onFriendRequestSaved'];
