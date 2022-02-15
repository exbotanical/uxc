import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserAvatar } from '../User/UserAvatar';

import type { ObjectID, User } from '@uxc/types';

import { GET_CURRENT_USER } from '@/services/api/queries';
import { StatefulThread, ThreadsContext } from '@/state/context/ThreadsContext';
import { onEnterKeyPressed } from '@/utils';
import { NotificationBadge } from '../Badges/NotificationBadge';

interface PrivateThreadProps {
	id: ObjectID;
}

function UnreadMessagesBadge({ newMessages }: StatefulThread) {
	if (!newMessages) {
		return null;
	}

	return (
		<NotificationBadge className="mb-1">
			<p>{newMessages}</p>
		</NotificationBadge>
	);
}
UnreadMessagesBadge.displayName = 'UnreadMessagesBadge';

export function PrivateThread({ id }: PrivateThreadProps) {
	const { getThreadById } = useContext(ThreadsContext);
	const thread = getThreadById(id);

	const { data: user } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const navigate = useNavigate();
	const location = useLocation();
	const paths = location.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == id;
	const activeClass = `${
		isActiveItem ? 'bg-primary-1000 text-primary-200' : 'text-primary-100'
	}`;

	const them = thread?.users.find(
		({ _id }) => _id !== user?.getCurrentUser._id
	);

	const handleClick = () => {
		navigate(`/${id}`);
	};

	/** @todo handler erroneous state */
	if (!them || !thread) {
		return null;
	}

	return (
		<li
			className={`${activeClass} w-full flex items-center p-2 rounded-sm hover:bg-primary-1000`}
			onClick={handleClick}
			onKeyPress={(e) => {
				onEnterKeyPressed(handleClick)<HTMLLIElement>(e);
			}}
			role="button"
			style={{ transition: 'color 0.3s, background-color 0.4s' }}
			tabIndex={0}
		>
			<div className="flex justify-center items-center">
				<UserAvatar size="md" u={them} newMessagesCount={thread.newMessages} />

				<p className="text-lg font-semibold m-auto ml-3">{them.username}</p>
			</div>
		</li>
	);
}

PrivateThread.displayName = 'PrivateThread';
