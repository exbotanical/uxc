import React from 'react';

import { RoutedSidebarItem as SidebarItem } from '@/components/Sidebar/SidebarItem';
import { SidebarSectionContainer } from '@/components/Sidebar/SidebarSection';
import { Status } from '@/components/Sidebar/Status/Status';
import { useConn } from '@/hooks/useConn';

export function Sidebar() {
	const { conn } = useConn();
	const { user } = conn;

	return (
		<div className="bg-primary-800 h-full p-4 rounded-sm">
			<Status />

			<div className="mb-4">
				<SidebarSectionContainer title="Channels" />

				{user.channels.map(({ name, uuid, desc }) => (
					<SidebarItem
						desc={desc}
						key={uuid}
						name={name}
						type="channel"
						uuid={uuid}
					/>
				))}
			</div>

			<hr className="border-outline font-thin" />

			<SidebarSectionContainer title="Direct Messages" />

			{user.directMessageThreads.map(({ user, uuid }) => (
				<SidebarItem key={uuid} name={user.username} type="dm" uuid={uuid} />
			))}
		</div>
	);
}

Sidebar.displayName = 'Sidebar';
