import { JOIN_MUTATION } from '@@/fixtures';
import { join, user } from '@@/utils';
import {
	EMAIL_CHARS_MAX,
	ERROR_MESSAGES,
	PASSWORD_CHARS_MAX,
	PASSWORD_CHARS_MIN,
	USERNAME_CHARS_MAX,
	USERNAME_CHARS_MIN
} from '@uxc/common/node';
import request from 'supertest';

import { app } from '@/app';

describe('join workflow', () => {
	it('sets a cookie when the user has been created', async () => {
		const response = await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: user
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
					args: user
				}
			})
			.expect(200);

		const { email, username, userImage } = user;

		expect(body.data.join).toMatchObject({
			email,
			username,
			userImage,
			_id: expect.any(String)
		});
	});

	it('sets non-required user fields to `null` upon creation', async () => {
		const { email, username } = user;

		const { data } = await join({
			...user,
			userImage: null
		});

		expect(data).toMatchObject({
			email,
			username,
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
						email: null
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
		const { errors } = await join({
			...user,
			password: void 0
		});

		expect(errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_NEW_PASSWORD);
		expect(errors[0].extensions.exception.field).toBe('password');
	});

	it('returns an error when provided no username', async () => {
		const { errors } = await join({
			...user,
			username: void 0
		});

		expect(errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_USERNAME);
		expect(errors[0].extensions.exception.field).toBe('username');
	});

	it('returns an error when provided an invalid email address', async () => {
		const { errors } = await join({
			...user,
			email: 'e'
		});

		expect(errors[0].message).toStrictEqual(ERROR_MESSAGES.E_INVALID_EMAIL);
		expect(errors[0].extensions.exception.field).toBe('email');

		const { errors: errors2 } = await join({
			...user,
			email: 'email@nope'
		});

		expect(errors2[0].message).toStrictEqual(ERROR_MESSAGES.E_INVALID_EMAIL);
		expect(errors2[0].extensions.exception.field).toBe('email');
	});

	it('returns an error when provided an email that is too long', async () => {
		const { errors } = await join({
			...user,
			email: 'x@e.c'.repeat(EMAIL_CHARS_MAX - 4),
			username: 'username'
		});

		expect(errors[0].message).toStrictEqual(ERROR_MESSAGES.E_INVALID_EMAIL);
		expect(errors[0].extensions.exception.field).toBe('email');
	});

	it('returns an error when provided a username that is too long', async () => {
		const { errors } = await join({
			...user,
			username: 'x'.repeat(USERNAME_CHARS_MAX + 1)
		});

		expect(errors[0].message).toStrictEqual(ERROR_MESSAGES.E_LONG_USERNAME);
		expect(errors[0].extensions.exception.field).toBe('username');
	});

	it('returns an error when provided a username that is too short', async () => {
		const { errors } = await join({
			...user,
			username: 'x'.repeat(USERNAME_CHARS_MIN - 1)
		});

		expect(errors[0].message).toStrictEqual(ERROR_MESSAGES.E_SHORT_USERNAME);
		expect(errors[0].extensions.exception.field).toBe('username');
	});

	it('returns an error when provided a password that is too long', async () => {
		const { errors } = await join({
			...user,
			password: 'x'.repeat(PASSWORD_CHARS_MAX + 1)
		});

		expect(errors[0].message).toStrictEqual(ERROR_MESSAGES.E_LONG_PASSWORD);
		expect(errors[0].extensions.exception.field).toBe('password');
	});

	it('returns an error when provided a password that is too short', async () => {
		const { errors } = await join({
			...user,
			password: 'x'.repeat(PASSWORD_CHARS_MIN - 1)
		});

		expect(errors[0].message).toStrictEqual(ERROR_MESSAGES.E_SHORT_PASSWORD);
		expect(errors[0].extensions.exception.field).toBe('password');
	});

	it('returns an error when provided an email that is taken', async () => {
		await request(app)
			.post(BASE_PATH)
			.send({
				query: JOIN_MUTATION,
				variables: {
					args: {
						...user
					}
				}
			})
			.expect(200);

		await join({
			...user
		});

		const { errors } = await join({
			...user
		});

		expect(errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_CREDENTIALS_TAKEN_FRIENDLY
		);
		// expect(body.errors[0].extensions.exception.field).toStrictEqual(null);
	});

	it('returns an error when provided a username that is taken', async () => {
		await join({
			...user
		});

		const { errors } = await join({
			...user
		});

		expect(errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_CREDENTIALS_TAKEN_FRIENDLY
		);
	});
});
