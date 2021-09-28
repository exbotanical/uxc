import React, { useEffect, useState } from 'react';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InboxIcon from '@material-ui/icons/Inbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SidebarItem from '@/components/sidebar/SidebarItem';

import '@/styles/sidebar.scss';
import type { IChannel } from '@/types/channel';
import { fetchData } from '@/services';

const Sidebar = () => {
	const [channels, setChannels] = useState<IChannel[]>([]);

	useEffect(() => {
		fetchData<{ channels: IChannel[] }>(import('@/data/channels')).then(
			({ channels }) => {
				setChannels(channels);
			}
		);
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<div className="sidebar__info">
					<h2>text</h2>
					<h3>
						<FiberManualRecordIcon />
						more text
					</h3>
				</div>
				<CreateIcon />
			</div>

			<SidebarItem title="Mentions & Reactions">
				<InboxIcon className="sidebar-item__icon" />
			</SidebarItem>
			<SidebarItem title="Bookmarked">
				<BookmarkIcon className="sidebar-item__icon" />
			</SidebarItem>

			<hr />
			<SidebarItem title="Channels">
				<ExpandMoreIcon className="sidebar-item__icon" />
			</SidebarItem>
			{channels.map(({ name, id }) => (
				<SidebarItem key={id} title={name} id={id} />
			))}

			<hr />
			<SidebarItem title="Direct Messages">
				<ExpandMoreIcon className="sidebar-item__icon" />
			</SidebarItem>

			{[{ name: 'Joe Dirt', id: 99 }].map(({ name, id }) => (
				<SidebarItem key={id} title={name} id={id} />
			))}
		</div>
	);
};

export default Sidebar;
