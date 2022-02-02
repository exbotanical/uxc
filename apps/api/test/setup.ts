/* eslint-disable jest/require-top-level-describe */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { initializeServer } from '@/server';

(async () => {
	await initializeServer();
})();

import { app } from '@/app';
import { JOIN_MUTATION } from '@/resolvers/__tests__/fixtures/queries';
import type { User } from '@uxc/types';

declare global {
	var join: () => Promise<string[]>;
	var user: Omit<User, '_id'>;
	var password: string;
	var BASE_PATH: string;
}

globalThis.BASE_PATH = '/graphql';

jest.setTimeout(20000);

let mongo: MongoMemoryServer;
beforeAll(async () => {
	process.env.JWT_SIGNING_KEY = 'test';

	mongo = await MongoMemoryServer.create();

	await mongoose.connect(mongo.getUri());
});

afterAll(() => {
	mongo.stop();
	mongoose.connection.close();
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	const tasks = [];

	for (const collection of collections) {
		tasks.push(collection.deleteMany({}));
	}

	await Promise.all(tasks);
});

globalThis.password = 'password';

globalThis.user = {
	email: 'test@test.com',
	username: 'username',
	userImage: 'url'
};

globalThis.join = async () => {
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

	return response.get('Set-Cookie');
};
