import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ChatMessageInput } from './ChatMessageInput';
import { MessageList } from './MessageList';

import type { PropsFromRedux } from '@/state';
import type { Message, User } from '@uxc/types';

import {
	CREATE_MESSAGE,
	GET_MESSAGES,
	GET_CURRENT_USER
} from '@/services/api/queries';
import { connector } from '@/state';
import { ThreadsContext } from '@/state/context/ThreadsContext';
import { FlexCol } from '@/styles/Layout';

export interface SendMessage {
	(message: string): void;
}

interface ChatRoomProps {}

const Container = styled.div`
	${FlexCol}
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background.norm};
`;

const Footer = styled.footer`
	margin-top: auto;
	padding: 0.5rem;
	border-top: 1px solid ${({ theme }) => theme.colors.border.weak};
`;

export function ChatRoom({ showNotification }: ChatRoomProps & PropsFromRedux) {
	const { threadId } = useParams();
	const { data: user, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);
	const { getThreadById, updateThread } = useContext(ThreadsContext);

	const thread = getThreadById(threadId);

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
				data: {
					getMessages: [
						...(allMessages?.getMessages ?? []),
						{ ...data?.createMessage, sender: user?.getCurrentUser }
					]
				},
				query: GET_MESSAGES
			});
		}
	});

	const them = thread?.users.find(
		({ _id }) => _id !== user?.getCurrentUser._id
	);

	// useEffect(() => {
	// 	if (!thread) return;

	// 	thread.newMessages = 0;
	// 	console.log('run effect');
	// 	updateThread(thread);
	// }, [thread]);

	// if this happens, we've got a bigger problem...
	if (!them) {
		return null;
	}

	if (!threadId) {
		return null;
	}

	const sendMessage: SendMessage = async (message) => {
		/** @todo update cache instead of sending back via subscription */
		await createMessage({
			variables: {
				body: message,
				threadId
			}
		});
	};

	return (
		<Container>
			<MessageList threadId={threadId} />
			<Footer>
				<ChatMessageInput name={them.username} sendMessage={sendMessage} />
			</Footer>
		</Container>
	);
}

ChatRoom.displayName = 'ChatRoom';

export const ConnectedChatRoom = connector(ChatRoom);
