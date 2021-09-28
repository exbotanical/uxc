import React from 'react';
import '@/styles/message.scss';

interface IUser {
	userImage: string;
	name: string;
}

interface IMessageProps {
	message: string;
	timestamp: Date;
	user: IUser;
}

const Message = ({ message, timestamp, user }: IMessageProps) => {
	return (
		<div className="message">
			<img src={''} alt="" />
			<div className="message__info">
				<h4>
					{user.name}{' '}
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
