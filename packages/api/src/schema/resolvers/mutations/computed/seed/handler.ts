import { Request } from 'express';
import { Document } from 'mongoose';

import type { User as UserType } from '@uxc/common/node';

import { PrivateThread, Friend, User, ReturnDocument } from '@/db';
import { SeedModes, Taskable } from './types';
import {
	createMessage,
	createTestMessages,
	createUser,
	createUsers,
	partition
} from './op';

import type { PartitionedTasks } from './types';

export async function seed({
	mode
}: {
	req?: Request;
	mode?: SeedModes;
} = {}) {
	const { user, users, userIds } = await createUsers();

	// for each new user, create a private thread with my user
	const [threadTasks, threadIds] = partition(
		users.map((user2) =>
			PrivateThread.build({
				users: [user._id, user2._id]
			})
		)
	) as unknown as PartitionedTasks;
	await Promise.all(threadTasks);

	// correlate sender to its thread
	const idSet = threadIds.map((threadId, idx) => [threadId, userIds[idx]]);

	const messageTasks: Promise<Document>[] = [];

	// generate 100 messages from sender and  receiver each
	idSet.forEach(([threadId, userId]) => {
		for (let i = 0; i < 100; i++) {
			messageTasks.push(
				createMessage(threadId, userId).save(),
				createMessage(threadId, user._id).save()
			);
		}
	});

	await Promise.all(messageTasks);

	if (mode !== SeedModes.TEST) {
		const testMessageTasks = createTestMessages(threadIds[0], userIds[0]);
		// befriend ea new user - test user
		const [friendTasks] = partition(
			userIds.map((friendNodeY) => {
				console.log(user, friendNodeY);
				return Friend.build({
					friendNodeX: user._id,
					friendNodeY
				});
			})
		) as unknown as PartitionedTasks;

		await Promise.all([...testMessageTasks, ...friendTasks]);
	}

	return {
		user,
		users,
		threadIds
	};
}
