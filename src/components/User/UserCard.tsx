import React from 'react';

import type { FC } from 'react';

import type { User } from '@/types/user';

export const onlineIndicatorStyleMap = {
	default: {
		width: '15px',
		height: '15px',
		right: '2px',
		bottom: '-4px',
		borderWidth: '4px'
	},
	lg: {
		width: '12px',
		height: '12px',
		right: '2px',
		bottom: '-2px',
		borderWidth: '2px'
	},
	md: {
		width: '10px',
		height: '10px',
		right: '2px',
		bottom: '-2px',
		borderWidth: '2px'
	},
	sm: {
		width: '8px',
		height: '8px',
		right: '2px',
		bottom: '-2px',
		borderWidth: '2px'
	},
	xs: {
		width: '4px',
		height: '4px',
		right: '0px',
		bottom: '-1px',
		borderWidth: '1px'
	},
	xxs: {
		width: '6px',
		height: '6px',
		right: '1px',
		bottom: '-1px',
		borderWidth: '1px'
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

interface UserCard {
	size: keyof typeof onlineIndicatorStyleMap;
	isOnline: boolean;
	u: User;
}

export const UserCard: FC<UserCard> = ({ size, isOnline, u }) => {
	const sizeStyle = onlineIndicatorStyleMap[size];

	return (
		<div
			className={'relative inline-block'}
			style={{
				width: avatarSizeMap[size],
				height: avatarSizeMap[size]
			}}
		>
			<img
				className="rounded-full"
				alt={u.username ? `${u.username}-s-avatar` : 'your-avatar'}
				src={u.userImage || '../../../src/assets/gravatar.png'}
			/>
			{/* {hover && (
				<div
					className={`bg-primary-900 hover:opacity-20 transition duration-200 opacity-0 absolute w-full h-full top-0 left-0 rounded-full`}
				></div>
			)} */}

			<span
				className={`rounded-full absolute box-content border-primary-800 ${
					isOnline ? 'bg-green-400' : 'bg-accent'
				}`}
				style={sizeStyle}
			></span>
		</div>
	);
};
