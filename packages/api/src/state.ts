import { v4 } from 'uuid';

import type { Message, User } from '@uxc/types';

export const messages: Message[] = [];
export const user: User = {
	username: 'goldmund',
	userImage:
		'https://upload.wikimedia.org/wikipedia/en/e/e7/CanMonsterMovieAlbumCover.jpg',
	uuid: v4(),
	channels: [],
	currentChannel: {
		desc: '',
		name: '',
		uuid: ''
	},
	directMessageThreads: []
};
