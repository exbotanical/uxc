import React from 'react';

import { ChannelsList } from '@/components/ChannelsList/ChannelsList';
import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedChatArea as ChatArea } from '@/components/ChatThread/ChatArea';
import { ConnectedCreatePrivateThreadModal as Modal } from '@/components/PrivateThreadsList/CreatePrivateThread';
import { PrivateThreadsList } from '@/components/PrivateThreadsList/PrivateThreadsList';
import { useViewportSize } from '@/hooks/useViewportSize';
import { useParams } from 'react-router-dom';
import { ThreadsProvider } from './ThreadsContext';

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
	const { threadId } = useParams();
	const viewport = useViewportSize();
	const gtsm = viewport > 0;

	const isIndexThread = threadId == null;

	return (
		<ThreadsProvider>
			<div className="h-screen flex flex-1">
				<NotificationController />
				<Modal />

				{/* TODO why here */}
				<ChannelsList className="bg-primary-700" />

				{gtsm ? (
					<PrivateThreadsList className="bg-primary-900 w-[18rem]" />
				) : null}

				{isIndexThread ? (
					<Dashboard />
				) : (
					<ChatArea
						className="overflow-hidden grow col-span-8 bg-primary-800"
						threadId={threadId}
					/>
				)}
			</div>
		</ThreadsProvider>
	);
}

ChatRoom.displayName = 'ChatRoom';
