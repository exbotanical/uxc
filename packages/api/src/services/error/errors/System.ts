import { BaseError } from '.'

export class SystemError extends BaseError {
  statusCode = 500

  constructor(
    public message: string = 'A system error occurred.',
    public internal?: string,
  ) {
    super(message, internal)

    Object.setPrototypeOf(this, SystemError.prototype)
  }

  serialize() {
    return {
      friendly: this.message,
      internal: this.internal || this.message,
    }
  }
}
