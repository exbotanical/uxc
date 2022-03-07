import { BaseError } from '.';

export class DatabaseConnectionError extends BaseError {
	statusCode = 500;

	constructor(public message = 'An error while connecting to the database.') {
		super(message);

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serialize() {
		return {
			friendly: this.message
		};
	}
}
