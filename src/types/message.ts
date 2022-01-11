import type { UUID } from './const';
import type { User } from './user';

export interface IMessage {
	message: string;
	channelUuid: UUID;
	timestamp: Date | string;
	user: Pick<User, 'username' | 'uuid' | 'userImage'>;
	uuid: UUID;
}

export interface IDirectMessageThread {
	user: User;
	uuid: UUID;
}
