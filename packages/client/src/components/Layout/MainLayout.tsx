import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { ContentLayout } from './ContentLayout';
import { SidebarLayout } from './SidebarLayout';

import { ChannelsList } from '@/components/Channel/ChannelsList';
import { NotificationController } from '@/components/Notification/NotificationController';
import { useViewportSize } from '@/hooks/useViewportSize';
import { ThreadsProvider } from '@/state/context/ThreadsContext';

const Container = styled.div`
	display: flex;
	height: 100vh;
	flex: 1 1 0%;
	border: 1px solid ${({ theme }) => theme.colors.border.norm};
`;

export function MainLayout() {
	const viewport = useViewportSize();
	const gtsm = viewport > 0;

	const isSmallViewport = useViewportSize() <= 2;

	return (
		<ThreadsProvider>
			<Container>
				{isSmallViewport ? null : <ChannelsList />}

				{gtsm ? <SidebarLayout body={<Outlet />} /> : null}

				<ContentLayout />

				<NotificationController />
			</Container>
		</ThreadsProvider>
	);
}

MainLayout.displayName = 'MainLayout';

export const ConnectedMainLayout = MainLayout;
