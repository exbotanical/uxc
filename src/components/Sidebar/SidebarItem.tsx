import React from 'react';
import {
	useHistory,
	useLocation,
	withRouter,
	RouteComponentProps
} from 'react-router-dom';

import type { FC } from 'react';

import { useConn } from '@/hooks/useConn';
import { handleKeypressWith } from '@/utils';
import { NotificationBadge } from '@/ui/Badges/NotificationBadge';

type TParams = { id?: string };

interface ISidebarItemProps {
	uuid: string;
	name: string;
	desc?: string;
	type: 'dm' | 'channel';
}

const SidebarItem: FC<RouteComponentProps<TParams> & ISidebarItemProps> = ({
	name,
	desc = '',
	uuid,
	type = 'channel'
}) => {
	const history = useHistory();
	const { setUser } = useConn();

	// TODO TMP
	const l = useLocation();
	const paths = l.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == uuid;

	const currentChannel = { uuid, name, desc };

	const navToChannel = () => {
		setUser((user) => ({ ...user, currentChannel })); // TODO improve

		history.push(`/channel/${uuid}`);
	};

	const handleClick = () => {
		navToChannel();
	};

	return (
		<div
			onClick={handleClick}
			onKeyPress={handleKeypressWith(navToChannel)}
			role="button"
			tabIndex={0}
			className={`${
				isActiveItem ? 'bg-transparent-alt text-tertiary' : 'text-white'
			} py-1 px-2 flex items-center justify-between`}
		>
			{type === 'channel' ? (
				`#${name}`
			) : (
				<span className="flex items-center">
					<svg
						className="h-2 w-2 fill-current text-green-400 mr-2"
						viewBox="0 0 20 20"
					>
						<circle cx="10" cy="10" r="10" />
					</svg>
					<span className="text-white opacity-75">{name}</span>
				</span>
			)}
			<NotificationBadge>2</NotificationBadge>
		</div>
	);
};

SidebarItem.displayName = 'SidebarItem';

export const RoutedSidebarItem = withRouter(SidebarItem);
