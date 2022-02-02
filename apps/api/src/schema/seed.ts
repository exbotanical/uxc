import { Context } from '@uxc/types';
import { User, Message, PrivateThread } from '@/db';

export async function seed(_, __, { req }: Context) {
	const user = await User.findById(req.meta.id);

	const userTemplate1 = User.build({
		email: 'email@mail.co',
		password: 'password1',
		username: 'snooby',
		userImage: ''
	});

	await userTemplate1.save();

	const userTemplate2 = User.build({
		email: 'email@mail.com',
		password: 'password13',
		username: 'crimble6',
		userImage: ''
	});

	await userTemplate2.save();

	const userTemplate3 = User.build({
		email: 'email@mail.gov',
		password: 'password12',
		username: 'goldwater',
		userImage: ''
	});

	await userTemplate3.save();

	const thread = await PrivateThread.create({
		users: [userTemplate1, user]
	});

	const thread2 = await PrivateThread.create({
		users: [userTemplate2, user]
	});

	const thread3 = await PrivateThread.create({
		users: [userTemplate3, user]
	});

	const tasks = [];
	for (let i = 0; i < 100; i++) {
		tasks.push(
			...[
				Message.create({
					body: 'test message ' + i,
					threadId: thread._id,
					sender: i % 2 === 0 ? userTemplate1._id : user._id
				}),
				Message.create({
					body: 'test note ' + i,
					threadId: thread2._id,
					sender: i % 2 === 0 ? userTemplate2._id : user._id
				}),
				Message.create({
					body: 'test note ' + i,
					threadId: thread3._id,
					sender: i % 2 === 0 ? userTemplate3._id : user._id
				})
			]
		);
	}

	await Promise.all(tasks);

	return user;
}
