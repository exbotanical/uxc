import { GET_FRIENDS, SIGNIN_MUTATION } from '@@/fixtures';
import { ERROR_MESSAGES } from '@uxc/common/node';
import request from 'supertest';

import { app } from '@/app';
import { seed } from '@/schema/resolvers/mutations/computed/seed';

const testSubject = 'getFriends';
describe(`${testSubject} workflow`, () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_FRIENDS,
				variables: {
					type: 'RECV'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it('retrieves all friends', async () => {
		const { user } = await seed();

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

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', response.get('Set-Cookie'))
			.send({
				query: GET_FRIENDS
			})
			.expect(200);

		const friends = body.data.getFriends;

		expect(friends).toHaveLength(11);
	});
});
