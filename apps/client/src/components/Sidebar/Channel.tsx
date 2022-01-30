import { User } from '@uxc/types';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserAvatar } from '../User/UserAvatar';

import { NotificationBadge } from '@/components/Badges/NotificationBadge';
import { useConn } from '@/hooks/useConn';
import { onEnterKeyPressed } from '@/utils';

interface ChannelProps {
	user: User;
}

export function Channel({ user }: ChannelProps) {
	const navigate = useNavigate();
	const { setUser } = useConn();
	const { id, username } = user;

	/** @todo */
	const location = useLocation();
	const paths = location.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == id;
	const activeClass = `${
		isActiveItem
			? 'bg-transparent-alt rounded-lg text-tertiary'
			: 'text-primary-100'
	}`;

	const currentChannel = {
		/** @todo */
		desc: '',
		name: username,
		id
	};

	const navToChannel = () => {
		setUser((user) => ({ ...user, currentChannel })); // TODO improve

		navigate(`/channel/${id}`);
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
			style={{ transition: 'color 0.3s, background-color 0.4s' }}
			tabIndex={0}
		>
			<div className="flex items-center gap-2">
				<UserAvatar size="xs" u={user} />
				<h5 className="font-semibold mb-1.5">{username}</h5>
			</div>

			{/* @todo new messages */}
			{/* {(id === '33' || id === '343') && (
				<NotificationBadge className="mb-1">
					<p>2</p>
				</NotificationBadge>
			)} */}
		</li>
	);
}

Channel.displayName = 'Channel';
