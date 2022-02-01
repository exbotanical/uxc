import React from 'react';

import { ChannelsList } from '@/components/ChannelsList/ChannelsList';
import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedChatArea as ChatArea } from '@/components/ChatRoom/ChatArea';
import { ConnectedCreateDirectMessageModal as Modal } from '@/components/DirectMessagesList/CreateDirectMessage';
import { DirectMessagesList } from '@/components/DirectMessagesList/DirectMessagesList';
import { useViewportSize } from '@/hooks/useViewportSize';
import { useParams } from 'react-router-dom';
import { DirectsProvider } from './DirectsContext';

const Dashboard = () => {
	return (
		<div
			className={`flex flex-col justify-center items-center grow bg-primary-800 rounded-sm`}
		>
			<h1 className="text-white">Dashboard</h1>
		</div>
	);
};

export function ChatRoom() {
	const { roomId } = useParams();
	const viewport = useViewportSize();
	const gtsm = viewport > 0;

	const isIndexRoom = roomId == null;

	return (
		<DirectsProvider>
			<div className="h-screen flex flex-1">
				<NotificationController />
				<Modal />

				{/* TODO why here */}
				<ChannelsList className="bg-primary-700" />

				{gtsm ? (
					<DirectMessagesList className="bg-primary-900 w-[18rem]" />
				) : null}

				{isIndexRoom ? (
					<Dashboard />
				) : (
					<ChatArea
						className="overflow-hidden grow col-span-8 bg-primary-800"
						roomId={roomId}
					/>
				)}
			</div>
		</DirectsProvider>
	);
}

ChatRoom.displayName = 'ChatRoom';
