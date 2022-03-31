import testMessages from '@@/fixtures/messages.json';
import { faker } from '@faker-js/faker';

import { PartitionedTasks, Taskable } from './types';

import type { ReturnDocument } from '@/db';
import type { ObjectID, User as UserType } from '@uxc/common/node';

import { User, Message } from '@/db';

export function createTestMessages(threadId: ObjectID, userId: ObjectID) {
	return testMessages.map(async (body) =>
		Message.build({
			body,
			sender: userId,
			threadId
		}).save()
	);
}

export function createMessage(threadId: ObjectID, userId: ObjectID) {
	const random = Math.floor(Math.random() * 11);

	return Message.build({
		body: random % 2 === 0 ? faker.lorem.sentence() : faker.lorem.sentences(),
		sender: userId,
		threadId
	});
}

// @todo return password
export function createUser(): [string, ReturnDocument] {
	const password = faker.internet.password(10);
	return [
		password,
		User.build({
			email: faker.internet.email(),
			password,
			userImage: faker.internet.avatar(),
			username: faker.internet.userName()
		})
	];
}

export function partition(grp: Taskable[]) {
	return grp.reduce<PartitionedTasks>(
		([tasks, ids], task) => {
			return [
				[...tasks, task.save()],
				[...ids, task._id]
			];
		},
		[[], []]
	);
}

export async function createUsers() {
	const userPasswords: string[] = [];
	const users = [];

	for (let i = 0; i < 12; i++) {
		const [p, u] = createUser();

		userPasswords.push(p);
		users.push(u);
	}

	// create users
	const [userTasks, allUserIds] = partition(
		users
	) as unknown as PartitionedTasks;

	const finalUsers = await Promise.all<{ _doc: UserType }>(userTasks);
	const userIds = allUserIds.slice(1);
	const [testUser, ...otherUsers] = finalUsers.map((u, idx) => ({
		...u._doc,
		password: userPasswords[idx]
	}));

	return {
		user: testUser,
		users: otherUsers,
		userIds
	};
}
