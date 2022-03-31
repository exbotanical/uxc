import { seed } from './handler';

export async function seedResolver() {
	const { user, users, threadIds } = await seed();

	return {
		user,
		users,
		threadIds
	};
}
