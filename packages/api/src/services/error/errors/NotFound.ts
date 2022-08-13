import { BaseError } from '.'

export class NotFoundError extends BaseError {
  statusCode = 404

  constructor(
    public message: string = 'The requested resource could not be found.',
    public internal?: string,
  ) {
    super(message, internal)

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serialize() {
    return {
      friendly: this.message,
      internal: this.internal || this.message,
    }
  }
}
