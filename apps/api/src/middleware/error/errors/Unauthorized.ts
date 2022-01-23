import { BaseError } from '.';

export class UnauthorizedError extends BaseError {
	statusCode = 401;

	constructor(public message: string = 'The user is not authorized') {
		super(message);

		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}

	serialize() {
		return {
			friendly: this.message
		};
	}
}
