import { GraphQLError } from 'graphql';

export interface NormalizedError {
	code: string;
	message: string;
	field: string | null;
}

type GQLErrors = readonly GraphQLError[];

export function normalizeGraphQLErrors(errors: GQLErrors) {
	return errors.map((error) => {
		const { extensions, message } = error;

		return {
			code: extensions.code ?? 'UNKNOWN_ERROR',
			message,
			field: extensions.field ?? null
		};
	});
}

export function normalizeError(ex: {
	graphQLErrors?: GQLErrors;
}): NormalizedError[] {
	if (ex instanceof Error) {
		if (ex.graphQLErrors != undefined) {
			normalizeGraphQLErrors(ex.graphQLErrors);
		}

		return [
			{
				code: 'UNKNOWN_ERROR',
				message: ex.message,
				field: null
			}
		];
	}

	return [
		{
			code: 'UNKNOWN_ERROR',
			message: 'Something went wrong. Please try again or contact support.',
			field: null
		}
	];
}
