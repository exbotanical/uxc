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

interface RoomProps {
	className: string;
}

export function Room({
	className,
	showNotification
}: RoomProps & PropsFromRedux) {
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
		<div className={className + ' flex flex-col bg-primary-800 rounded-sm'}>
			<ConnectedRoomHeader user={user} />

			<div className="overflow-y-auto flex-auto">
				{messages.map((message) => {
					return <RoomMessage key={message.uuid} {...message} />;
				})}

				<div ref={bottomRef} />
			</div>

			<footer className="flex flex-col p-2">
				<RoomTextInput
					name={user.currentChannel.name}
					sendMessage={sendMessage}
				/>
			</footer>
		</div>
	);
}

Room.displayName = 'Room';

export const ConnectedRoom = connector(Room);
