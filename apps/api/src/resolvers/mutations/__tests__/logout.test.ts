import { LOGOUT_MUTATION } from '@@/fixtures';
import request from 'supertest';


import { app } from '@/app';

describe('logout workflow', () => {
	it('clears the cookie after logging out', async () => {
		const cookie = await join();

		const response = await request(app)
			.post(globalThis.BASE_PATH)
			.set('Cookie', cookie)
			.send({
				query: LOGOUT_MUTATION
			})
			.expect(200);

		expect(response.get('Set-Cookie')).toBeUndefined();
	});
});
