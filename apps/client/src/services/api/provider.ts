import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';

import { link } from './links';

const baseOptions = { errorPolicy: 'all' as const };

export function ApolloProvider({ showError }: { showError: boolean }) {
	return useMemo(() => {
		return new ApolloClient({
			link,
			cache: new InMemoryCache(),
			defaultOptions: {
				watchQuery: baseOptions,
				query: baseOptions,
				mutate: baseOptions
			}
		});
	}, [showError]);
}
