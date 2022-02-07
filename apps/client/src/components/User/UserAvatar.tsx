import React from 'react';

import type { User } from '@uxc/types';

import { StatusIndicator } from '@/components/Badges/StatusIndicator';

export const sizeMap = {
	lg: {
		avatar: '60px',
		status: 'top-5 left-2'
	},
	md: {
		avatar: '50px',
		status: 'top-4'
	},
	sm: {
		avatar: '40px',
		status: ''
	}
};

interface UserCardProps {
	size: keyof typeof sizeMap;
	u: User;
	className?: string;
}

export function UserAvatar({ u, size = 'md', className = '' }: UserCardProps) {
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
				alt={u?.username ? `${u.username}'s avatar` : 'your avatar'}
				className="rounded-full"
				src={u?.userImage || '../../../src/assets/gravatar.png'}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = '../../../src/assets/gravatar.png';
				}}
			/>

			<div className={`absolute border-primary-800 ${status}`}>
				<StatusIndicator placementClass="top-4 left-3" />
			</div>
		</div>
	);
}

UserAvatar.displayName = 'UserAvatar';
