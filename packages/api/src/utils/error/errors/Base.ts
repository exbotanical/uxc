export abstract class BaseError extends Error {
	abstract statusCode: number;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, BaseError.prototype);
	}

	abstract serialize(): {
		friendly: string;
		errors?: { message: string; field?: string }[];
	};
}
