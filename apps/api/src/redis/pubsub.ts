import redisMock from 'redis-mock';

import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

import { options, dateReviver } from '.';

import { isTestRuntime } from '@/utils';
import { logger } from '@/services/logger';

const publisher = (
	isTestRuntime ? redisMock.createClient() : new Redis(options)
)
	.on('error', (ex) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		logger.error('redis error', { ex });
	})
	.on('connect', () => {
		logger.info('redis connect');
	}) as Redis.Redis;

const subscriber = (
	isTestRuntime ? redisMock.createClient() : new Redis(options)
)
	.on('error', (ex) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		logger.error('redis error', { ex });
	})
	.on('connect', () => {
		logger.info('redis connect');
	}) as Redis.Redis;

export const pubsub = new RedisPubSub({
	publisher,
	reviver: dateReviver,
	subscriber
});
