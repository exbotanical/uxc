import React from 'react';

import { UserAvatar } from '../User/UserAvatar';

import type { User } from '@uxc/types';
import SvgIcon from '../Icon';

export function UserStatus({ user }: { user: User }) {
	return (
		<div className="flex justify-between items-center mt-auto bg-primary-900 drop-shadow-2xl shadow-2xl w-full p-2 px-3 h-7">
			<div className="flex items-center gap-2">
				<UserAvatar size="sm" u={user} />
				<h5 className="text-primary-100 text-sm font-semibold mb-1.5">
					{user.username}
				</h5>
			</div>

			<button className="btn-hover">
				<SvgIcon name="gear" />
			</button>
		</div>
	);
}

UserStatus.displayName = 'UserStatus';
