import React, { useContext } from 'react';

import { SearchButton } from './SearchButton';
import { Room } from '@/components/Sidebar/Room';
import { ConnectedHeader as Header } from '@/components/Sidebar/Header';
import { DirectsContext } from '@/pages/DirectsContext';

export function Sidebar({ className = '' }: { className?: string }) {
	const { directs } = useContext(DirectsContext);

	return (
		<div className={`flex flex-col bg-primary-800 h-full ${className}`}>
			<SearchButton />

			<nav className="p-2 overflow-y-auto">
				{/* @todo sticky,rename */}
				<Header className="ml-1 bg-primary-800" title="Direct Messages" />

				<ul>
					{/* @todo del btn on hover */}
					{directs.map(({ _id: id }) => (
						<Room key={id} id={id} />
					))}
				</ul>
			</nav>

			{/* <Status user={user} /> */}
		</div>
	);
}

Sidebar.displayName = 'Sidebar';
