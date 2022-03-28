import { createFriendRequest, join, searchFriends, signin } from '@@/utils';
import { ERROR_MESSAGES } from '@uxc/common/node';

import { seed } from '@/schema/resolvers/mutations/computed/seed';

const testSubject = 'searchFriends';

describe(`${testSubject} workflow`, () => {
	it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
		const { body } = await searchFriends({ cookie: [''], variables: {} });

		expect(body.errors).toHaveLength(1);
		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED
		);
		expect(body.errors[0].path[0]).toBe(testSubject);
	});

	it('returns friend search results per the given query', async () => {
		const { user, users } = await seed();

		const response = await signin(user);

		const { body } = await searchFriends({
			cookie: response.get('Set-Cookie'),
			variables: {
				query: users[0].username
			}
		});

		const { friends, sent, received } = body.data.searchFriends;

		expect(friends).toHaveLength(1);
		expect(sent).toHaveLength(0);
		expect(received).toHaveLength(0);

		expect(users[0].username).toStrictEqual(friends[0].username);
	});

	it('searches only friends of the current user', async () => {
		const { cookie } = await join();
		const { users } = await seed();

		const { body } = await searchFriends({
			cookie,
			variables: {
				query: users[0].username
			}
		});

		const { friends } = body.data.searchFriends;

		expect(friends).toHaveLength(0);
	});

	it('searches sent friend requests', async () => {
		const { user } = await seed();
		const { cookie } = await join();

		await createFriendRequest({
			cookie,
			variables: {
				recipientId: user._id
			}
		});

		const { body } = await searchFriends({
			cookie,
			variables: {
				query: user.username,
				type: 'SENT'
			}
		});

		const { friends, sent, received } = body.data.searchFriends;

		expect(friends).toHaveLength(0);
		expect(sent).toHaveLength(1);
		expect(received).toHaveLength(0);

		expect(sent[0]._id.toString()).toStrictEqual(user._id.toString());
	});

	it('searches received friend requests', async () => {
		const { user } = await seed();
		const { cookie, data } = await join();

		const response = await signin(user);

		await createFriendRequest({
			cookie: response.get('Set-Cookie'),
			variables: {
				recipientId: data._id
			}
		});

		const { body } = await searchFriends({
			cookie,
			variables: {
				query: user.username,
				type: 'RECV'
			}
		});

		const { friends, sent, received } = body.data.searchFriends;

		expect(friends).toHaveLength(0);
		expect(sent).toHaveLength(0);
		expect(received).toHaveLength(1);

		expect(received[0]._id.toString()).toStrictEqual(user._id.toString());
	});

	it.only('retrieves all friends when provided no query', async () => {
		const { user } = await seed();

		const response = await signin(user);

		const { body } = await searchFriends({
			cookie: response.get('Set-Cookie'),
			variables: {}
		});

		const { friends, sent, received } = body.data.searchFriends;

		expect(friends).toHaveLength(11);
		expect(sent).toHaveLength(0);
		expect(received).toHaveLength(0);
	});
});
