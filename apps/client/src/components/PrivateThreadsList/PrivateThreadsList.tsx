import React, { useContext } from 'react';

import { SearchButton } from './SearchButton';
import { PrivateThread } from '@/components/PrivateThreadsList/PrivateThread';
import { ConnectedHeader as Header } from '@/components/PrivateThreadsList/Header';
import { ThreadsContext } from '@/pages/ThreadsContext';

export function PrivateThreadsList({ className = '' }: { className?: string }) {
	const { threads } = useContext(ThreadsContext);
	console.log({ threads });
	return (
		<div className={`flex flex-col bg-primary-800 h-full ${className}`}>
			<SearchButton />

			<nav className="p-2 overflow-y-auto">
				{/* @todo sticky,rename */}
				<Header className="ml-1 bg-primary-800" title="Direct Messages" />

				<ul>
					{/* @todo del btn on hover */}
					{threads.map(({ _id: id }) => (
						<PrivateThread key={id} id={id} />
					))}
				</ul>
			</nav>

			{/* <Status user={user} /> */}
		</div>
	);
}

PrivateThreadsList.displayName = 'PrivateThreadsList';
