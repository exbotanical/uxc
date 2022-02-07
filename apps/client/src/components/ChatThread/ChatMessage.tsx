import React from 'react';

import type { Message, User } from '@uxc/types';
import { UserAvatar } from '../User/UserAvatar';
import { toReadable } from '@/utils';

export function ChatMessage(
	message: Omit<Message, 'sender'> & { sender: User; isSender: boolean }
) {
	const { username } = message.sender;
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
		<div className="flex flex-col text-lg pb-1 mx-3">
			<div className="flex py-2">
				<div className="flex justify-center mx-3">
					<UserAvatar size="lg" u={message.sender} />
				</div>

				<div className="flex flex-col items-start">
					<div className="flex items-center">
						<p className="text-primary-100 font-bold mr-2">
							{message.sender.username}
						</p>

						<p className="text-primary-200 text-sm">
							{toReadable(message.createdAt)}
						</p>
					</div>
					<p className="text-primary-100">{message.body}</p>
				</div>
			</div>
		</div>
	);
}

ChatMessage.displayName = 'ChatMessage';
