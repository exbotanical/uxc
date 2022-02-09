import { useQuery } from '@apollo/client';
import { ObjectID, User } from '@uxc/types';
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserAvatar } from '../User/UserAvatar';

import { ThreadsContext } from '@/pages/ThreadsContext';
import { GET_USER } from '@/services/api/queries';
import { onEnterKeyPressed } from '@/utils';

interface PrivateThreadProps {
	id: ObjectID;
}

export function PrivateThread({ id }: PrivateThreadProps) {
	const { getThreadById } = useContext(ThreadsContext);
	const thread = getThreadById(id);
	const { data: user } = useQuery<{
		getCurrentUser: User;
	}>(GET_USER);

	const navigate = useNavigate();
	const location = useLocation();
	const paths = location.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == id;
	const activeClass = `${
		isActiveItem ? 'bg-transparent-alt text-tertiary' : 'text-primary-100'
	}`;

	const them = thread?.users.find(
		({ _id }) => _id !== user?.getCurrentUser._id
	)!;

	const handleClick = () => {
		navigate(`/thread/${id}`);
	};

	return (
		<li
			className={`${activeClass} w-full flex items-center p-2 rounded-sm text-primary-100`}
			onClick={handleClick}
			onKeyPress={(e) => {
				onEnterKeyPressed(handleClick)<HTMLLIElement>(e);
			}}
			role="button"
			style={{ transition: 'color 0.3s, background-color 0.4s' }}
			tabIndex={0}
		>
			<div className="flex justify-center items-center">
				<UserAvatar size="md" u={them} />
			</div>
			<div className="flex items-center">
				<p className="text-lg font-semibold m-auto ml-3">{them.username}</p>
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

PrivateThread.displayName = 'PrivateThread';
