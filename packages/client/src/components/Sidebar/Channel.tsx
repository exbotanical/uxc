import { useConn } from '@/hooks/useConn';
import { NotificationBadge } from '@/ui/Badges/NotificationBadge';
import { onEnterKeyPressed } from '@/utils';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ChannelProps {
	uuid: string;
	name: string;
	desc?: string;
	type: 'channel' | 'dm';
}

export function Channel({
	name,
	desc = '',
	uuid,
	type = 'channel'
}: ChannelProps) {
	const navigate = useNavigate();
	const { setUser } = useConn();

	// TODO TMP
	const location = useLocation();
	const paths = location.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == uuid;
	const isChannel = type === 'channel';
	const itemClass = `p-1.5 grid grid-cols-4 items-center text-white  ${
		isActiveItem ? 'bg-transparent-alt text-tertiary' : 'text-white'
	} ${isChannel ? 'my-1' : ''}`;

	const currentChannel = {
		desc,
		name,
		uuid
	};

	const navToChannel = () => {
		setUser((user) => ({ ...user, currentChannel })); // TODO improve

		navigate(`/channel/${uuid}`);
	};

	const handleClick = () => {
		navToChannel();
	};

	return (
		<li
			className={itemClass}
			style={{ transition: 'color .3s, background-color .4s' }}
			onClick={handleClick}
			onKeyPress={(e) => {
				onEnterKeyPressed(navToChannel)<HTMLLIElement>(e);
			}}
			role="button"
			tabIndex={0}
		>
			<span className="col-span-3">
				{isChannel ? (
					<p>#{name}</p>
				) : (
					<div className="flex items-center">
						<svg
							className="h-2 w-2 fill-current text-green-400 mr-2"
							viewBox="0 0 20 20"
						>
							<circle cx="10" cy="10" r="10" />
						</svg>

						<p className="text-white opacity-75">{name}</p>
					</div>
				)}
			</span>

			<div className="place-self-end">
				<NotificationBadge>
					<p>2</p>
				</NotificationBadge>
			</div>
		</li>
	);
}

Channel.displayName = 'Channel';
