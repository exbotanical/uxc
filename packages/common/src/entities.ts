import type { ObjectID, PopulatedDoc } from './util';

export type FriendRequestStatus = 'ACCEPTED' | 'PENDING' | 'REJECTED';

export type FriendRequestOptions = 'SENT' | 'RECV' | 'BOTH';

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

export interface FriendX {
	friendNodeX: User;
	friendNodeY: ObjectID;
}

export interface FriendY {
	friendNodeX: ObjectID;
	friendNodeY: User;
}

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

export interface SearchFriendsResult {
	friends: User[];
	sent: User[];
	received: User[];
}
