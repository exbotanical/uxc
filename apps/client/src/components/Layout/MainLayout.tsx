import React from 'react';
import { useParams } from 'react-router-dom';

import { ThreadsProvider } from '@/state/context/ThreadsContext';

import { ChannelsList } from '@/components/Channel/ChannelsList';
import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedCreatePrivateThreadModal as Modal } from '@/components/PrivateThread/CreatePrivateThread';
import { PrivateThreadsList } from '@/components/PrivateThread';
import { useViewportSize } from '@/hooks/useViewportSize';
import { ContentContainer } from '@/components/Content';

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
