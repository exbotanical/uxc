import type { UUID } from './const';
import type { User } from './user';

export interface Message {
	message: string;
	channelUuid: UUID;
	timestamp: Date | string;
	user: Pick<User, 'userImage' | 'username' | 'uuid'>;
	uuid: UUID;
}

export interface DirectMessageThread {
	user: User;
	uuid: UUID;
}
