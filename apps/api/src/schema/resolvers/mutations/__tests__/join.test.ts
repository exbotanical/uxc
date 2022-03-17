import { JOIN_MUTATION } from '@@/fixtures';
import {
	EMAIL_CHARS_MAX,
	ERROR_MESSAGES,
	PASSWORD_CHARS_MAX,
	PASSWORD_CHARS_MIN,
	USERNAME_CHARS_MAX,
	USERNAME_CHARS_MIN
} from '@uxc/types/node';
import request from 'supertest';

import { app } from '@/app';

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

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_INVALID_EMAIL
		);
		expect(body.errors[0].extensions.exception.field).toBe('email');
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

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_NO_NEW_PASSWORD
		);
		expect(body.errors[0].extensions.exception.field).toBe('password');
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
		expect(body.errors[0].extensions.exception.field).toBe('username');
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
		expect(body1.errors[0].extensions.exception.field).toBe('email');

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
		expect(body2.errors[0].extensions.exception.field).toBe('email');
	});

	it('returns an error when provided an email that is too long', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						email: 'x@e.c'.repeat(EMAIL_CHARS_MAX - 4),
						username: 'username',
						password
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_INVALID_EMAIL
		);
		expect(body.errors[0].extensions.exception.field).toBe('email');
	});

	it('returns an error when provided a username that is too long', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						username: 'x'.repeat(USERNAME_CHARS_MAX + 1),
						password
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_LONG_USERNAME
		);
		expect(body.errors[0].extensions.exception.field).toBe('username');
	});

	it('returns an error when provided a username that is too short', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						username: 'x'.repeat(USERNAME_CHARS_MIN - 1),
						password
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_SHORT_USERNAME
		);
		expect(body.errors[0].extensions.exception.field).toBe('username');
	});

	it('returns an error when provided a password that is too long', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password: 'x'.repeat(PASSWORD_CHARS_MAX + 1)
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_LONG_PASSWORD
		);
		expect(body.errors[0].extensions.exception.field).toBe('password');
	});

	it('returns an error when provided a password that is too short', async () => {
		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user,
						password: 'x'.repeat(PASSWORD_CHARS_MIN - 1)
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_SHORT_PASSWORD
		);
		expect(body.errors[0].extensions.exception.field).toBe('password');
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
			ERROR_MESSAGES.E_CREDENTIALS_TAKEN_FRIENDLY
		);
		// expect(body.errors[0].extensions.exception.field).toStrictEqual(null);
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
			ERROR_MESSAGES.E_CREDENTIALS_TAKEN_FRIENDLY
		);
	});
});
