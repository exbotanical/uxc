import type { UUID } from './const';
import type { Message } from './message';
import type { User } from './user';

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
