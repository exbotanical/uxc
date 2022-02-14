import React, { useState } from 'react';

import SvgIcon from '../Icon';
import { UserAvatar } from '../User/UserAvatar';

import type { Message, User } from '@uxc/types';

import { toReadable } from '@/utils';

export function ChatMessage(
	message: Omit<Message, 'sender'> & {
		sender: User;
		isSender: boolean;
		skipMeta: boolean;
	}
) {
	const [hover, setHover] = useState(false);

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
		<div
			className={`flex flex-col text-lg ${
				hover ? 'bg-primary-1100' : ''
			} relative`}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
		>
			{hover ? (
				<div
					className="right-0 -top-2 absolute bg-primary-1000 text-primary-100 p-2 w-20 rounded-sm shadow-lg flex justify-evenly border-t border-blue-500"
				>
					<button>
						<SvgIcon dimensions={20} name="smiley" />
					</button>
					<button>
						<SvgIcon dimensions={20} name="edit" />
					</button>
				</div>
			) : null}

			{message.skipMeta ? (
				<div className="flex ml-[5.3rem] pb-1 mx-3 ">
					<p className="text-primary-100">{message.body}</p>
				</div>
			) : (
				<div className="flex py-2 pb-1 mx-3">
					<div className="flex justify-center mx-3">
						<UserAvatar size="lg" u={message.sender} withIndicator={false} />
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
			)}
		</div>
	);
}

ChatMessage.displayName = 'ChatMessage';
