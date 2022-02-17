import React from 'react';

import type { User } from '@uxc/types';

import { StatusIndicator } from '@/components/Badges/StatusIndicator';
import { UnreadMessagesBadge } from '../Badges/UnreadMessages';
import { sizeMap } from './util';

interface UserCardProps {
	size: keyof typeof sizeMap;
	u: User;
	className?: string;
	withIndicator?: boolean;
	newMessagesCount?: number;
}

const defaultAvatar = '../../../src/assets/gravatar.png';

export function UserAvatar({
	u,
	size = 'md',
	className = '',
	withIndicator = true,
	newMessagesCount = 0
}: UserCardProps) {
	const { status, avatar } = sizeMap[size];

	return (
		<div
			className={`relative mb-1 ${className}`}
			style={{
				height: avatar,
				width: avatar
			}}
		>
			<img
				alt={u.username ? `${u.username}'s avatar` : 'your avatar'}
				className="rounded-full"
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = defaultAvatar;
				}}
				src={u.userImage || defaultAvatar}
			/>

			{withIndicator ? (
				<div className="absolute border-primary-800">
					{newMessagesCount > 0 ? (
						<UnreadMessagesBadge newMessages={newMessagesCount} />
					) : (
						<StatusIndicator placementClass={status} />
					)}
				</div>
			) : null}
		</div>
	);
}

UserAvatar.displayName = 'UserAvatar';
