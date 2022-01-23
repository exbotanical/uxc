import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

import { options, dateReviver } from '.';

export const pubsub = new RedisPubSub({
	publisher: new Redis(options),
	reviver: dateReviver,
	subscriber: new Redis(options)
});
