import connectRedis from 'connect-redis';
import Redis from 'ioredis';

import { SessionMiddleware } from '@/middleware';

import { options } from '.';

export const client = new Redis(options)
	.on('error', console.error)
	.on('connect', () => {
		console.info('redis connect');
	});

export function buildStore(session: SessionMiddleware) {
	return new (connectRedis(session))({
		client,
		ttl: 86400
	});
}
