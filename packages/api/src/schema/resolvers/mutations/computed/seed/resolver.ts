import type { Context } from '@uxc/common/node';

import { seed } from './handler';

export async function seedResolver(_: any, __: any, { req }: Context) {
	const { user, users, threadIds } = await seed();
	console.log({ user, users });
	return {
		user,
		users,
		threadIds
	};
}
