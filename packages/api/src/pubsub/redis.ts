import Redis from 'ioredis';

import { RedisPubSub } from 'graphql-redis-subscriptions';
import { dateReviver } from './serialize';

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';

const options = {
	host: REDIS_HOST,
	port: 6379,
	retryStrategy: (attempts) => {
		return Math.min(attempts * 50, 2000);
	}
};

export const pubsub = new RedisPubSub({
	publisher: new Redis(options),
	subscriber: new Redis(options),
	reviver: dateReviver
});
