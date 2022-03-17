import { CREATE_FRIEND_REQUEST, GET_FRIEND_REQUESTS } from '@@/fixtures';
import { ERROR_MESSAGES } from '@uxc/types/node';
import request from 'supertest';

import { app } from '@/app';

const testSubject = 'getFriendRequests';
describe(`${testSubject} workflow`, () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_FRIEND_REQUESTS,
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

	it('retrieves all received friend requests', async () => {
		const { cookie, cookie2, id, id2 } = await taleOfTwoUsers();

		await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie2)
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
				query: GET_FRIEND_REQUESTS,
				variables: {
					type: 'RECV'
				}
			})
			.expect(200);

		const friendRequest = body.data.getFriendRequests[0];

		expect(body.data.getFriendRequests).toHaveLength(1);
		expect(friendRequest.recipient._id).toStrictEqual(id);
		expect(friendRequest.requester._id).toStrictEqual(id2);
		expect(friendRequest.status).toBe('PENDING');
	});

	it('retrieves all sent friend requests', async () => {
		const { cookie, id, id2 } = await taleOfTwoUsers();

		await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: CREATE_FRIEND_REQUEST,
				variables: {
					recipientId: id2
				}
			})
			.expect(200);

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: GET_FRIEND_REQUESTS,
				variables: {
					type: 'SENT'
				}
			})
			.expect(200);

		const friendRequest = body.data.getFriendRequests[0];

		expect(body.data.getFriendRequests).toHaveLength(1);
		expect(friendRequest.recipient._id).toStrictEqual(id2);
		expect(friendRequest.requester._id).toStrictEqual(id);
		expect(friendRequest.status).toBe('PENDING');
	});
});
