import { ApolloClient, InMemoryCache } from '@apollo/client';

import { link } from './links';

export const client = new ApolloClient({
	cache: new InMemoryCache({
		addTypename: false
	}),
	link
});

client.onResetStore(async () => {
	return Promise.resolve(() => {
		console.log('store reset');
	});
});
