import React from 'react';

import type { Message } from '@uxc/types';

export function RoomMessage({ message, user }: Message) {
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
		'#AA19FA',
		'#FFFF66'
	];

	// TODO serverside
	function generateColor(str: string) {
		let sum = 0;
		for (let i = 0; i < str.length; i++) {
			sum += i * str.charCodeAt(i);
		}

		return colors[sum % colors.length];
	}

	return (
		<div className="flex flex-col text-lg py-1 mx-3">
			<div>
				<span className="font-bold" style={{ color: generateColor(username) }}>
					{username}
				</span>

				<span className="text-white">: </span>

				<span className="text-primary-100">{message}</span>
			</div>
		</div>
	);
}

RoomMessage.displayName = 'RoomMessage';
