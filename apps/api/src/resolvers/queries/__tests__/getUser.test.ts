import { GET_USER, SIGNIN_MUTATION } from '@@/fixtures';
import request from 'supertest';

import { app } from '@/app';
import { seed } from '@/resolvers/seed';
import { ERROR_MESSAGES } from '@/utils/constants';

describe('getUser workflow', () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_USER
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
		expect(body.errors[0].path[0]).toBe('getUser');
	});

	it('fails when not provided a userId', async () => {
		const cookie = await join();
		const userId = '123';

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: GET_USER,
				variables: {}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(ERROR_MESSAGES.E_NO_USER_ID);

		expect(body.errors[0].path[0]).toBe('getUser');
	});

	it('fails when provided a userId that is not a valid ObjectID', async () => {
		const cookie = await join();
		const userId = '123';

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: GET_USER,
				variables: {
					userId
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(
			`The provided userId ${userId} is not a valid ObjectID`
		);

		expect(body.errors[0].path[0]).toBe('getUser');
	});

	it('returns the requested user', async () => {
		const cookie = await join();
		const { user } = await seed();

		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_USER,
				variables: {
					userId: user._id
				}
			})
			.set('Cookie', cookie)
			.expect(200);

		expect(body.data.getUser.username).toEqual(user.username);
		expect(body.data.getUser._id).toEqual(user._id.toString());
	});
});
