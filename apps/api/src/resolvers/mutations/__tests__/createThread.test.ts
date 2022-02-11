import { CREATE_THREAD } from '@@/fixtures';
import request from 'supertest';


import { app } from '@/app';
import { seed } from '@/resolvers/seed';
import { ERROR_MESSAGES } from '@/utils/constants';

describe('createThread workflow', () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: CREATE_THREAD,
				variables: {
					receiverId: 'xxx'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
		expect(body.errors[0].path[0]).toBe('createThread');
	});

	it.todo(
		'it fails with a user session error if the request data passes the auth guard but the session does not exist on the req object (edge case)'
	);

	it('fails when not provided a receiverId', async () => {
		const cookie = await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_THREAD,
				variables: {}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(ERROR_MESSAGES.E_NO_RECEIVER_ID);

		expect(body.errors[0].path[0]).toBe('createThread');
	});

	it('fails when provided a receiverId that is not a valid ObjectID', async () => {
		const cookie = await join();
		const receiverId = '123';

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_THREAD,
				variables: {
					receiverId
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(
			`The provided receiverId ${receiverId} is not a valid ObjectID`
		);

		expect(body.errors[0].path[0]).toBe('createThread');
	});

	it('creates a new thread', async () => {
		const { user } = await seed();

		const cookie = await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_THREAD,
				variables: {
					receiverId: user._id
				}
			})
			.expect(200);

		const { createThread } = body.data;

		expect(createThread.users).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ _id: user._id.toString() })
			])
		);
	});
});
