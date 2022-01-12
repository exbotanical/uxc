
import { useConn } from '@uxc/client/hooks/useConn';
import { NotificationBadge } from '@uxc/client/ui/Badges/NotificationBadge';
import { handleKeypressWith } from '@uxc/client/utils';
import React from 'react';
import {
	useHistory,
	useLocation,
	withRouter,
	RouteComponentProps
} from 'react-router-dom';

interface Params {
	id?: string;
}

interface SidebarItemProps {
	uuid: string;
	name: string;
	desc?: string;
	type: 'channel' | 'dm';
}

function SidebarItem({
	name,
	desc = '',
	uuid,
	type = 'channel'
}: RouteComponentProps<Params> & SidebarItemProps) {
	const history = useHistory();
	const { setUser } = useConn();

	// TODO TMP
	const l = useLocation();
	const paths = l.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == uuid;

	const currentChannel = {
		desc,
		name,
		uuid
	};

	const navToChannel = () => {
		setUser((user) => ({ ...user, currentChannel })); // TODO improve

		history.push(`/channel/${uuid}`);
	};

	const handleClick = () => {
		navToChannel();
	};

	return (
		<div
			className={`${
				isActiveItem ? 'bg-transparent-alt text-tertiary' : 'text-white'
			} py-1 px-2 flex items-center justify-between`}
			onClick={handleClick}
			onKeyPress={handleKeypressWith(navToChannel)}
			role="button"
			tabIndex={0}
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

			<NotificationBadge>
				<p>2</p>
			</NotificationBadge>
		</div>
	);
}

SidebarItem.displayName = 'SidebarItem';

export const RoutedSidebarItem = withRouter(SidebarItem);
