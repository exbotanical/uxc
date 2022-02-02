import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Message, ObjectID, User } from '@uxc/types';

import { ChatMessage } from '@/components/ChatThread/ChatMessage';
import { connector, PropsFromRedux } from '@/state';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '@/services/api/queries';
import { ChatMessageInput } from './ChatMessageInput';
import { ConnectedChatThreadHeader as Header } from './ChatThreadHeader';

export interface SendMessage {
	(message: string): void;
}

interface ChatAreaProps {
	className: string;
	threadId: ObjectID;
}

export function ChatArea({
	className,
	threadId,
	showNotification
}: PropsFromRedux & ChatAreaProps) {
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const [isScrolledToTop] = useState(false);

	useEffect(() => {
		isScrolledToTop ||
			bottomRef.current?.scrollIntoView({
				block: 'nearest',
				inline: 'start'
			});
	});

	const { loading, data, error } = useQuery<{
		getMessages: (Omit<Message, 'sender'> & { sender: User })[];
	}>(GET_MESSAGES, {
		variables: {
			threadId
		}
	});

	if (loading) return null;

	if (error) {
		console.log({ error });
		// showNotification({
		// 	message:
		// 		'Something went wrong while grabbing info for this channel. Please try again later.',
		// 	type: 'error'
		// });

		return null;
	}

	const sendMessage: SendMessage = (message) => {};

	const messages = data?.getMessages || [];
	console.log(messages);

	return (
		<div className={`${className} flex flex-col bg-primary-800 rounded-sm`}>
			{/* <Header user={user} /> */}

			<div className="overflow-y-auto flex-auto">
				{messages.map((message) => (
					<ChatMessage key={message._id} {...message} />
				))}

				<div ref={bottomRef} />
			</div>

			<footer className="flex flex-col p-2">
				<ChatMessageInput
					name={'user.currentRoom.name'}
					sendMessage={sendMessage}
				/>
			</footer>
		</div>
	);
}

ChatArea.displayName = 'ChatArea';

export const ConnectedChatArea = connector(ChatArea);
