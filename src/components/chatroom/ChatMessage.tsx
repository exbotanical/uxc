import React from 'react';
import '@/styles/message.scss';
import { IMessage } from '@/types/message';

const Message = ({ message, timestamp, user }: IMessage) => {
	return (
		<div className="message">
			<img
				src={user.userImage || '../../src/assets/gravatar.png'}
				alt={`${user.displayName}'s avatar`}
			/>
			<div className="message__info">
				<h4>
					{user.displayName}
					<span className="message__timestamp">
						{new Date(timestamp).toLocaleTimeString()}
					</span>
				</h4>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Message;
