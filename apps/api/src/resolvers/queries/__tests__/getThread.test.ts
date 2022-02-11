import { GET_THREAD, LOGIN_MUTATION } from '@@/fixtures';
import { ObjectId } from 'mongodb';
import request from 'supertest';


import { app } from '@/app';
import { seed } from '@/resolvers/seed';
import { ERROR_MESSAGES } from '@/utils/constants';

describe('getThread workflow', () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_THREAD,
				variables: {
					threadId: 'id'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
		expect(body.errors[0].path[0]).toBe('getThread');
	});

	it('fails when not provided a threadId', async () => {
		const cookie = await join();
		const threadId = '123';

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: GET_THREAD,
				variables: {}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(ERROR_MESSAGES.E_NO_THREAD_ID);

		expect(body.errors[0].path[0]).toBe('getThread');
	});

	it('fails when provided a threadId that is not a valid ObjectID', async () => {
		const cookie = await join();
		const threadId = '123';

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: GET_THREAD,
				variables: {
					threadId
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(
			`The provided threadId ${threadId} is not a valid ObjectID`
		);

		expect(body.errors[0].path[0]).toBe('getThread');
	});

	it('returns null if the thread was not found', async () => {
		const { user } = await seed();

		const response = await request(app)
			.post(BASE_PATH)
			.send({
				query: LOGIN_MUTATION,
				variables: {
					args: {
						email: user.email,
						password: user.password
					}
				}
			})
			.expect(200);

		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_THREAD,
				variables: {
					threadId: new ObjectId()
				}
			})
			.set('Cookie', response.get('Set-Cookie'))
			.expect(200);

		const { getThread } = body.data;

		expect(getThread).toBeNull();
	});

	it('returns the requested thread', async () => {
		const { user, threadIds } = await seed();

		const response = await request(app)
			.post(BASE_PATH)
			.send({
				query: LOGIN_MUTATION,
				variables: {
					args: {
						email: user.email,
						password: user.password
					}
				}
			})
			.expect(200);

		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_THREAD,
				variables: {
					threadId: threadIds[0]
				}
			})
			.set('Cookie', response.get('Set-Cookie'))
			.expect(200);

		const { getThread } = body.data;

		expect(getThread._id).toEqual(threadIds[0].toString());
	});
});
