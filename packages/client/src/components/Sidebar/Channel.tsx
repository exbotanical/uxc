import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { NotificationBadge } from '@/components/Badges/NotificationBadge';
import { useConn } from '@/hooks/useConn';
import { onEnterKeyPressed } from '@/utils';
import { UserAvatar } from '../User/UserAvatar';
import { User } from '@uxc/types';

interface ChannelProps {
	user: User;
}

export function Channel({ user }: ChannelProps) {
	const navigate = useNavigate();
	const { setUser } = useConn();
	const { uuid, username } = user;

	/** @todo */
	const location = useLocation();
	const paths = location.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == uuid;
	const activeClass = `${
		isActiveItem
			? 'bg-transparent-alt rounded-lg text-tertiary'
			: 'text-primary-100'
	}`;

	const currentChannel = {
		/** @todo */
		desc: '',
		name: username,
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
			className={`${activeClass} w-full flex justify-between items-center p-1 px-2 rounded-sm`}
			onClick={handleClick}
			onKeyPress={(e) => {
				onEnterKeyPressed(navToChannel)<HTMLLIElement>(e);
			}}
			role="button"
			style={{ transition: 'color .3s, background-color .4s' }}
			tabIndex={0}
		>
			<div className="flex items-center gap-2">
				<UserAvatar size="xs" u={user} />
				<h5 className="font-semibold mb-1.5">{username}</h5>
			</div>

			{/* @todo new messages */}
			{/* {(uuid === '33' || uuid === '343') && (
				<NotificationBadge className="mb-1">
					<p>2</p>
				</NotificationBadge>
			)} */}
		</li>
	);
}

Channel.displayName = 'Channel';
