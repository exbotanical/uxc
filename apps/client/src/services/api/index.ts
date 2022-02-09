import { ApolloClient, InMemoryCache } from '@apollo/client';

import { link } from './links';

export const client = new ApolloClient({
	link,
	cache: new InMemoryCache({
		addTypename: false
	})
});

client.onResetStore(async () => {
	return Promise.resolve(() => {
		console.log('store reset');
	});
});
