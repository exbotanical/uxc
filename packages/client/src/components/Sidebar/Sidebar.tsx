import { Channel } from '@/components/Sidebar/Channel';
import { ConnectedDivider as Divider } from '@/components/Sidebar/Divider';
import { Status } from '@/components/Sidebar/Status';
import { useConn } from '@/hooks/useConn';
import { Button } from '@/ui/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
	const navigate = useNavigate();
	const { conn } = useConn();
	const { user } = conn!;

	const toDashboard = () => {
		navigate(`/dashboard`);
	};

	return (
		<div className="flex flex-col bg-primary-800 h-full px-2 rounded-sm">
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
				className="mt-auto"
				color="primary"
				type="button"
				onClick={toDashboard}
			>
				To dashboard
			</Button>
		</div>
	);
}

Sidebar.displayName = 'Sidebar';
