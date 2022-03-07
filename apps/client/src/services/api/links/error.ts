import { onError } from '@apollo/client/link/error';

/**
 * @todo see TODO.md E1
 */
export const errorLink = onError(
	({ response, graphQLErrors, networkError }) => {
		console.log(response?.errors);

		if (graphQLErrors)
			graphQLErrors.forEach(({ message, locations, path, extensions }) => {
				console.error(
					`[GraphQL error]: Message: ${message}, Location: ${locations?.map(
						({ column, line }) => `Col: ${column} / Line: ${line}`
					)}, Path: ${path}`
				);

				if (extensions.code === 'GENERIC_ERROR') {
					console.log('generic');
				}

				if (extensions.code === 'BadRequestError') {
					console.log('BadRequestError');
				}
			});

		if (networkError) {
			// @todo safe stringify (circular refs)
			console.error(`[Network error]: ${JSON.stringify(networkError)}`);
		}
	}
);
