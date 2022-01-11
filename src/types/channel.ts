import type { UUID } from './const';
import type { IMessage } from './message';
import type { User } from './user';

export interface IChannel {
	users: User[];
	messages: IMessage[];
	uuid: UUID;
	name: string;
	desc: string;
}

export interface IDirectChannel {
	user: User[];
	messages: IMessage[];
	uuid: UUID;
}
