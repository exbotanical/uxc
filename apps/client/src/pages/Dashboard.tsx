import React from 'react';

import { Feed } from '@/components/Feed/Feed';
import { Panel } from '@/components/Layout/Panel';
import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedCreateRoomModal } from '@/components/Sidebar/CreateRoom';
import { UserProfile } from '@/components/User/UserProfile';
import type { User } from '@uxc/types';

export function Dashboard({ user }: { user: User }) {
	return (
		<div className="p-2 2xl:px-8 h-screen">
			<NotificationController />

			<ConnectedCreateRoomModal />

			<div className="grid grid-cols-6 gap-2 h-full">
				<Feed />

				<Panel bottom={<div />} top={<UserProfile user={user} />} />
			</div>
		</div>
	);
}
