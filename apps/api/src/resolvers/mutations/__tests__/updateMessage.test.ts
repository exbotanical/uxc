import { UPDATE_MESSAGE, SIGNIN_MUTATION, CREATE_MESSAGE } from '@@/fixtures';
import { ObjectId } from 'mongodb';
import request from 'supertest';

import { app } from '@/app';
import { seed } from '@/resolvers/seed';
import { ERROR_MESSAGES } from '@/utils/constants';

describe('updateMessage workflow', () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: UPDATE_MESSAGE,
				variables: {
					messageId: 'any',
					body: 'any'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
		expect(body.errors[0].path[0]).toBe('updateMessage');
	});

	it('fails when not provided a messageId', async () => {
		const cookie = await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: UPDATE_MESSAGE,
				variables: {
					body: '_test_message_'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(ERROR_MESSAGES.E_NO_MESSAGE_ID);

		expect(body.errors[0].path[0]).toBe('updateMessage');
	});

	it('fails when provided a messageId that is not a valid ObjectID', async () => {
		const cookie = await join();

		const messageId = '123';

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: UPDATE_MESSAGE,
				variables: {
					messageId,
					body: '_test_message_'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(
			`The provided messageId ${messageId} is not a valid ObjectID`
		);

		expect(body.errors[0].path[0]).toBe('updateMessage');
	});

	it('fails when provided a messageId that does not exist in the database', async () => {
		const cookie = await join();

		const messageId = new ObjectId();

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: UPDATE_MESSAGE,
				variables: {
					messageId,
					body: '_test_message_'
				}
			})
			.expect(200);

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toEqual(
			`The provided messageId ${messageId} does not represent a resource in the database`
		);
		expect(body.errors[0].path[0]).toBe('updateMessage');
	});

	it('updates a message', async () => {
		const { threadIds, user } = await seed();

		const signinResponse = await request(app)
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

		const cookie = signinResponse.get('Set-Cookie');
		const threadId = threadIds[0];
		const body = 'body1';
		const newBody = 'body2';

		const { body: createMessageResponse } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_MESSAGE,
				variables: {
					threadId,
					body
				}
			})
			.expect(200);

		const { createMessage } = createMessageResponse.data;

		const { body: updateMessageResponse } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: UPDATE_MESSAGE,
				variables: {
					messageId: createMessage._id,
					body: newBody
				}
			})
			.expect(200);

		const { updateMessage } = updateMessageResponse.data;

		expect(updateMessage).toEqual(createMessage._id);
	});
});
