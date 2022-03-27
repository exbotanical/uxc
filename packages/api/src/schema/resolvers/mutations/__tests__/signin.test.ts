import { join, signin, user } from '@@/utils';
import { ERROR_MESSAGES } from '@uxc/common/node';

describe('signin workflow', () => {
	it('responds with a cookie when signin is successful', async () => {
		await join();

		const response = await signin();

		expect(response.get('Set-Cookie')).toBeDefined();
	});

	it('responds with the user when signin is successful', async () => {
		await join();
		const { body } = await signin();
		const { email, userImage, username } = user;

		expect(body.data.signin).toMatchObject({
			email,
			userImage,
			username,
			_id: expect.any(String)
		});
	});

	it('returns an error when provided no email address', async () => {
		await join();

		const { body } = await signin({ email: '', password: user.password });

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_INVALID_EMAIL
		);
		expect(body.errors[0].extensions.exception.field).toBe('email');
	});

	it('returns an error when provided no password', async () => {
		await join();

		const { body } = await signin({ email: user.email, password: void 0 });

		expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_PASSWORD);
		expect(body.errors[0].extensions.exception.field).toBe('password');
	});

	it('returns a generic error when the given credentials do not match those of any known user', async () => {
		await join();

		const { body } = await signin({
			email: 'bob_odenkirk@bcs.bb',
			password: 'random'
		});

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_INVALID_CREDENTIALS
		);
	});

	it('returns a generic error when an incorrect password is supplied', async () => {
		await join();

		const { body } = await signin({
			email: user.email,
			password: 'random'
		});

		expect(body.errors[0].message).toStrictEqual(
			ERROR_MESSAGES.E_INVALID_CREDENTIALS
		);
	});
});
