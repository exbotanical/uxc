import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { FC } from 'react';

import { connector, PropsFromRedux } from '@/state';
import { useConn, useWrappedConn } from '@/hooks/useConn';

import type { User } from '@/types/user';
import { UserCard } from '@/components/User/UserCard';

const ChannelUser: FC<User> = (u) => {
	return (
		<div className="flex py-3 w-full hover:bg-primary-700">
			<UserCard size="sm" isOnline={true} u={u} />

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
};
export const ChannelUsersWrapper: FC<{ n: number }> = ({ n, children }) => {
	return (
		<div className="bg-primary-800 p-4 pb-5 w-full flex flex-col flex-1 overflow-y-auto min-h-full rounded-sm">
			<h4 className="text-primary-100">Users</h4>
			<h6 className="text-primary-300 mt-3 text-sm font-bold uppercase">
				{n} online
			</h6>
			<div className="flex flex-col mt-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700 overflow-x-hidden">
				{children}
			</div>
		</div>
	);
};

export const ChannelUsers: React.FC<PropsFromRedux> = ({
	showNotification
}) => {
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
					type: 'error',
					message:
						'Something went wrong while retrieving data about this channel. Please try again later.'
				});
			} else if (res.users) {
				setUsers(res.users);
			}
		})();
	}, [id]); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<ChannelUsersWrapper n={users.length + 1}>
			<ChannelUser {...conn.user} key={conn.user.uuid} />

			{users.map((u) => (
				<ChannelUser {...u} key={u.uuid} />
			))}
		</ChannelUsersWrapper>
	);
};

export const UsersInChannelContainer = connector(ChannelUsers);
