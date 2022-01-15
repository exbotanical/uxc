import React from 'react';

import { Channel } from '@/components/Sidebar/Channel';
import { ConnectedHeader as Header } from '@/components/Sidebar/Header';
import { useConn } from '@/hooks/useConn';
import { SearchButton } from './SearchButton';
import { Status } from './Status';

export function Sidebar({ className = '' }: { className?: string }) {
	const { conn } = useConn();
	const { user } = conn!;

	return (
		<div className={`flex flex-col bg-primary-800 h-full ${className}`}>
			<SearchButton />

			<nav className="p-2 overflow-y-auto">
				{/* @todo sticky */}
				<Header title="Direct Messages" className="ml-1 bg-primary-800" />

				<ul>
					{/* @todo del btn on hover */}
					{user.directMessageThreads.map(({ user, uuid }) => (
						<Channel key={uuid} user={user} />
					))}
				</ul>
			</nav>

			<Status user={user} />
		</div>
	);
}

Sidebar.displayName = 'Sidebar';
