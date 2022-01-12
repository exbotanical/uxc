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

	const messageStyle = isAuthor ?
		'flex items-end justify-end p-2' :
		'flex items-end p-2';
	const messageSubstyle = isAuthor ?
		'order-1 items-end' :
		'order-2 items-start';

	const messageDirection = isAuthor ?
		'rounded-br-none bg-message-800' :
		'rounded-bl-none bg-message-600';

	return (
		<div className={messageStyle}>
			<div
				className={
					`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${messageSubstyle}`
				}
			>
				<div>
					<span
						className={
							`px-4 py-2 text-lg rounded-lg inline-block text-white ${
								messageDirection}`
						}
					>
						{message}
					</span>
				</div>
			</div>
		</div>
	);
};

ChannelMessage.displayName = 'ChannelMessage';
