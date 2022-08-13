import {
	CREATE_FRIEND_REQUEST,
	FRIEND_SEARCH,
	GET_CURRENT_USER,
	GET_FRIENDS,
	JOIN_MUTATION,
	SIGNIN_MUTATION,
	TEXT_SEARCH
} from '@@/fixtures';
import request from 'supertest';

import { app } from '@/app';

import type { ObjectID, User } from '@uxc/common/node';


type Maybe<T extends Record<any, any>> = {
	[K in keyof T]?: T[K];
};

type UserWithPassword = Omit<User, '_id' | 'createdAt' | 'updatedAt'> & {
	password?: string;
};

interface JoinPayload {
	data: {
		join: {
			_id: ObjectID;
		};
	};
	errors: { message: string; extensions: any }[];
}

interface GenericArgs {
	cookie: string[];
	variables?: Record<any, any>;
}

export const user = {
	password: 'password',
	email: 'test@test.com',
	userImage: 'url',
	username: 'username'
};

export async function signin(overrideUser?: {
	email?: string;
	password?: string;
}) {
	const { email, password } = overrideUser || user;

	return request(app)
		.post(BASE_PATH)
		.send({
			query: SIGNIN_MUTATION,
			variables: {
				args: {
					email,
					password
				}
			}
		})
		.expect(200);
}

export async function join(overrideUser?: Maybe<UserWithPassword>) {
	const response = await request(app)
		.post(BASE_PATH)
		.send({
			query: JOIN_MUTATION,
			variables: {
				args: overrideUser || user
			}
		})
		.expect(200);

	const { data, errors } = response.body as JoinPayload;

	return {
		cookie: response.get('Set-Cookie'),
		data: data.join,
		errors
	};
}

export async function diad() {
	const testUser = {
		username: 'username1',
		password: 'password123',
		email: 'useremail@mail.com',
		userImage: 'url'
	};

	const { cookie, data } = await join();
	const { cookie: cookie2, data: data2 } = await join(testUser);

	return {
		cookie,
		cookie2,
		id: data._id,
		id2: data2._id,
		testUser
	};
}

export async function searchFriends({ cookie, variables }: GenericArgs) {
	return request(app)
		.post(BASE_PATH)
		.set('Cookie', cookie)
		.send({
			query: FRIEND_SEARCH,
			variables
		})
		.expect(200);
}

export async function search({ cookie, variables }: GenericArgs) {
	return request(app)
		.post(BASE_PATH)
		.set('Cookie', cookie)
		.send({
			query: TEXT_SEARCH,
			variables
		})
		.expect(200);
}

export async function createFriendRequest({ cookie, variables }: GenericArgs) {
	return request(app)
		.post(BASE_PATH)
		.set('Cookie', cookie)
		.send({
			query: CREATE_FRIEND_REQUEST,
			variables
		})
		.expect(200);
}

export async function getFriends({ cookie, variables }: GenericArgs) {
	return request(app)
		.post(BASE_PATH)
		.set('Cookie', cookie)
		.send({
			query: GET_FRIENDS,
			variables
		})
		.expect(200);
}

export async function getCurrentUser({ cookie }: GenericArgs) {
	return request(app)
		.post(BASE_PATH)
		.set('Cookie', cookie)
		.send({
			query: GET_CURRENT_USER
		})
		.expect(200);
}
