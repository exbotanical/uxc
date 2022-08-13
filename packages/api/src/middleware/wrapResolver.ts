import type { Context } from '@uxc/common/node'

export function buildWrapResolver(
  middleware: (context: Context) => Promise<void> | void,
) {
  return function wrapResolver<R, T>(
    resolver: (
      parent: Record<string, unknown>,
      args: T,
      context: Context,
    ) => Promise<R> | R,
  ) {
    return async function resolverWrapper(
      parent: Record<string, unknown>,
      args: T,
      context: Context,
    ) {
      await middleware(context)
      const ret = await resolver(parent, args, context)

      return ret
    }
  }
}
