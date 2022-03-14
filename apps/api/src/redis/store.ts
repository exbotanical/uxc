import connectRedis from 'connect-redis';
import Redis from 'ioredis';

import { options } from '.';

import { SessionMiddleware } from '@/middleware';
import { logger } from '@/services/logger';

export const client = new Redis(options)
	.on('error', logger.error)
	.on('connect', () => {
		logger.info('redis connect');
	});

export function buildStore(session: SessionMiddleware) {
	return new (connectRedis(session))({
		client,
		ttl: 86400
	});
}
