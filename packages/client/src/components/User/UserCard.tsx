import React from 'react';

import type { User } from '@/types/user';

export const onlineIndicatorStyleMap = {
	default: {
		borderWidth: '4px',
		bottom: '-4px',
		height: '15px',
		right: '2px',
		width: '15px'
	},
	lg: {
		borderWidth: '2px',
		bottom: '-2px',
		height: '12px',
		right: '2px',
		width: '12px'
	},
	md: {
		borderWidth: '2px',
		bottom: '-2px',
		height: '10px',
		right: '2px',
		width: '10px'
	},
	sm: {
		borderWidth: '2px',
		bottom: '-2px',
		height: '8px',
		right: '2px',
		width: '8px'
	},
	xs: {
		borderWidth: '1px',
		bottom: '-1px',
		height: '4px',
		right: '0px',
		width: '4px'
	},
	xxs: {
		borderWidth: '1px',
		bottom: '-1px',
		height: '6px',
		right: '1px',
		width: '6px'
	}
};

export const avatarSizeMap = {
	default: '80px',
	lg: '60px',
	md: '50px',
	sm: '40px',
	xs: '20px',
	xxs: '30px'
};

interface UserCardProps {
	size: keyof typeof onlineIndicatorStyleMap;
	isOnline: boolean;
	u: User;
}

export function UserCard({ size, isOnline, u }: UserCardProps) {
	const sizeStyle = onlineIndicatorStyleMap[size];

	return (
		<div
			className="relative inline-block"
			style={{
				height: avatarSizeMap[size],
				width: avatarSizeMap[size]
			}}
		>
			<img
				alt={u.username ? `${u.username}-s-avatar` : 'your-avatar'}
				className="rounded-full"
				src={u.userImage || '../../../src/assets/gravatar.png'}
			/>

			<span
				className={`rounded-full absolute box-content border-primary-800 ${
					isOnline ? 'bg-green-400' : 'bg-accent'
				}`}
				style={sizeStyle}
			/>
		</div>
	);
}
