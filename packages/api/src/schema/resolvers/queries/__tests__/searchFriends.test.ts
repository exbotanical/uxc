import {
	SIGNIN_MUTATION,
	FRIEND_SEARCH,
	CREATE_FRIEND_REQUEST
} from '@@/fixtures';
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

	it('returns friend search results', async () => {
		const { user, testUser2 } = await seed();

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

		const { friends, sent, received } = body.data.searchFriends;

		expect(friends).toHaveLength(1);
		expect(sent).toHaveLength(0);
		expect(received).toHaveLength(0);

		expect(testUser2.username).toStrictEqual(friends[0].username);
	});

	it('searches only friends of the current user', async () => {
		const { cookie } = await join();
		const { testUser2 } = await seed();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: FRIEND_SEARCH,
				variables: {
					query: testUser2.username
				}
			})
			.expect(200);

		const { friends } = body.data.searchFriends;

		expect(friends).toHaveLength(0);
	});

	it('searches sent friend requests', async () => {
		const { user } = await seed();
		const { cookie } = await join();

		const response = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: {
					recipientId: user._id
				}
			})
			.expect(200);

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', response.get('Set-Cookie'))
			.send({
				query: FRIEND_SEARCH,
				variables: {
					query: user.username,
					type: 'SENT'
				}
			})
			.expect(200);

		const { friends, sent, received } = body.data.searchFriends;

		expect(friends).toHaveLength(0);
		expect(sent).toHaveLength(1);
		expect(received).toHaveLength(0);

		expect(sent[0]._id.toString()).toStrictEqual(user._id.toString());
	});

	it('searches received friend requests', async () => {
		const { user } = await seed();
		const { cookie, id } = await join();

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

		await request(app)
			.post(BASE_PATH)
			.set('Cookie', response.get('Set-Cookie'))
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: {
					recipientId: id
				}
			})
			.expect(200);

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: FRIEND_SEARCH,
				variables: {
					query: user.username,
					type: 'RECV'
				}
			})
			.expect(200);

		const { friends, sent, received } = body.data.searchFriends;

		expect(friends).toHaveLength(0);
		expect(sent).toHaveLength(0);
		expect(received).toHaveLength(1);

		expect(received[0]._id.toString()).toStrictEqual(user._id.toString());
	});
});
