import { ApolloError } from 'apollo-server-core';

import { BaseError } from '..';

import type { GraphQLError } from 'graphql';

export function apolloErrorHandler(err: GraphQLError) {
	if (err.originalError instanceof BaseError) {
		return new ApolloError(
			err.originalError.message,
			err.originalError.constructor.name
		);
	}

	if (err.originalError instanceof ApolloError) {
		return err;
	}

	return new ApolloError(
		'Something went wrong. Please try again or contact support.',
		'GENERIC_ERROR'
	);
}
