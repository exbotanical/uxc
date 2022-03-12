import { useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import type { Message, ObjectID, User } from '@uxc/types';

import { ChatMessage } from '@/components/ChatRoom/ChatMessage';
import {
	GET_MESSAGES,
	GET_CURRENT_USER,
	ON_THREAD_MESSAGE_CREATED
} from '@/services/api/queries';

interface MessageListProps {
	threadId: ObjectID;
}

const Container = styled.div`
	overflow-y: auto;
	height: 100%;
`;

export function MessageList({ threadId }: MessageListProps) {
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const [isScrolledToTop] = useState(false);

	// @todo prevent scroll on update
	useEffect(() => {
		isScrolledToTop ||
			bottomRef.current?.scrollIntoView({
				block: 'nearest',
				inline: 'start'
			});
	});

	const { data: user } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const { loading, data, error, subscribeToMore } = useQuery<{
		getMessages: (Omit<Message, 'sender'> & { sender: User })[];
	}>(GET_MESSAGES, {
		variables: {
			threadId
		}
	});

	useEffect(() => {
		subscribeToMore({
			document: ON_THREAD_MESSAGE_CREATED,
			updateQuery: (prev, { subscriptionData }) => {
				if (Object.keys(prev || {}).length === 0) {
					return { getMessages: [] };
				}

				if (!subscriptionData.data) {
					return prev;
				}

				/** @todo */
				// @ts-expect-error
				const newMessage = subscriptionData.data.onThreadMessageCreated[0];

				const ret = {
					...prev,
					getMessages: [
						...prev.getMessages,
						{ ...newMessage, sender: user?.getCurrentUser }
					]
				};

				return ret;
			},
			variables: { threadId }
		});
	}, []);

	if (loading) {
		return null;
	}

	if (error) {
		// showNotification({
		// 	message:
		// 		'Something went wrong while grabbing info for this channel. Please try again later.',
		// 	type: 'error'
		// });

		return null;
	}

	/**
	 * Tracks the last message sender
	 */
	let userId: string | null = null;

	const messages =
		data?.getMessages.map((message) => {
			/**
			 * Is this message mine?
			 */
			let isSender = false;
			/**
			 * Skip metadata (e.g. username, avatar) in display?
			 */
			let sansMeta = false;

			if (userId === message.sender._id) {
				sansMeta = true;
			}

			if (message.sender._id === user?.getCurrentUser._id) {
				isSender = true;
			} else {
				isSender = false;
			}

			userId = message.sender._id;

			return {
				...message,
				isSender,
				sansMeta
			};
		}) || [];

	return (
		<Container data-testid="messages-container">
			{messages.map((message) => (
				<ChatMessage key={message._id} {...message} />
			))}

			<div ref={bottomRef} />
		</Container>
	);
}
