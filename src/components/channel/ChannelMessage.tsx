import React from 'react';

import type { FC } from 'react';

import type { IMessage } from '@/types/message';

export const ChannelMessage: FC<IMessage & { isAuthor: boolean }> = ({
	message,
	timestamp,
	user,
	isAuthor
}) => {
	const { username } = user;
	const colors = [
		'#ff2366',
		'#fd51d9',
		'#face15',
		'#8d4de8',
		'#6859ea',
		'#7ed321',
		'#56b2ba',
		'#00CCFF',
		'#FF9900',
		'#FFFF66'
	];

	// TODO serverside
	function generateColor (str: string) {
		let sum = 0;
		for (let i = 0; i < str.length; i++) {
			sum += i * str.charCodeAt(i);
		}

		return colors[sum % colors.length];
	}

	return (
		<div className="flex flex-col text-lg py-1 mx-3">
			<div>
				<span className="font-bold" style={{ color: generatecolor(username) }}>
					{username}
				</span>
				<span className="text-white">: </span>
				<span className="text-primary-100">{message}</span>
			</div>
		</div>
	);
};

ChannelMessage.displayName = 'ChannelMessage';
