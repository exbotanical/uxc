import { logger } from '@/services/logger';
import { onError } from '@apollo/client/link/error';

/**
 * @todo see TODO.md E1
 */
export const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			logger.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations?.map(
					({ column, line }) => `Col: ${column} / Line: ${line}`
				)}, Path: ${path}`
			);
		});
	}

	if (networkError) {
		// @todo safe stringify (circular refs)
		logger.error(`[Network error]: ${JSON.stringify(networkError)}`);
	}
});
