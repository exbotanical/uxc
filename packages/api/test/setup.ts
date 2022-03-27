/* eslint-disable jest/require-top-level-describe,vars-on-top,no-var */
import '@/dotenv';

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { pubsub, client } from '@/redis';
import { initializeServer } from '@/server';
import { validateConfig } from '@/utils';

declare global {
	var BASE_PATH: string;
}

globalThis.BASE_PATH = '/graphql';

jest.setTimeout(20000);

let mongo: MongoMemoryServer;
beforeAll(async () => {
	validateConfig();
	await initializeServer();

	process.env.JWT_SIGNING_KEY = 'test';

	mongo = await MongoMemoryServer.create();

	await mongoose.connect(mongo.getUri());
});

afterAll(() => {
	mongo.stop();
	mongoose.connection.close();

	pubsub.close();
	client.quit();
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	const tasks = [];

	for (const collection of collections) {
		tasks.push(collection.deleteMany({}));
	}

	await Promise.all(tasks);
});
