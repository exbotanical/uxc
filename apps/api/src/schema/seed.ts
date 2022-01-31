import { Context } from '@uxc/types';
import { User, Message, DirectRoom } from '@/db';

export async function seed(_, __, { req }: Context) {
	const user = await User.findById(req.meta.id);

	const userTemplate1 = User.build({
		email: 'email@mail.co',
		password: 'password1',
		username: 'snooby',
		userImage: '',
		currentRoomId: null
	});

	await userTemplate1.save();

	const userTemplate2 = User.build({
		email: 'email@mail.com',
		password: 'password13',
		username: 'crimble6',
		userImage: '',
		currentRoomId: null
	});

	await userTemplate2.save();

	const userTemplate3 = User.build({
		email: 'email@mail.gov',
		password: 'password12',
		username: 'goldwater',
		userImage: '',
		currentRoomId: null
	});

	await userTemplate3.save();

	const room = await DirectRoom.create({
		users: [userTemplate1, user]
	});
	console.log(user);
	const room2 = await DirectRoom.create({
		users: [userTemplate2, user]
	});

	const room3 = await DirectRoom.create({
		users: [userTemplate3, user]
	});

	const tasks = [];
	for (let i = 0; i < 100; i++) {
		tasks.push(
			...[
				Message.create({
					body: 'test message ' + i,
					roomId: room._id,
					sender: i % 2 === 0 ? userTemplate1._id : user._id
				}),
				Message.create({
					body: 'test note ' + i,
					roomId: room2._id,
					sender: i % 2 === 0 ? userTemplate2._id : user._id
				}),
				Message.create({
					body: 'test note ' + i,
					roomId: room3._id,
					sender: i % 2 === 0 ? userTemplate3._id : user._id
				})
			]
		);
	}

	await Promise.all(tasks);

	return user;
}
