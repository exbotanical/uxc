import React from 'react';

import type { User } from '@uxc/types';

import { StatusDot } from '@/components/Badges/StatusDot';

export const sizeMap = {
	'2xl': {
		avatar: '120px',
		status: 'lg' as const
	},
	'xl': {
		avatar: '80px',
		status: 'lg' as const
	},
	'lg': {
		avatar: '60px',
		status: 'sm' as const
	},
	'md': {
		avatar: '50px',
		status: 'sm' as const
	},
	'sm': {
		avatar: '40px',
		status: 'sm' as const
	},
	'xs': {
		avatar: '35px',
		status: 'sm' as const
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
				alt={u.username ? `${u.username}-s-avatar` : 'your-avatar'}
				className="rounded-full"
				src={u.userImage || '../../../src/assets/gravatar.png'}
			/>

			<div className="absolute border-primary-800">
				<StatusDot size={status} />
			</div>
		</div>
	);
}
