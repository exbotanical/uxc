/** @tmp */
import { v4 } from 'uuid';

import type { Message, User } from '@uxc/types';

export const messages: Message[] = [];
export const user: User = {
	channels: [],
	currentChannel: {
		desc: '',
		name: '',
		uuid: ''
	},
	directMessageThreads: [],
	userImage:
		'https://upload.wikimedia.org/wikipedia/en/e/e7/CanMonsterMovieAlbumCover.jpg',
	username: 'goldmund',
	uuid: v4()
};
