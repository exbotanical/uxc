import type { Context, ObjectID } from '@uxc/types';
import { User, Message, PrivateThread } from '@/db';

import { faker } from '@faker-js/faker';

function createMessage(threadId: ObjectID, userId: ObjectID) {
	const random = Math.floor(Math.random() * 11);

	return Message.build({
		body: random % 2 === 0 ? faker.lorem.sentence() : faker.lorem.sentences(),
		threadId,
		sender: userId
	});
}

function createUser() {
	return User.build({
		email: faker.internet.email(),
		password: faker.internet.password(10),
		username: faker.internet.userName(),
		userImage: faker.internet.avatar()
	});
}

type Taskable = { save: () => Promise<any>; _id: ObjectID };

function partition(grp: Taskable[]) {
	return grp.reduce(
		([tasks, ids], task) => {
			return [
				[...tasks, task.save()],
				[...ids, task._id]
			];
		},
		[[], []]
	);
}

export async function seed(_, __, { req }: Context) {
	const user = await User.findById((req.session as any).meta.id);
	const users = Array.from({ length: 10 }, createUser);

	// create users
	const [userTasks, userIds] = partition(users);
	await Promise.all(userTasks);

	// for each new user, create a private thread with my user
	const [threadTasks, threadIds] = partition(
		users.map((user2) =>
			PrivateThread.build({
				users: [user, user2]
			})
		)
	);

	await Promise.all(threadTasks);

	// correlate sender to its thread
	const idSet = threadIds.map((threadId, idx) => [threadId, userIds[idx]]);

	const messageTasks = [];

	// generate 100 messages from sender and receiver each
	idSet.forEach(([threadId, userId]) => {
		for (let i = 0; i < 100; i++) {
			messageTasks.push(
				createMessage(threadId, userId).save(),
				createMessage(threadId, user._id).save()
			);
		}
	});

	await Promise.all(messageTasks);

	return user;
}
