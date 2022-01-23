export type UUID = string;
export type JWT = string;
export type TransactionId = UUID;

export type AuthCode = 'authenticate' | 'authorize' | 'logout' | 'renew';
export type CommandCode = 'create_channel' | 'message';
export type QueryCode = 'channel' | 'message';
export type SysCode = 'ack' | 'syn' | ErrorCode;
export type ErrorCode = 'error';
export type Opcode = AuthCode | CommandCode | QueryCode | ErrorCode;

export type ResponseOpcode =
	| ErrorCode
	| 'logout:reply'
	| 'authenticate:reply'
	| 'authorize:reply'
	| 'channel:reply'
	| 'create_channel:reply'
	| 'message:reply'
	| 'renew:reply';

export interface Message {
	message: string;
	// channelUuid: UUID;
	timestamp: Date | string;
	user: Pick<User, 'userImage' | 'username' | 'uuid'>;
	uuid: UUID;
}

export interface DirectMessageThread {
	user: User;
	uuid: UUID;
}

export interface Channel {
	users: User[];
	messages: Message[];
	uuid: UUID;
	name: string;
	desc: string;
}

export interface DirectChannel {
	user: User[];
	messages: Message[];
	uuid: UUID;
}

export interface User {
	uuid: UUID;
	username: string;
	userImage: string;
	directMessageThreads: DirectMessageThread[];
	channels: Pick<Channel, 'desc' | 'name' | 'uuid'>[];
	currentChannel: Pick<Channel, 'desc' | 'name' | 'uuid'>;
}

export interface UserTokens {
	accessToken: JWT;
	refreshToken: JWT;
}

export type UserSession = User & UserTokens;
