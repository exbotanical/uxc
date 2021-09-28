import React from 'react';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';

import SidebarItem from '@/components/sidebar/SidebarItem';

import '@/styles/sidebar.scss';

const Sidebar = () => {
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
			<SidebarItem />
			<SidebarItem />
			<SidebarItem />
			<hr />
			<SidebarItem />
			<SidebarItem />
			<SidebarItem />
			<hr />
			<SidebarItem />

			<SidebarItem />
		</div>
	);
};

export default Sidebar;
