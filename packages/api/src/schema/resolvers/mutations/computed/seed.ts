import { faker } from '@faker-js/faker';
import { Request } from 'express';
import { Document } from 'mongoose';

import type { Context, ObjectID, User as UserType } from '@uxc/common/node';

import { User, Message, PrivateThread, Friend } from '@/db';
import { logger } from '@/services/logger';

interface Taskable {
	save: () => Promise<any>;
	_id: ObjectID;
}

type PartitionedTasks = [Promise<any>[], ObjectID[]];

interface MaybePassword {
	password?: string;
}

function createMessage(threadId: ObjectID, userId: ObjectID) {
	const random = Math.floor(Math.random() * 11);

	return Message.build({
		body: random % 2 === 0 ? faker.lorem.sentence() : faker.lorem.sentences(),
		sender: userId,
		threadId
	});
}

async function createPuppetUser() {
	const password = 'DOLMOND!';

	const user = await User.create({
		email: 'dolmond@gmail.com',
		password,
		userImage:
			'https://upload.wikimedia.org/wikipedia/en/e/e7/CanMonsterMovieAlbumCover.jpg',
		username: 'redis'
	});

	return Object.assign((user as unknown as { _doc: UserType })._doc, {
		password
	});
}

function createUser() {
	return User.build({
		email: faker.internet.email(),
		password: faker.internet.password(10),
		userImage: faker.internet.avatar(),
		username: faker.internet.userName()
	});
}

function partition(grp: Taskable[]) {
	return grp.reduce(
		// @ts-expect-error
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
	const { user, ...rest } = await seed({ req });

	if (user.password) {
		delete user.password;
	}

	return {
		...rest,
		user
	};
}

export async function seed({
	req,
	sansFriends
}: {
	req?: Request;
	sansFriends?: boolean;
} = {}) {
	let userId: ObjectID | null = req?.session.meta?.id ?? null;

	let testUser: MaybePassword | null = null;
	if (!userId) {
		const { email, password, _id } = await createPuppetUser();
		userId = _id;
		testUser = { password };

		logger.info('New puppet account created', {
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

	// befriend ea new user - test user

	if (!sansFriends) {
		const [friendTasks, friendIds] = partition(
			userIds.map((friendNodeY) =>
				Friend.build({
					friendNodeX: user._id,
					friendNodeY
				})
			)
		) as unknown as PartitionedTasks;

		await Promise.all(friendTasks);
	}

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

	return {
		threadIds,
		userIds,
		user: Object.assign(user, testUser) as MaybePassword & UserType
	};
}
