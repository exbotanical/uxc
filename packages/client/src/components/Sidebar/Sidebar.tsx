
import { RoutedSidebarItem as SidebarItem } from '@uxc/client/components/Sidebar/SidebarItem';
import { SidebarSectionContainer } from '@uxc/client/components/Sidebar/SidebarSection';
import { Status } from '@uxc/client/components/Sidebar/Status/Status';
import { useConn } from '@uxc/client/hooks/useConn';
import React from 'react';

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
