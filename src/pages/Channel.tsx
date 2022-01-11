import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { FC } from 'react';

import { useConn, useWrappedConn } from '@/hooks/useConn';

import { ChannelTextInput } from '@/components/Channel/ChannelTextInput';
import { ChannelMessage } from '@/components/Channel/ChannelMessage';
import { ChannelHeaderContainer } from '@/components/Channel/ChannelHeader';

import type { IMessage } from '@/types/message';
import { connector, PropsFromRedux } from '@/state';

export interface SendMessage {
	(message: string): void;
}

export const Channel: FC<PropsFromRedux> = ({ showNotification }) => {
	const { id } = useParams<{ id: string }>();

	const bottomRef = useRef<null | HTMLDivElement>(null);

	const { conn } = useConn();
	const { user } = conn;

	const { client } = useWrappedConn();

	const [isScrolledToTop] = useState(false);
	const [messages, setMessages] = useState<IMessage[]>([]);

	const sendMessage: SendMessage = (message) => {
		client.mutation.sendMessage({
			message,
			user: {
				uuid: user.uuid,
				userImage: user.userImage,
				username: user.username
			},
			timestamp: new Date().toISOString(),
			channelUuid: id
		});
	};

	useEffect(() => {
		isScrolledToTop ||
			bottomRef.current?.scrollIntoView({
				block: 'nearest',
				inline: 'start'
			});
	});

	useEffect(() => {
		(async () => {
			const res = await client.query.getChannel({ id });
			if (typeof res === 'object' && 'error' in res) {
				showNotification({
					type: 'error',
					message:
						'Something went wrong while grabbing info for this channel. Please try again later.'
				});
			} else if (res.messages) {
				setMessages(res.messages);
			}
		})();
	}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		client.subscribe.onMessage((message) => {
			setMessages((prevState) => [...(prevState || []), message]);
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="flex flex-col h-screen bg-primary-800 rounded-sm">
			<div>
				<ChannelHeaderContainer user={user} />
			</div>
			<div className="overflow-y-auto" style={{ height: '80vh' }}>
				{messages.map((message, idx) => {
					return (
						<ChannelMessage
							key={idx}
							isAuthor={message.user.uuid == user.uuid}
							{...message}
						/>
					);
				})}
				<div ref={bottomRef} />
			</div>
			<ChannelTextInput
				sendMessage={sendMessage}
				name={user.currentChannel.name}
			/>
		</div>
	);
};

Channel.displayName = 'Channel';

export const ChannelContainer = connector(Channel);
