import { onError } from '@apollo/client/link/error';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			);
		});
	if (networkError) {
		// @todo safe stringify (circular refs)
		console.error(`[Network error]: ${JSON.stringify(networkError)}`);
	}
});
