import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { User } from '@uxc/types';

import { UserCard } from '@/components/User/UserCard';
import { useConn, useWrappedConn } from '@/hooks/useConn';
import { connector, PropsFromRedux } from '@/state';


function ChannelUser(u: User) {
	return (
		<div className="flex p-2 w-full hover:bg-primary-700">
			<UserCard isOnline size="sm" u={u} />

			<div className="flex ml-3 flex-col overflow-hidden justify-center">
				<h5 className="text-primary-100 font-bold">{u.username}</h5>
			</div>
		</div>
	);
}

export function UsersInChannel({ showNotification }: PropsFromRedux) {
	const location = useLocation();
	const [users, setUsers] = useState<User[]>([]);
	const { client } = useWrappedConn();
	const { conn } = useConn();

	const { user } = conn!;
	const paths = location.pathname.split('/');
	const id = paths[paths.length - 1];

	useEffect(() => {
		(async () => {
			const res = await client.query.getChannel({ id });
			if (typeof res === 'object' && 'error' in res) {
				showNotification({
					message:
						'Something went wrong while retrieving data about this channel. Please try again later.',
					type: 'error'
				});
			} else if (res.users) {
				setUsers(res.users);
			}
		})();
	}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="bg-primary-800 w-full h-full flex flex-col overflow-y-auto rounded-sm">
			<h4 className="text-primary-100 px-2 py-1">Users</h4>

			<h6 className="text-primary-300 px-2 py-1 text-sm font-bold uppercase">
				{users.length + 1} online
			</h6>

			<div className="flex flex-col mt-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700 overflow-x-hidden">
				<ChannelUser {...user} key={user.uuid} />

				{users.map((u) => (
						<ChannelUser key={u.uuid} {...u} />
					))}
			</div>
		</div>
	);
}

export const ConnectedUsersInChannel = connector(UsersInChannel);
