import { onError } from '@apollo/client/link/error';

/**
 * @todo see TODO.md E1
 */
export const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations?.map(
					({ column, line }) => `Col: ${column} / Line: ${line}`
				)}, Path: ${path}`
			);
		});
	}

	if (networkError) {
		// @todo safe stringify (circular refs)
		console.error(`[Network error]: ${JSON.stringify(networkError)}`);
	}
});
