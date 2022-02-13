import React from 'react';
import { useParams } from 'react-router-dom';

import { ThreadsProvider } from './ThreadsContext';

import { ChannelsList } from '@/components/ChannelsList/ChannelsList';
import { ConnectedChatArea as ChatArea } from '@/components/ChatThread/ChatArea';
import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedCreatePrivateThreadModal as Modal } from '@/components/PrivateThreadsList/CreatePrivateThread';
import { PrivateThreadsList } from '@/components/PrivateThreadsList/PrivateThreadsList';
import { useViewportSize } from '@/hooks/useViewportSize';
import { Input } from '@/components/Fields/Input';

function Dashboard() {
	return (
		<div className="flex flex-col items-center w-full bg-primary-1000">
			<div
				className="flex justify-start gap-2 items-center border-b-2 border-primary-1200 w-full p-3"
				style={{ minHeight: '75px', height: '75px' }}
			>
				<svg
					xmlns="http://www.w3.org/S2000/svg"
					width="28"
					height="28"
					fill="white"
					viewBox="0 0 16 16"
				>
					<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
					<path
						fill-rule="evenodd"
						d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
					/>
					<path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
				</svg>

				<p className="text-primary-100 text-xl font-bold">Friends</p>
			</div>

			<div className="flex h-full">
				<div className="place-self-center flex flex-col items-center">
					<Input
						placeholder="Search friends"
						className="text-primary-200 bg-primary-1300 text-lg w-1/2 h-9 mb-12"
					/>

					{/* <ul className="grid grid-cols-4">
						{[1, 2, 3, 4, 5].map((i) => {
							return (
								<li className="bg-red-100 h-36 w-36 m-4" key={i}>
									{i}eee
								</li>
							);
						})}
					</ul> */}
				</div>
			</div>
		</div>
	);
}

export function ChatRoom() {
	const { threadId } = useParams();
	const viewport = useViewportSize();
	const gtsm = viewport > 0;

	const isIndexThread = threadId == null;
	const isSmallViewport = useViewportSize() <= 2;

	return (
		<ThreadsProvider>
			<div className="h-screen flex flex-1">
				{isSmallViewport ? null : <ChannelsList className="bg-primary-1200" />}

				{gtsm ? <PrivateThreadsList className="bg-primary-1100" /> : null}

				{isIndexThread ? (
					<Dashboard />
				) : (
					<ChatArea
						className="overflow-hidden w-full col-span-8 bg-primary-800"
						threadId={threadId}
					/>
				)}

				<NotificationController />
				<Modal />
			</div>
		</ThreadsProvider>
	);
}

ChatRoom.displayName = 'ChatRoom';
