import React from 'react';

import type { User } from '@uxc/types';

import { StatusIndicator } from '@/components/Badges/StatusIndicator';

export const sizeMap = {
	lg: {
		avatar: '60px',
		status: 'left-6 w-5 h-5'
	},
	md: {
		avatar: '50px',
		status: 'left-5 w-5 h-5'
	},
	sm: {
		avatar: '40px',
		status: 'left-4 w-4 h-4'
	}
};

interface UserCardProps {
	size: keyof typeof sizeMap;
	u: User;
	className?: string;
	withIndicator?: boolean;
}

export function UserAvatar({
	u,
	size = 'md',
	className = '',
	withIndicator = true
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
					currentTarget.src = '../../../src/assets/gravatar.png';
				}}
				src={u.userImage || '../../../src/assets/gravatar.png'}
			/>
			{withIndicator ? (
				<div className={`absolute border-primary-800`}>
					<StatusIndicator placementClass={status} />
				</div>
			) : null}
		</div>
	);
}

UserAvatar.displayName = 'UserAvatar';
