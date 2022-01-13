import { ConnectedRoomHeader } from '@/components/Room/RoomHeader';
import { RoomMessage } from '@/components/Room/RoomMessage';
import { RoomTextInput } from '@/components/Room/RoomTextInput';
import { useConn, useWrappedConn } from '@/hooks/useConn';
import { connector, PropsFromRedux } from '@/state';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import type { Message } from '@uxc/types';

export interface SendMessage {
	(message: string): void;
}

export function Room({ showNotification }: PropsFromRedux) {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return null;
	}

	const bottomRef = useRef<HTMLDivElement | null>(null);

	const { conn } = useConn();
	const { user } = conn!;

	const { client } = useWrappedConn();

	const [isScrolledToTop] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const sendMessage: SendMessage = (message) => {
		client.mutation.sendMessage({
			channelUuid: id,
			message,
			timestamp: new Date().toISOString(),
			user: {
				userImage: user.userImage,
				username: user.username,
				uuid: user.uuid
			},
			uuid: v4()
		});
	};

	useEffect(() => {
		isScrolledToTop ||
			bottomRef?.current?.scrollIntoView({
				block: 'nearest',
				inline: 'start'
			});
	});

	useEffect(() => {
		(async () => {
			const res = await client.query.getChannel({ id });

			console.log({ res });
			if (typeof res === 'object' && 'error' in res) {
				showNotification({
					message:
						'Something went wrong while grabbing info for this channel. Please try again later.',
					type: 'error'
				});
			} else if (res.messages) {
				setMessages(res.messages);
			}
		})();
	}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		client.subscribe.onMessage((message) => {
			setMessages((prevState) => [...prevState, message]);
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="flex flex-col h-screen bg-primary-800 rounded-sm">
			<ConnectedRoomHeader user={user} />

			<div className="overflow-y-auto" style={{ height: '83vh' }}>
				{messages.map((message) => {
					return <RoomMessage key={message.uuid} {...message} />;
				})}

				<div ref={bottomRef} />
			</div>

			<RoomTextInput
				name={user.currentChannel.name}
				sendMessage={sendMessage}
			/>
		</div>
	);
}

Room.displayName = 'Room';

export const ConnectedRoom = connector(Room);
