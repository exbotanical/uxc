import React from 'react';

import { ThreadsProvider } from '@/state/context/ThreadsContext';

import { ChannelsList } from '@/components/Channel/ChannelsList';
import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedCreatePrivateThreadModal as Modal } from '@/components/PrivateThread/CreatePrivateThread';
import { useViewportSize } from '@/hooks/useViewportSize';
import { Outlet } from 'react-router-dom';
import { SidebarLayout } from './SidebarLayout';
import { ContentLayout } from './ContentLayout';

export function MainLayout() {
	const viewport = useViewportSize();
	const gtsm = viewport > 0;

	const isSmallViewport = useViewportSize() <= 2;

	return (
		<ThreadsProvider>
			<div className="h-screen flex flex-1">
				{isSmallViewport ? null : <ChannelsList className="bg-primary-1200" />}

				{gtsm ? <SidebarLayout body={<Outlet />} /> : null}

				<ContentLayout />

				<NotificationController />
				<Modal />
			</div>
		</ThreadsProvider>
	);
}

MainLayout.displayName = 'MainLayout';
