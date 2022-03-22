import { SIGNIN_MUTATION, TEXT_SEARCH } from '@@/fixtures';
import { ERROR_MESSAGES } from '@uxc/common/node';
import type { Message, PrivateThread } from '@uxc/common/node';
import request from 'supertest';

import { app } from '@/app';
import { seed } from '@/schema/resolvers/mutations/computed/seed';
import testMessages from '../../../../../test/fixtures/messages.json';

const testSubject = 'search';

describe(`${testSubject} workflow`, () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: TEXT_SEARCH
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
				query: TEXT_SEARCH,
				variables: {}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_QUERY);

		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it('returns message results', async () => {
		const expectedMatches = 4;
		const query = 'test';

		const { user } = await seed({ mode: 0 });

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
			.send({
				query: TEXT_SEARCH,
				variables: {
					query
				}
			})
			.set('Cookie', response.get('Set-Cookie'))
			.expect(200);

		const data: Message[] = body.data.search;

		data.forEach((result, idx) => {
			expect(result.body.toLowerCase()).toContain(query);
		});

		expect(data.map((result) => result.body)).toEqual(
			expect.arrayContaining(testMessages.slice(0, expectedMatches))
		);
	});

	it('returns private thread results', async () => {
		const { user, testUser2 } = await seed({ mode: 0 });
		const query = testUser2.username;

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
			.send({
				query: TEXT_SEARCH,
				variables: {
					query
				}
			})
			.set('Cookie', response.get('Set-Cookie'))
			.expect(200);

		const data: PrivateThread[] = body.data.search;

		const spy = jest.fn();
		data[0].users.forEach(({ username }) => {
			if (username.toLowerCase().includes(query.toLowerCase())) {
				spy();
			}
		});

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('ignores messages not to or from the current user', async () => {
		const query = 'test';
		await seed({ mode: 0 });
		const { cookie } = await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: TEXT_SEARCH,
				variables: {
					query
				}
			})
			.expect(200);

		const data = body.data.search;

		expect(data).toHaveLength(0);
	});

	it('ignores threads in which the current user is not a member', async () => {
		const { testUser2 } = await seed({ mode: 0 });
		const { cookie } = await join();
		const query = testUser2.username;

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: TEXT_SEARCH,
				variables: {
					query
				}
			})
			.expect(200);

		const data = body.data.search;

		expect(data).toHaveLength(0);
	});
});
