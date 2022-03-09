import { GraphQLError } from 'graphql';

export interface NormalizedError {
	code: string;
	message: string;
	field: string | null;
}

export function normalizeGraphQLErrors(errors: readonly GraphQLError[]) {
	return errors.map((error) => {
		const { extensions, message } = error;

		return {
			code: extensions.code ?? 'UNKNOWN_ERROR',
			message,
			field: extensions.field ?? null
		};
	});
}

export function normalizeError(ex: unknown): NormalizedError[] {
	if (ex instanceof Error) {
		// @ts-ignore
		if (ex?.graphQLErrors) {
			// @ts-ignore
			return normalizeGraphQLErrors(ex.graphQLErrors);
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
