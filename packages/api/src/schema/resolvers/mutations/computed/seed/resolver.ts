import type { Context } from '@uxc/common/node';

import { seed } from './handler';

export async function seedResolver(_: any, __: any, { req }: Context) {
	const { users, ...rest } = await seed({ req });

	return {
		...rest,
		user: users[0]
	};
}
