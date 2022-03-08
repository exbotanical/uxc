import { GET_CURRENT_USER, SIGNIN_MUTATION } from '@@/fixtures';
import { ERROR_MESSAGES } from '@uxc/types/node';
import request from 'supertest';

import { app } from '@/app';
import { seed } from '@/resolvers/mutations/computed/seed';

describe('getCurrentUser workflow', () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_CURRENT_USER
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
		expect(body.errors[0].path[0]).toBe('getCurrentUser');
	});

	it('returns the current user if the requester has a valid session', async () => {
		const cookie = await join();
		const { user } = await seed();

		const { body: firstUserResponse } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_CURRENT_USER
			})
			.set('Cookie', cookie)
			.expect(200);

		expect(firstUserResponse.data.getCurrentUser.username).toStrictEqual(
			globalThis.user.username
		);

		// switch users
		const response = await request(app)
			.post(BASE_PATH)
			.send({
				query: SIGNIN_MUTATION,
				variables: {
					args: {
						email: user.email,
						password: user.password
					}
				}
			})
			.expect(200);

		const cookie2 = response.get('Set-Cookie');

		const { body: secondUserResponse } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_CURRENT_USER
			})
			.set('Cookie', cookie2)
			.expect(200);

		expect(secondUserResponse.data.getCurrentUser.username).toStrictEqual(
			user.username
		);
	});
});
