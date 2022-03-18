import { ObjectId } from 'mongodb';

import { compare, createSession, toHash } from '../auth';
import { decode } from '../jwt';

describe('auth utilities', () => {
	it('correctly compares hashed and plaintext passwords', async () => {
		const plaintext = 'plaintext';
		const hashed = await toHash(plaintext);

		await expect(compare(hashed, plaintext)).resolves.toBe(true);
	});

	it('creates an accessToken and a refreshToken from the provided ObjectID', () => {
		const id = new ObjectId().toString();

		const [decodedAccessToken, decodedRefreshToken] = Object.values(
			createSession(id)
		).map(decode);

		expect(decodedAccessToken?.id).toStrictEqual(id);
		expect(decodedRefreshToken?.id).toStrictEqual(id);
	});
});
