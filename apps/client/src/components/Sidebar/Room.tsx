import { ObjectID, User } from '@uxc/types';
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserAvatar } from '../User/UserAvatar';

import { onEnterKeyPressed } from '@/utils';
import { DirectsContext } from '@/pages/DirectsContext';
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/services/api/queries';

interface RoomProps {
	id: ObjectID;
}

export function Room({ id }: RoomProps) {
	const { getDirectById } = useContext(DirectsContext);
	const direct = getDirectById(id);
	const { data: user } = useQuery<{
		getUser: User;
	}>(GET_USER);

	const navigate = useNavigate();
	const location = useLocation();
	const paths = location.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == id;
	const activeClass = `${
		isActiveItem
			? 'bg-transparent-alt rounded-lg text-tertiary'
			: 'text-primary-100'
	}`;

	const them = direct?.users.find(({ _id }) => _id !== user?.getUser._id)!;

	const handleClick = () => {
		navigate(`/room/${id}`);
	};

	return (
		<li
			className={`${activeClass} w-full flex justify-between items-center p-1 px-2 rounded-sm text-primary-100`}
			onClick={handleClick}
			onKeyPress={(e) => {
				onEnterKeyPressed(handleClick)<HTMLLIElement>(e);
			}}
			role="button"
			style={{ transition: 'color 0.3s, background-color 0.4s' }}
			tabIndex={0}
		>
			<div className="flex items-center gap-2">
				<UserAvatar size="xs" u={them} />
				<h5 className="font-semibold mb-1.5">{them?.username}</h5>
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

Room.displayName = 'Room';
