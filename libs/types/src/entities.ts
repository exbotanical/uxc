import type { ObjectID } from './util';

export type MessageWithSender = Omit<Message, 'sender'> & { sender: User };

export interface Message {
	_id: ObjectID;
	threadId: ObjectID;
	sender: ObjectID;
	createdAt: Date;
	updatedAt: Date;
	body: string;
}

export interface PrivateThread {
	_id: ObjectID;
	createdAt: Date;
	updatedAt: Date;
	users: [User, User];
}

export interface CommunityThread {
	_id: ObjectID;
	createdAt: Date;
	updatedAt: Date;
	users: User[];
}

export interface User {
	_id: ObjectID;
	username: string;
	email: string;
	userImage: string | null;
}
