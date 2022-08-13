export abstract class BaseError extends Error {
  abstract statusCode: number

  constructor(public message: string, public internal?: string) {
    super(message)

    Object.setPrototypeOf(this, BaseError.prototype)
  }

  abstract serialize(): {
    friendly: string
    internal: string
  }
}
