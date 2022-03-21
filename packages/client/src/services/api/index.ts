import { ApolloClient, InMemoryCache } from '@apollo/client';

import { link } from './links';

import { logger } from '@/services/logger';

export * from './queries';

export const client = new ApolloClient({
	cache: new InMemoryCache({
		addTypename: false
	}),
	link
});

client.onResetStore(async () => {
	return Promise.resolve(() => {
		logger.info('store reset');
	});
});
