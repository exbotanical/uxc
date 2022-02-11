import { faker } from '@faker-js/faker';

import type { Context, ObjectID } from '@uxc/types';

import { User, Message, PrivateThread } from '@/db';
import { Document } from 'mongoose';
import { Request } from 'express';

interface Taskable {
	save: () => Promise<any>;
	_id: ObjectID;
}

type PartitionedTasks = [Promise<any>[], ObjectID[]];

function createMessage(threadId: ObjectID, userId: ObjectID) {
	const random = Math.floor(Math.random() * 11);

	return Message.build({
		body: random % 2 === 0 ? faker.lorem.sentence() : faker.lorem.sentences(),
		threadId,
		sender: userId
	});
}

async function createPuppetUser() {
	const password = 'DOLMOND!';

	const user = await User.create({
		email: 'dolmond@gmail.com',
		password,
		username: 'redis',
		userImage:
			'https://upload.wikimedia.org/wikipedia/en/e/e7/CanMonsterMovieAlbumCover.jpg'
	});

	return Object.assign((user as any)._doc, { password });
}

function createUser() {
	return User.build({
		email: faker.internet.email(),
		password: faker.internet.password(10),
		username: faker.internet.userName(),
		userImage: faker.internet.avatar()
	});
}

function partition(grp: Taskable[]) {
	return grp.reduce(
		// @ts-ignore
		([tasks, ids], task) => {
			return [
				[...tasks, task.save()],
				[...ids, task._id]
			];
		},
		[[], []]
	);
}

export async function seedWrapper(_: any, __: any, { req }: Context) {
	const { user, threadIds } = await seed(req);

	if (user.password) {
		delete user.password;
	}

	return {
		user,
		threadIds
	};
}

export async function seed(req?: Request) {
	let userId = (req?.session as any)?.meta?.id;

	let testUser = null;
	if (!userId) {
		const { email, password, _id } = await createPuppetUser();
		userId = _id;
		testUser = { password };

		console.info('New puppet account created', {
			email,
			password
		});
	}

	const user = await User.findById(userId);

	if (!user) {
		throw new Error('[Seed script] unable to find puppet user');
	}

	const users = Array.from({ length: 10 }, createUser);

	// create users
	const [userTasks, userIds] = partition(users) as unknown as PartitionedTasks;
	await Promise.all(userTasks);

	// for each new user, create a private thread with my user
	const [threadTasks, threadIds] = partition(
		users.map((user2) =>
			PrivateThread.build({
				users: [user, user2]
			})
		)
	) as unknown as PartitionedTasks;

	await Promise.all(threadTasks);

	// correlate sender to its thread
	const idSet = threadIds.map((threadId, idx) => [threadId, userIds[idx]]);

	const messageTasks: Promise<Document>[] = [];

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

	return { user: Object.assign(user, testUser), threadIds };
}
