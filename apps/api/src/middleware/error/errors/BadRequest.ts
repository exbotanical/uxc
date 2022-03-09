import { BaseError } from '.';

export class BadRequestError extends BaseError {
	statusCode = 400;

	constructor(
		public message: string = 'Something went wrong during the request.',
		public internal?: string
	) {
		super(message, internal);
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serialize() {
		return {
			friendly: this.message,
			internal: this.internal || this.message
		};
	}
}
