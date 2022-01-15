import React from 'react';

import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedRoom } from '@/components/Room/Room';
import { ConnectedCreateChannelModal } from '@/components/Sidebar/CreateChannel';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { useViewportSize } from '@/hooks/useViewportSize';
import { Channels } from '@/components/Channels/Channels';

export function Channel() {
	const viewport = useViewportSize();
	const gtsm = viewport > 0;

	return (
		<div className="h-screen flex flex-1">
			<NotificationController />
			<ConnectedCreateChannelModal />

			<Channels className="bg-primary-700" />

			{gtsm ? <Sidebar className="bg-primary-900 w-[18rem]" /> : null}

			<ConnectedRoom
				className={`overflow-hidden grow col-span-8 bg-primary-800`}
			/>
		</div>
	);
}
