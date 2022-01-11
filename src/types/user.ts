import { JWT, UUID } from './const';

import type { Channel } from './channel';
import type { DirectMessageThread } from './message';

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
