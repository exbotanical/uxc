import { useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';

import type { Message, ObjectID, User } from '@uxc/types';

import { ChatMessage } from '@/components/ChatRoom/ChatMessage';
import {
	GET_MESSAGES,
	GET_CURRENT_USER,
	MESSAGES_SUBSCRIPTION
} from '@/services/api/queries';

interface MessageListProps {
	threadId: ObjectID;
}

export function MessageList({ threadId }: MessageListProps) {
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const [isScrolledToTop] = useState(false);

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
			document: MESSAGES_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (Object.keys(prev || {}).length === 0) {
					return { getMessages: [] };
				}

				if (!subscriptionData.data) {
					return prev;
				}

				/** @todo */
				// @ts-expect-error
				const newMessage = subscriptionData.data.onMessage[0];

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
		console.log({ error });
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
			let skipMeta = false;

			if (userId === message.sender._id) {
				skipMeta = true;
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
				skipMeta
			};
		}) || [];

	return (
		<div className=" overflow-y-auto h-full">
			{messages.map((message) => (
				<ChatMessage key={message._id} {...message} />
			))}

			<div ref={bottomRef} />
		</div>
	);
}
