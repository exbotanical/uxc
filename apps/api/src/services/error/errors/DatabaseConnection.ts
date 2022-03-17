import { BaseError } from '.';

export class DatabaseConnectionError extends BaseError {
	statusCode = 500;

	constructor(
		public message: string = 'An error while connecting to the database.',
		public internal?: string
	) {
		super(message, internal);
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serialize() {
		return {
			friendly: this.message,
			internal: this.internal || this.message
		};
	}
}
