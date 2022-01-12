import { ChannelHeaderContainer } from '@uxc/client/components/Channel/ChannelHeader';
import { ChannelMessage } from '@uxc/client/components/Channel/ChannelMessage';
import { ChannelTextInput } from '@uxc/client/components/Channel/ChannelTextInput';
import { useConn, useWrappedConn } from '@uxc/client/hooks/useConn';
import { connector, PropsFromRedux } from '@uxc/client/state';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import type { Message } from '@uxc/client/types/message';

export interface SendMessage {
	(message: string): void;
}

export function Channel({ showNotification }: PropsFromRedux) {
	const { id } = useParams<{ id: string }>();

	const bottomRef = useRef<HTMLDivElement | null>(null);

	const { conn } = useConn();
	const { user } = conn;

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
			bottomRef.current.scrollIntoView({
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
			} else if (res.messages.length) {
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
		<div className="flex flex-col h-full bg-primary-800 rounded-sm">
			<div>
				<ChannelHeaderContainer user={user} />
			</div>

			<div className="overflow-y-auto" style={{ height: '80vh' }}>
				{messages.map((message) => {
					return <ChannelMessage key={message.uuid} {...message} />;
				})}

				<div ref={bottomRef} />
			</div>

			<ChannelTextInput
				name={user.currentChannel.name}
				sendMessage={sendMessage}
			/>
		</div>
	);
}

Channel.displayName = 'Channel';

export const ChannelContainer = connector(Channel);
