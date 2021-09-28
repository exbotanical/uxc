import React from 'react';

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import ChatTextInput from '@/components/chatroom/ChatTextInput';

import '@/styles/chatroom.scss';
import ChatMessage from '@/components/chatroom/ChatMessage';

const ChatRoom = () => {
	const now = new Date();
	const user = { userImage: '', name: 'name' };

	return (
		<div className="chatroom">
			<div className="chatroom__header">
				<div className="chatroom__header-detail">
					<h4 className="chatroom__channel-data">
						<strong>#roomname</strong>
						<StarBorderOutlinedIcon />
					</h4>
				</div>
				<div className="chatroom__header-opts">
					<p>
						<InfoOutlinedIcon /> Details
					</p>
				</div>
			</div>
			<div className="chatroom__messages">
				<ChatMessage message={'message'} timestamp={now} user={user} />
			</div>

			<ChatTextInput />
		</div>
	);
};

export default ChatRoom;
