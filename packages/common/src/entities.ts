import type { ObjectID, PopulatedDoc } from './util';

export interface Timestamps {
	createdAt: Date;
	updatedAt: Date;
}

export interface BaseModel extends Timestamps {
	_id: ObjectID;
}

export interface Message extends BaseModel {
	threadId: PopulatedDoc<PrivateThread>;
	sender: PopulatedDoc<User>;
	body: string;
}

export type MessageWithSender = Message & {
	sender: User;
};

// @todo PopulatedDoc
export interface PrivateThread extends BaseModel {
	users: [User, User];
}

export interface User extends BaseModel {
	username: string;
	email: string;
	userImage: string | null;
}

export interface Friend extends BaseModel {
	friendNodeX: PopulatedDoc<User>;
	friendNodeY: PopulatedDoc<User>;
}

export type FriendX = {
	friendNodeX: User;
	friendNodeY: ObjectID;
};

export type FriendY = {
	friendNodeX: ObjectID;
	friendNodeY: User;
};

export interface FriendRequest extends BaseModel {
	requester: PopulatedDoc<User>;
	recipient: PopulatedDoc<User>;
	status: FriendRequestStatus;
}

export interface ReceivedFriendRequest extends BaseModel {
	requester: User;
	recipient: ObjectID;
	status: FriendRequestStatus;
}

export interface SentFriendRequest extends BaseModel {
	requester: ObjectID;
	recipient: User;
	status: FriendRequestStatus;
}

export type FriendRequestStatus = 'ACCEPTED' | 'PENDING' | 'REJECTED';
