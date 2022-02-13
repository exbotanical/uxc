import { useMutation, useQuery } from '@apollo/client';
import React from 'react';

import { ChatMessageInput } from './ChatMessageInput';
import { MessageList } from './MessageList';

import type { PropsFromRedux } from '@/state';
import type { Message, ObjectID, PrivateThread, User } from '@uxc/types';

import {
	CREATE_MESSAGE,
	GET_MESSAGES,
	GET_THREAD,
	GET_CURRENT_USER
} from '@/services/api/queries';
import { connector } from '@/state';

export interface SendMessage {
	(message: string): void;
}

interface ChatRoomProps {
	threadId: ObjectID;
}

export function ChatRoom({
	threadId,
	showNotification
}: ChatRoomProps & PropsFromRedux) {
	const { data: user, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

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

	const them = thread?.getThread.users.find(
		({ _id }) => _id !== user?.getCurrentUser._id
	);

	// if this happens, we've got a bigger problem...
	if (!them) {
		return null;
	}

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
		<div className={`flex grow flex-col bg-primary-1000`}>
			<MessageList threadId={threadId} />

			<footer className="flex flex-auto flex-col p-2">
				<ChatMessageInput name={them.username} sendMessage={sendMessage} />
			</footer>
		</div>
	);
}

ChatRoom.displayName = 'ChatRoom';

export const ConnectedChatRoom = connector(ChatRoom);
