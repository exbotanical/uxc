import React from 'react';

import { SearchButton } from './SearchButton';
import { Status } from './Status';

import { Channel } from '@/components/Sidebar/Channel';
import { ConnectedHeader as Header } from '@/components/Sidebar/Header';
import { useConn } from '@/hooks/useConn';

export function Sidebar({ className = '' }: { className?: string }) {
	const { conn } = useConn();
	const { user } = conn!;

	return (
		<div className={`flex flex-col bg-primary-800 h-full ${className}`}>
			<SearchButton />

			<nav className="p-2 overflow-y-auto">
				{/* @todo sticky,rename */}
				<Header className="ml-1 bg-primary-800" title="Direct Messages" />

				<ul>
					{/* @todo del btn on hover */}
					{user.dms.map(({ user, id }) => (
						<Channel key={id} user={user} />
					))}
				</ul>
			</nav>

			<Status user={user} />
		</div>
	);
}

Sidebar.displayName = 'Sidebar';
