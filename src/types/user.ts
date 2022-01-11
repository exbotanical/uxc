import type { IChannel } from './channel';
import { JWT, UUID } from './const';
import type { IDirectMessageThread } from './message';

export interface User {
	uuid: UUID;
	username: string;
	userImage: string;
	directMessageThreads: IDirectMessageThread[];
	channels: Pick<IChannel, 'uuid' | 'name' | 'desc'>[];
	currentChannel: Pick<IChannel, 'uuid' | 'name' | 'desc'>;
}

export interface UserTokens {
	accessToken: JWT;
	refreshToken: JWT;
}

export type UserSession = User & UserTokens;
