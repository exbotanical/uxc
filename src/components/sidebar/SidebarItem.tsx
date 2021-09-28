import React, { PropsWithChildren } from 'react';
import { useHistory } from 'react-router-dom';

import '@/styles/sidebar-item.scss';

interface SidebarItemProps {
	title: string;
	id?: number;
}

const SidebarItem = ({
	children,
	title,
	id
}: PropsWithChildren<SidebarItemProps>) => {
	if (children) {
		return (
			<div className="sidebar-item">
				{children}
				<h3>{title}</h3>
			</div>
		);
	}

	const history = useHistory();

	const navToChannel = () => {
		history.push(`/channel/${id}`);
	};

	const handleClick = () => {
		navToChannel();
	};

	const handleKeypress = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key == 'Enter') {
			event.preventDefault();
			navToChannel();
		}
	};

	return (
		<div
			className="sidebar-item"
			onClick={handleClick}
			onKeyPress={handleKeypress}
			role="button"
			tabIndex={0}
		>
			<h3 className="sidebar-item__channels">
				<span className="sidebar-item__hash">#</span>
				{title}
			</h3>
		</div>
	);
};

export default SidebarItem;
