import { GET_CURRENT_USER } from '@@/fixtures';
import { getCurrentUser, join, signin, user } from '@@/utils';
import { ERROR_MESSAGES } from '@uxc/common/node';
import request from 'supertest';

import { app } from '@/app';

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
		const { cookie } = await join();

		const { body: firstUserResponse } = await getCurrentUser({ cookie });

		expect(firstUserResponse.data.getCurrentUser.username).toStrictEqual(
			user.username
		);

		// switch users
		const response = await signin(user);

		const cookie2 = response.get('Set-Cookie');

		const { body: secondUserResponse } = await getCurrentUser({
			cookie: cookie2
		});

		expect(secondUserResponse.data.getCurrentUser.username).toStrictEqual(
			user.username
		);
	});
});
