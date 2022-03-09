import { UserInputError as ApolloUserInputError } from 'apollo-server-core';

export class UserInputError extends ApolloUserInputError {
	constructor(message: string, field?: string) {
		super(message);

		this.field = field || null;
	}
}
