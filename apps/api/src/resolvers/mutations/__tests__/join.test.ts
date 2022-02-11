import request from 'supertest';

import { JOIN_MUTATION } from '@@/fixtures';

import { app } from '@/app';
import { ERROR_MESSAGES } from '@/utils/constants';

describe('join workflow', () => {
	it('sets a cookie when the user has been created', async () => {
		const response = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password
					}
				}
			})
			.expect(200);

		expect(response.get('Set-Cookie')).toBeDefined();
	});

	it('returns the new user data when a new user has been created', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password
					}
				}
			})
			.expect(200);

		expect(body.data.join).toMatchObject({
			...user,
			_id: expect.any(String)
		});
	});

	it('sets non-required user fields to `null` upon creation', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password,
						userImage: null
					}
				}
			})
			.expect(200);

		expect(body.data.join).toMatchObject({
			...user,
			_id: expect.any(String),
			userImage: null
		});
	});

	it('returns an error when provided no email address', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						email: null,
						password
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_EMAIL);
	});

	it('returns an error when provided no password', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password: null
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_PASSWORD);
	});

	it('returns an error when provided no username', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						username: null,
						password
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_USERNAME);
	});

	it('returns an error when provided an invalid email address', async () => {
		const { body: body1 } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						email: 'e',
						password
					}
				}
			})
			.expect(200);

		expect(body1.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_INVALID_EMAIL
		);

		const { body: body2 } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						email: 'email@nope',
						password
					}
				}
			})
			.expect(200);

		expect(body2.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_INVALID_EMAIL
		);
	});

	it('returns an error when provided a username that is too long', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						username: 'x'.repeat(22),
						password
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_LONG_USERNAME
		);
	});

	it('returns an error when provided a username that is too short', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						username: 'x'.repeat(3),
						password
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_SHORT_USERNAME
		);
	});

	it('returns an error when provided a password that is too long', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password: 'x'.repeat(22)
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_LONG_PASSWORD
		);
	});

	it('returns an error when provided a password that is too short', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password: 'x'.repeat(6)
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_SHORT_PASSWORD
		);
	});

	it('returns an error when provided an email that is taken', async () => {
		await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password
					}
				}
			})
			.expect(200);

		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_CREDENTIALS_TAKEN
		);
	});

	it('returns an error when provided a username that is taken', async () => {
		await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password
					}
				}
			})
			.expect(200);

		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_CREDENTIALS_TAKEN
		);
	});
});
