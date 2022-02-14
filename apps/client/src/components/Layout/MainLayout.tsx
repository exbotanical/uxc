import React from 'react';
import { Outlet } from 'react-router-dom';

import { ContentLayout } from './ContentLayout';
import { SidebarLayout } from './SidebarLayout';

import { ChannelsList } from '@/components/Channel/ChannelsList';
import { NotificationController } from '@/components/Notification/NotificationController';
import { useViewportSize } from '@/hooks/useViewportSize';
import { ThreadsProvider } from '@/state/context/ThreadsContext';

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
				{/* <Modal /> */}
			</div>
		</ThreadsProvider>
	);
}

MainLayout.displayName = 'MainLayout';
