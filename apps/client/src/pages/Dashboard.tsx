import React from 'react';

import type { User } from '@uxc/types';

import { Feed } from '@/components/Feed/Feed';
import { Panel } from '@/components/Layout/Panel';
import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedCreatePrivateThreadModal as Modal } from '@/components/PrivateThreadsList/CreatePrivateThread';
import { UserProfile } from '@/components/User/UserProfile';

export function Dashboard({ user }: { user: User }) {
	return (
		<div className="p-2 2xl:px-8 h-screen">
			<NotificationController />

			<Modal />

			<div className="grid grid-cols-6 gap-2 h-full">
				<Feed />

				<Panel bottom={<div />} top={<UserProfile user={user} />} />
			</div>
		</div>
	);
}
