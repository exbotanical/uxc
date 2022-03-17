/* eslint-disable jest/require-top-level-describe,vars-on-top,no-var */
import '@/dotenv';

import { JOIN_MUTATION } from '@@/fixtures';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import type { ObjectID, User } from '@uxc/types/node';

import { app } from '@/app';
import { pubsub, client } from '@/redis';
import { initializeServer } from '@/server';
import { validateConfig } from '@/utils';

type UserWithPassword = Omit<User, '_id' | 'createdAt' | 'updatedAt'>;

declare global {
	var join: (overrideUser?: UserWithPassword) => Promise<{
		cookie: string[];
		id: ObjectID;
	}>;

	var taleOfTwoUsers: () => Promise<{
		cookie: string[];
		cookie2: string[];
		id: ObjectID;
		id2: ObjectID;
		testUser: UserWithPassword;
	}>;

	var user: UserWithPassword;
	var password: string;
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

globalThis.password = 'password';

globalThis.user = {
	email: 'test@test.com',
	userImage: 'url',
	username: 'username'
};

globalThis.join = async (overrideUser?: UserWithPassword) => {
	const response = await request(app)
		.post(BASE_PATH)
		.send({
			query: JOIN_MUTATION,
			variables: {
				args: overrideUser
					? { ...overrideUser }
					: {
							...user,
							password
					  }
			}
		})
		.expect(200);

	return {
		cookie: response.get('Set-Cookie'),
		id: response.body.data.join._id
	};
};

globalThis.taleOfTwoUsers = async () => {
	const testUser = {
		username: 'username1',
		password: 'password123',
		email: 'useremail@mail.com',
		userImage: 'url'
	};

	const { cookie, id } = await join();
	const { cookie: cookie2, id: id2 } = await join(testUser);

	return {
		cookie,
		cookie2,
		id,
		id2,
		testUser
	};
};
