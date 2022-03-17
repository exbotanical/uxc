import { SIGNOUT_MUTATION } from '@@/fixtures';
import request from 'supertest';

import { app } from '@/app';

describe('signout workflow', () => {
	it('clears the cookie after logging out', async () => {
		const { cookie } = await join();

		const response = await request(app)
			.post(globalThis.BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: SIGNOUT_MUTATION
			})
			.expect(200);

		expect(response.get('Set-Cookie')).toBeUndefined();
	});
});
