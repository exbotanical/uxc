import { BaseError } from '.';

export class NotFoundError extends BaseError {
	statusCode = 404;

	constructor(
		public message: string = 'The requested resource could not be found,'
	) {
		super(message);

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serialize() {
		return {
			friendly: this.message
		};
	}
}
