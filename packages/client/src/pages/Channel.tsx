import React from 'react';

import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedRoom } from '@/components/Room/Room';
import { ConnectedUsersInChannel } from '@/components/Room/Users/UsersInChannel';
import { ConnectedCreateChannelModal } from '@/components/Sidebar/CreateChannel';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { useViewportSize } from '@/hooks/useViewportSize';

export function Channel() {
	const viewport = useViewportSize();

	const gtsm = viewport > 0;
	const gtmd = viewport > 1;
	return (
		<div className="p-2 2xl:px-8 h-screen">
			<NotificationController />

			<ConnectedCreateChannelModal />

			<div className="h-full grid grid-cols-8 gap-2 lg:gap-4">
				{gtsm ? <Sidebar className="col-span-2" /> : null}

				<ConnectedRoom
					className={`overflow-hidden ${
						gtmd ? 'col-span-4' : gtsm ? 'col-span-6' : 'col-span-8'
					}`}
				/>

				{gtmd ? <ConnectedUsersInChannel className="col-span-2" /> : null}
			</div>
		</div>
	);
}
