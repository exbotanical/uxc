import type { Context } from '@uxc/types';

export function buildWrapResolver(
	middleware: (context: Context) => Promise<void>
) {
	return function wrapResolver<T, R>(
		resolver: (parent: {}, args: T, context: Context) => R
	) {
		return async function (parent: {}, args: T, context: Context) {
			await middleware(context);
			const ret = await resolver(parent, args, context);

			return ret;
		};
	};
}
