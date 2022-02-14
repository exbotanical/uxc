import React from 'react';

import { UserAvatar } from './UserAvatar';

import type { User } from '@uxc/types';

export function UserStatus({ user }: { user: User }) {
	return (
		<div className="flex items-center">
			<UserAvatar size="sm" u={user} />
			<p className="text-primary-100 text-md font-semibold ml-2">
				{user.username}
			</p>
		</div>
	);
}

UserStatus.displayName = 'UserStatus';
