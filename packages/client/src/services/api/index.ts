import { ApolloClient, InMemoryCache } from '@apollo/client';
import { splitLink } from './adapters';

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
});
