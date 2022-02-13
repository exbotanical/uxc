import React from 'react';
import { useParams } from 'react-router-dom';

import { ThreadsProvider } from '@/state/context/ThreadsContext';

import { ChannelsList } from '@/components/Channel/ChannelsList';
import { ConnectedChatRoom as ChatRoom } from '@/components/ChatRoom';
import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedCreatePrivateThreadModal as Modal } from '@/components/PrivateThread/CreatePrivateThread';
import { PrivateThreadsList } from '@/components/PrivateThread';
import { useViewportSize } from '@/hooks/useViewportSize';
import { Input } from '@/components/Fields/Input';
import SvgIcon from '../Icon';

function ContentContainer() {
	const { threadId } = useParams();
	const isIndexThread = threadId == null;

	return (
		<div className="flex flex-col items-center w-full bg-primary-1000">
			<div
				className="flex justify-start gap-2 items-center border-b-2 border-primary-1200 w-full p-3"
				style={{ minHeight: '75px', height: '75px' }}
			>
				<SvgIcon name="people" dimensions={21} />
				<p className="text-primary-100 text-xl font-bold">Friends</p>
			</div>

			<div className="flex h-full">
				{isIndexThread ? (
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
				) : (
					<ChatRoom
						className="overflow-hidden w-full col-span-8 bg-primary-800"
						threadId={threadId}
					/>
				)}
			</div>
		</div>
	);
}

export function MainLayout() {
	const viewport = useViewportSize();
	const gtsm = viewport > 0;

	const isSmallViewport = useViewportSize() <= 2;

	return (
		<ThreadsProvider>
			<div className="h-screen flex flex-1">
				{isSmallViewport ? null : <ChannelsList className="bg-primary-1200" />}

				{gtsm ? <PrivateThreadsList className="bg-primary-1100" /> : null}

				<ContentContainer />

				<NotificationController />
				<Modal />
			</div>
		</ThreadsProvider>
	);
}

MainLayout.displayName = 'MainLayout';
