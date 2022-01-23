import React from 'react';

import { UserAvatar } from './UserAvatar';
import { UserBadges } from './UserBadges';
import { UserBio } from './UserBio';
import { UserFollowers } from './UserFollowers';
import { UserSite } from './UserSite';

import { useConn } from '@/hooks/useConn';

const mockUserInfo = {
	site: 'github.com/MatthewZito',
	bio: 'This is my user bio. All about me.',
	followers: 200,
	following: 4
};

export function UserProfile() {
	const { conn } = useConn();
	const { user } = conn!;

	return (
		<div className="flex flex-col w-full rounded-8 bg-primary-800 p-4">
			<div className="flex flex-col items-center mb-4">
				<UserAvatar className="mt-2" size="2xl" u={user} />

				<span className="text-primary-300 text-left break-all">
					@{user.username}
				</span>
			</div>

			<UserBadges className="mb-1" />

			<UserFollowers {...mockUserInfo} />

			<UserBio bio={mockUserInfo.bio} />

			<UserSite site={mockUserInfo.site} />
		</div>
	);
}
