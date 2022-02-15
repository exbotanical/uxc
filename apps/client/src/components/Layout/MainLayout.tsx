import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { ContentLayout } from './ContentLayout';
import { SidebarLayout } from './SidebarLayout';

import { ChannelsList } from '@/components/Channel/ChannelsList';
import { NotificationController } from '@/components/Notification/NotificationController';
import { useViewportSize } from '@/hooks/useViewportSize';
import { ThreadsProvider } from '@/state/context/ThreadsContext';
import { useSubscription } from '@apollo/client';
import type { Message, User } from '@uxc/types';
import { ON_ANY_MESSAGE_CREATED } from '@/services/api/queries';
import { connector, PropsFromRedux, showNotification, store } from '@/state';

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

export const ConnectedMainLayout = MainLayout;
