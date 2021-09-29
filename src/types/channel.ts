import type { UUID } from './const';
import type { IMessage } from './message';
import type { IUser } from './user';

export interface IChannel {
	users: IUser[];
	messages: IMessage[];
	uuid: UUID;
	name: string;
	desc: string;
}

export interface IDirectChannel {
	user: IUser[];
	messages: IMessage[];
	uuid: UUID;
}
