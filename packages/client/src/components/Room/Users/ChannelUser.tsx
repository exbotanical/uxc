import React from 'react';

import type { User } from '@uxc/types';

import { UserAvatar } from '@/components/User/UserAvatar';

export function ChannelUser(u: User) {
	return (
		<div className="flex p-2 w-full hover:bg-primary-700">
			<UserAvatar size="sm" u={u} />

			<div className="flex ml-3 flex-col overflow-hidden justify-center">
				<h5 className="text-primary-100 font-bold">{u.username}</h5>
			</div>
		</div>
	);
}
