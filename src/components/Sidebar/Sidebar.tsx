import React from 'react';

import type { FC } from 'react';

import { useConn } from '@/hooks/useConn';

import { SidebarSectionContainer } from '@/components/Sidebar/SidebarSection';
import { Status } from '@/components/Sidebar/Status/Status';
import { RoutedSidebarItem as SidebarItem } from '@/components/Sidebar/SidebarItem';

export const Sidebar: FC = () => {
	const { conn } = useConn();
	const { user } = conn;

	return (
		<div className="bg-primary-800 h-full p-4 rounded-sm">
			<Status />

			<div className="mb-4">
				<SidebarSectionContainer title="Channels" />
				{user.channels.map(({ name, uuid, desc }) => (
					<SidebarItem
						key={uuid}
						name={name}
						uuid={uuid}
						desc={desc}
						type="channel"
					/>
				))}
			</div>

			<hr className="border-outline font-thin" />
			<SidebarSectionContainer title="Direct Messages" />
			{user.directMessageThreads.map(({ user, uuid }) => (
				<SidebarItem key={uuid} name={user.username} uuid={uuid} type="dm" />
			))}
		</div>
	);
};

Sidebar.displayName = 'Sidebar';
