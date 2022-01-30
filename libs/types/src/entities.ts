import type { ObjectID } from './util';

export interface Message {
	_id: ObjectID;
	roomId: ObjectID;
	sender: ObjectID;
	createdAt: Date;
	updatedAt: Date;
	body: string;
}

export interface DirectRoom {
	_id: ObjectID;
	createdAt: Date;
	updatedAt: Date;
	users: [User, User];
}

export interface User {
	_id: ObjectID;
	currentRoomId: ObjectID | null;
	username: string;
	email: string;
	userImage: string | null;
}
