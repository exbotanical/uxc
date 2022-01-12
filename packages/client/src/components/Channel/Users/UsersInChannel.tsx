import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { User } from '@/types/user';

import { UserCard } from '@/components/User/UserCard';
import { useConn, useWrappedConn } from '@/hooks/useConn';
import { connector, PropsFromRedux } from '@/state';

function ChannelUser(u: User) {
	return (
		<div className="flex py-3 w-full hover:bg-primary-700">
			<UserCard isOnline size="sm" u={u} />

			<div className="flex ml-3 flex-col overflow-hidden justify-center">
				<h5 className="text-primary-100 font-bold">{u.username}</h5>

				{/*
				{u.currentChannel ? (
					<a className={`hover:underline text-primary-300 truncate block`}>
						aaa
					</a>
				) : null} */}
			</div>
		</div>
	);
}
// TODO
export function ChannelUsersWrapper({
	children,
	n
}: {
	children: JSX.Element | JSX.Element[];
	n: number;
}) {
	return (
		<div className="bg-primary-800 p-4 pb-5 w-full flex flex-col flex-1 overflow-y-auto h-full rounded-sm">
			<h4 className="text-primary-100">Users</h4>

			<h6 className="text-primary-300 mt-3 text-sm font-bold uppercase">
				{n} online
			</h6>

			<div className="flex flex-col mt-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700 overflow-x-hidden">
				{children}
			</div>
		</div>
	);
}

export function ChannelUsers({ showNotification }: PropsFromRedux) {
	// TODO TMP
	const { client } = useWrappedConn();
	const { conn } = useConn();
	const l = useLocation();
	const paths = l.pathname.split('/');
	const id = paths[paths.length - 1];

	const [users, setUsers] = useState<User[]>([]);

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
		<ChannelUsersWrapper n={users.length + 1}>
			<ChannelUser {...conn.user} key={conn.user.uuid} />

			<>
				{users.map((u) => (
					<ChannelUser key={u.uuid} {...u} />
				))}
			</>
		</ChannelUsersWrapper>
	);
}

export const UsersInChannelContainer = connector(ChannelUsers);
