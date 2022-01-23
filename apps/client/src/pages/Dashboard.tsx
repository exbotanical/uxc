import React from 'react';

import { Feed } from '@/components/Feed/Feed';
import { Panel } from '@/components/Layout/Panel';
import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedCreateChannelModal } from '@/components/Sidebar/CreateChannel';
import { UserProfile } from '@/components/User/UserProfile';
import { useViewportSize } from '@/hooks/useViewportSize';

export function Dashboard() {
	const viewport = useViewportSize();

	return (
		<div className="p-2 2xl:px-8 h-screen">
			<NotificationController />

			<ConnectedCreateChannelModal />

			<div className="grid grid-cols-6 gap-2 h-full">
				<Feed />

				<Panel bottom={<div />} top={<UserProfile />} />
			</div>
		</div>
	);
}
