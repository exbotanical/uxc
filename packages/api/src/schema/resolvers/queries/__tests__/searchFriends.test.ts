import { SIGNIN_MUTATION, FRIEND_SEARCH } from '@@/fixtures';
import { ERROR_MESSAGES } from '@uxc/common/node';
import request from 'supertest';

import { app } from '@/app';
import { seed } from '@/schema/resolvers/mutations/computed/seed';

const testSubject = 'searchFriends';

describe(`${testSubject} workflow`, () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: FRIEND_SEARCH
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it('fails when not provided a query', async () => {
		const { cookie } = await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: FRIEND_SEARCH,
				variables: {}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_QUERY);

		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it.skip('returns friend search results', async () => {
		const { user, testUser2 } = await seed({ mode: 0 });

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
				query: FRIEND_SEARCH,
				variables: {
					query: testUser2.username
				}
			})
			.expect(200);

		console.log(body.data.searchFriends);
	});

	it.todo('searches only friends of the current user');
});
