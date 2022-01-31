import React from 'react';

import { Rooms } from '@/components/Rooms/Rooms';
import { NotificationController } from '@/components/Notification/NotificationController';
import { ConnectedRoom } from '@/components/Room/Room';
import { ConnectedCreateRoomModal } from '@/components/Sidebar/CreateRoom';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { useViewportSize } from '@/hooks/useViewportSize';
import { useParams } from 'react-router-dom';
import { DirectsProvider } from './DirectsContext';

const Dashboard = () => {
	return (
		<div
			className={`flex flex-col justify-center items-center grow bg-primary-800 rounded-sm`}
		>
			<h1 className="text-white">Dashboard</h1>
		</div>
	);
};

export function Room() {
	const { roomId } = useParams();
	const viewport = useViewportSize();
	const gtsm = viewport > 0;

	const isIndexRoom = roomId == null;

	return (
		<DirectsProvider>
			<div className="h-screen flex flex-1">
				<NotificationController />
				<ConnectedCreateRoomModal />

				<Rooms className="bg-primary-700" />

				{gtsm ? <Sidebar className="bg-primary-900 w-[18rem]" /> : null}

				{isIndexRoom ? (
					<Dashboard />
				) : (
					<ConnectedRoom
						className="overflow-hidden grow col-span-8 bg-primary-800"
						roomId={roomId}
					/>
				)}
			</div>
		</DirectsProvider>
	);
}
