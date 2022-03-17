import { ERROR_MESSAGES } from '@uxc/types';
import { ApolloError } from 'apollo-server-core';

import { BaseError } from '..';

import type { GraphQLError } from 'graphql';

import { logger } from '@/services/logger';

export function apolloErrorHandler(err: GraphQLError) {
	if (err.originalError instanceof BaseError) {
		const { friendly, internal } = err.originalError.serialize();

		logger.error({
			friendly,
			internal
		});

		return new ApolloError(friendly, err.originalError.constructor.name);
	}

	if (err.originalError instanceof ApolloError) {
		return err;
	}

	logger.error(err);

	return new ApolloError(ERROR_MESSAGES.E_GENERIC_FRIENDLY, 'GENERIC_ERROR');
}
