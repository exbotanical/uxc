import { CREATE_FRIEND_REQUEST, SIGNIN_MUTATION } from '@@/fixtures';
import { ERROR_MESSAGES } from '@uxc/common/node';
import request from 'supertest';

import { app } from '@/app';
import { seed } from '@/schema/resolvers/mutations/computed/seed';

const testSubject = 'createFriendRequest';
describe(`${testSubject} workflow`, () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { userIds } = await seed({ mode: 0 });

		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: {
					recipientId: userIds[0]
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it('fails when not provided a recipientId', async () => {
		const { cookie } = await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: { recipientId: null }
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_RECIPIENT);

		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it('fails when provided a recipientId that is not a valid ObjectID', async () => {
		const { cookie } = await join();
		const badRecipientId = 'test';

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: {
					recipientId: badRecipientId
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			`The provided recipientId ${badRecipientId} is not a valid ObjectID.`
		);

		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it('fails when provided a recipientId that equals that of the requester', async () => {
		const { cookie, id } = await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: {
					recipientId: id
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_NO_SELF_REQUEST
		);

		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it('fails when provided a recipientId that does not exist in the database', async () => {
		const { threadIds } = await seed({ mode: 0 });

		const { cookie } = await join();
		const threadId = threadIds[0];

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: {
					recipientId: threadId
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			`The provided recipientId ${threadId} does not represent a resource in the database.`
		);

		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it.skip('@todo fails when creating a friend request between two users that are already friends', async () => {
		const { user, testUser2 } = await seed();

		const response = await request(app)
			.post(BASE_PATH)
			.send({
				query: SIGNIN_MUTATION,
				variables: {
					args: {
						email: testUser2.email,
						password: testUser2.password
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
					recipientId: user._id
				}
			})
			.expect(200);

		expect(1).toBe(1);
	});

	it('fails when creating a duplicate friend request', async () => {
		const { userIds } = await seed({ mode: 0 });
		const { cookie } = await join();

		await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: {
					recipientId: userIds[0]
				}
			})
			.expect(200);

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: {
					recipientId: userIds[0]
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_DUPE_FRIEND_RQ
		);

		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it('creates a friend request', async () => {
		const { userIds } = await seed({ mode: 0 });
		const { cookie } = await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: {
					recipientId: userIds[0]
				}
			})
			.expect(200);

		expect(body.data.createFriendRequest).toStrictEqual(expect.any(String));
	});
});
