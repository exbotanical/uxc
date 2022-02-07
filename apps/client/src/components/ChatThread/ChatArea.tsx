import React from 'react';

import type { Message, ObjectID, PrivateThread, User } from '@uxc/types';

import { connector, PropsFromRedux } from '@/state';
import { ChatMessageInput } from './ChatMessageInput';
import { MessageList } from './MessageList';
import { useMutation, useQuery } from '@apollo/client';
import {
	CREATE_MESSAGE,
	GET_MESSAGES,
	GET_THREAD,
	GET_USER
} from '@/services/api/queries';

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
	const { data: user, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_USER);

	const { data: thread } = useQuery<{ getThread: PrivateThread }>(GET_THREAD, {
		variables: {
			threadId
		}
	});

	/** @todo deduplicate types */
	const [createMessage] = useMutation<{
		createMessage: { body: Message['body']; threadId: Message['threadId'] };
	}>(CREATE_MESSAGE, {
		update(cache, { data }) {
			const allMessages = cache.readQuery<{ getMessages: Message[] }>({
				query: GET_MESSAGES,
				variables: { threadId }
			});

			/** @todo deduplicate in subscription */
			cache.writeQuery({
				query: GET_MESSAGES,
				data: {
					getMessages: [
						...(allMessages?.getMessages ?? []),
						{ ...data?.createMessage, sender: user?.getCurrentUser }
					]
				}
			});
		}
	});

	const them = thread?.getThread?.users.find(
		({ _id }) => _id !== user?.getCurrentUser._id
	)!;

	const sendMessage: SendMessage = async (message) => {
		/** @todo update cache instead of sending back via subscription */
		await createMessage({
			variables: {
				threadId,
				body: message
			}
		});
	};

	return (
		<div
			className={`${className} flex flex-col bg-primary-800 rounded-sm h-screen`}
		>
			{/* <Header user={user} /> */}
			<div className="flex flex-1 overflow-auto">
				<MessageList threadId={threadId} />
			</div>

			<footer className="flex flex-col p-2">
				<ChatMessageInput name={them?.username} sendMessage={sendMessage} />
			</footer>
		</div>
	);
}

ChatArea.displayName = 'ChatArea';

export const ConnectedChatArea = connector(ChatArea);
