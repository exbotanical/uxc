import { ApolloClient, InMemoryCache } from '@apollo/client';
import { logger } from '@/services/logger';

import { link } from './links';

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
