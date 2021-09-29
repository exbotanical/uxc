import type { IChannel } from './channel';
import { JWT, UUID } from './const';
import type { IDirectMessageThread } from './message';

export interface IUser {
	uuid: UUID;
	username: string;
	userImage: string;
	directMessageThreads: IDirectMessageThread[];
	channels: Pick<IChannel, 'uuid' | 'name' | 'desc'>[];
	currentChannel: Pick<IChannel, 'uuid' | 'name' | 'desc'>;
}

export interface IUserTokens {
	accessToken: JWT;
	refreshToken: JWT;
}

export type IUserSession = IUser & IUserTokens;
