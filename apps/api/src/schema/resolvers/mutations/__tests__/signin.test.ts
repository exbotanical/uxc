import { SIGNIN_MUTATION } from '@@/fixtures';
import { ERROR_MESSAGES } from '@uxc/types/node';
import request from 'supertest';

import { app } from '@/app';

describe('signin workflow', () => {
	it('responds with a cookie when signin is successful', async () => {
		await join();

		const response = await request(app)
			.post(globalThis.BASE_PATH)
			.send({
				query: SIGNIN_MUTATION,
				variables: {
					args: {
						email: user.email,
						password
					}
				}
			})
			.expect(200);

		expect(response.get('Set-Cookie')).toBeDefined();
	});

	it('responds with the user when signin is successful', async () => {
		await join();

		const { body } = await request(app)
			.post(globalThis.BASE_PATH)
			.send({
				query: SIGNIN_MUTATION,
				variables: {
					args: {
						email: user.email,
						password
					}
				}
			})
			.expect(200);

		expect(body.data.signin).toMatchObject({
			...user,
			_id: expect.any(String)
		});
	});

	it('returns an error when provided no email address', async () => {
		await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: SIGNIN_MUTATION,
				variables: {
					args: {
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
		await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: SIGNIN_MUTATION,
				variables: {
					args: {
						email: user.email,
						password: null
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_PASSWORD);
		expect(body.errors[0].extensions.exception.field).toBe('password');
	});

	it('returns a generic error when the given credentials do not match those of any known user', async () => {
		await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: SIGNIN_MUTATION,
				variables: {
					args: {
						email: user.email,
						password: 'random'
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_INVALID_CREDENTIALS
		);
	});

	it('returns a generic error when an incorrect password is supplied', async () => {
		await join();

		const { body } = await request(app)
			.post(BASE_PATH)
			.send({
				query: SIGNIN_MUTATION,
				variables: {
					args: {
						email: 'random@mail.com',
						password
					}
				}
			})
			.expect(200);

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_INVALID_CREDENTIALS
		);
	});
});
