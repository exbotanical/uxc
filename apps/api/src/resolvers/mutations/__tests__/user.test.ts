import { GET_CURRENT_USER } from '@@/fixtures';
import request from 'supertest';


import { app } from '@/app';
import { ERROR_MESSAGES } from '@/utils/constants';

describe('user context workflow', () => {
	it('returns the current user data', async () => {
		const cookie = await join();

		const { body } = await request(app)
			.post(globalThis.BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: GET_CURRENT_USER
			})
			.expect(200);

		expect(body.data.getCurrentUser).toMatchObject({
			...user,
			_id: expect.any(String)
		});
	});

	it('returns an error if the requester is not authenticated', async () => {
		const { body } = await request(app)
			.post(globalThis.BASE_PATH)
			.send({
				query: GET_CURRENT_USER
			})
			.expect(200);

		expect(body.errors[0].message).toEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
	});
});
