import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Buttons/Button';
import { Channel } from '@/components/Sidebar/Channel';
import { ConnectedDivider as Divider } from '@/components/Sidebar/Divider';
import { Status } from '@/components/Sidebar/Status';
import { useConn } from '@/hooks/useConn';

export function Sidebar({ className = '' }: { className?: string }) {
	const navigate = useNavigate();
	const { conn } = useConn();
	const { user } = conn!;

	const toDashboard = () => {
		navigate(`/dashboard`);
	};

	return (
		<div
			className={`flex flex-col bg-primary-800 h-full rounded-sm ${className}`}
		>
			<Status />

			<nav className="mb-2">
				<Divider title="Channels" />

				<ul>
					{user.channels.map(({ name, uuid, desc }) => (
						<Channel
							desc={desc}
							key={uuid}
							name={name}
							type="channel"
							uuid={uuid}
						/>
					))}
				</ul>
			</nav>

			<hr className="border-outline font-thin" />

			<Divider title="Direct Messages" />

			{user.directMessageThreads.map(({ user, uuid }) => (
				<Channel key={uuid} name={user.username} type="dm" uuid={uuid} />
			))}

			<Button
				className="mt-auto mb-2 mx-2"
				color="primary"
				onClick={toDashboard}
				type="button"
			>
				To dashboard
			</Button>
		</div>
	);
}

Sidebar.displayName = 'Sidebar';
