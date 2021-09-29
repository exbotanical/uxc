import type { UUID } from './const';
import type { IUser } from './user';

export interface IMessage {
	message: string;
	channelUuid: UUID;
	timestamp: Date | string;
	user: Pick<IUser, 'username' | 'uuid' | 'userImage'>;
	uuid: UUID;
}

export interface IDirectMessageThread {
	user: IUser;
	uuid: UUID;
}
