import { Document } from 'mongoose';

import { PrivateThread, Friend, FriendRequest } from '@/db';
import { SeedModes } from './types';
import {
	createMessage,
	createTestMessages,
	createUser,
	createUsers,
	partition
} from './op';

export async function seed({
	mode
}: {
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
	);
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
			userIds.map((friendNodeY) =>
				Friend.build({
					friendNodeX: user._id,
					friendNodeY
				})
			)
		);

		const [moreUserTasks, moreUserIds] = partition(
			Array.from({ length: 10 }, createUser).map((u) => u[1])
		);

		await Promise.all([...testMessageTasks, ...friendTasks, ...moreUserTasks]);

		// send friend requests to the test user
		const [recvFriendRequestTasks] = partition(
			moreUserIds.slice(0, 5).map((requester) =>
				FriendRequest.build({
					recipient: user._id,
					requester,
					status: 'PENDING'
				})
			)
		);

		// send friend requests from the test user
		const [sentFriendRequestTasks] = partition(
			moreUserIds.slice(5, moreUserIds.length).map((recipient) =>
				FriendRequest.build({
					recipient,
					requester: user._id,
					status: 'PENDING'
				})
			)
		);

		await Promise.all([...recvFriendRequestTasks, ...sentFriendRequestTasks]);
	}

	return {
		user,
		users,
		threadIds
	};
}
