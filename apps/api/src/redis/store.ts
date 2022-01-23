import connectRedis from 'connect-redis';
import Redis from 'ioredis';

import { Session } from '../middleware';

import { options } from '.';

const client = new Redis(options)
	.on('error', console.error)
	.on('connect', () => {
		console.info('redis connect');
	});

export function buildStore(session: Session) {
	return new (connectRedis(session))({
		client,
		ttl: 86400
	});
}
