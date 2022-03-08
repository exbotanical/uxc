import { CREATE_MESSAGE, SIGNIN_MUTATION } from '@@/fixtures';
import { ERROR_MESSAGES } from '@uxc/types/node';
import { ObjectId } from 'mongodb';
import request from 'supertest';

import { app } from '@/app';
import { seed } from '@/resolvers/mutations/computed/seed';

describe('createMessage workflow', () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: CREATE_MESSAGE,
				variables: {
					threadId: 'any',
					body: 'any'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
		expect(body.errors[0].path[0]).toBe('createMessage');
	});

	it.todo(
		'it fails with a user session error if the request data passes the auth guard but the session does not exist on the req object (edge case)'
	);

	it('fails when not provided a threadId', async () => {
		const cookie = await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_MESSAGE,
				variables: {
					body: '_test_message_'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_THREAD_ID);

		expect(body.errors[0].path[0]).toBe('createMessage');
	});

	it('fails when provided a threadId that is not a valid ObjectID', async () => {
		const cookie = await join();

		const threadId = '123';

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_MESSAGE,
				variables: {
					threadId,
					body: '_test_message_'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			`The provided threadId ${threadId} is not a valid ObjectID`
		);

		expect(body.errors[0].path[0]).toBe('createMessage');
	});

	it('fails when provided a threadId that does not exist in the database', async () => {
		const cookie = await join();

		const threadId = new ObjectId();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_MESSAGE,
				variables: {
					threadId,
					body: '_test_message_'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			`The provided threadId ${threadId} does not represent a resource in the database`
		);
		expect(body.errors[0].path[0]).toBe('createMessage');
	});

	it('creates a new message', async () => {
		const { threadIds, user } = await seed();

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

		const cookie = response.get('Set-Cookie');
		const messageBody = '_test_message_';

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_MESSAGE,
				variables: {
					threadId: threadIds[0],
					body: messageBody
				}
			})
			.expect(200);

		const { createMessage } = body.data;

		expect(createMessage.body).toStrictEqual(messageBody);
		expect(createMessage.threadId).toStrictEqual(threadIds[0].toString());
	});
});
