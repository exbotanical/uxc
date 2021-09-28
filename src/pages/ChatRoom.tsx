import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import ChatTextInput from '@/components/chatroom/ChatTextInput';
import ChatMessage from '@/components/chatroom/ChatMessage';

import '@/styles/chatroom.scss';
import type { IMessage } from '@/types/message';
import { fetchData } from '@/services';

interface IDummyMessages {
	messages: { [key: string]: IMessage[] };
}

const ChatRoom = () => {
	const { id } = useParams<{ id?: string }>();

	if (!id) throw new Error('');

	const [messages, setMessages] = useState<IMessage[]>([]);

	useEffect(() => {
		fetchData<IDummyMessages>(import('@/data/messages')).then(
			({ messages }) => {
				setMessages(messages[id]);
			}
		);
	}, [id]);

	return (
		<div className="chatroom">
			<div className="chatroom__header">
				<div className="chatroom__header-detail">
					<h4 className="chatroom__channel-data">
						<strong>#roomname</strong>
						<BookmarkIcon />
					</h4>
				</div>
				<div className="chatroom__header-opts">
					<p>
						<InfoIcon /> Details
					</p>
				</div>
			</div>
			<div className="chatroom__messages">
				{messages.map((message, idx) => (
					<ChatMessage key={idx} {...message} />
				))}
			</div>

			<ChatTextInput />
		</div>
	);
};

export default ChatRoom;
