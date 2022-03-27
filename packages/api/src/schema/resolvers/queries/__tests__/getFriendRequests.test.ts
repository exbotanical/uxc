import {
	GET_FRIEND_REQUESTS_RECV,
	GET_FRIEND_REQUESTS_SENT
} from '@@/fixtures';
import { createFriendRequest, diad } from '@@/utils';
import { ERROR_MESSAGES } from '@uxc/common/node';
import request from 'supertest';

import { app } from '@/app';

const testSubject = 'getFriendRequests';
describe(`${testSubject} workflow`, () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: GET_FRIEND_REQUESTS_RECV,
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
		const { cookie, cookie2, id, id2 } = await diad();

		await createFriendRequest({
			cookie: cookie2,
			variables: {
				recipientId: id
			}
		});

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: GET_FRIEND_REQUESTS_RECV,
				variables: {
					type: 'RECV'
				}
			})
			.expect(200);

		const friendRequest = body.data.getFriendRequests[0];

		expect(body.data.getFriendRequests).toHaveLength(1);
		expect(friendRequest.recipient).toStrictEqual(id);
		expect(friendRequest.requester._id).toStrictEqual(id2);
		expect(friendRequest.status).toBe('PENDING');
	});

	it('retrieves all sent friend requests', async () => {
		const { cookie, id, id2 } = await diad();

		await createFriendRequest({
			cookie,
			variables: {
				recipientId: id2
			}
		});

		const { body } = await request(app)
			.post(BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: GET_FRIEND_REQUESTS_SENT,
				variables: {
					type: 'SENT'
				}
			})
			.expect(200);

		const friendRequest = body.data.getFriendRequests[0];

		expect(body.data.getFriendRequests).toHaveLength(1);
		expect(friendRequest.recipient._id).toStrictEqual(id2);
		expect(friendRequest.requester).toStrictEqual(id);
		expect(friendRequest.status).toBe('PENDING');
	});
});
