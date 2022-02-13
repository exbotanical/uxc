import React, { useContext } from 'react';

import { SearchButton } from './SearchButton';

import { ConnectedHeader as Header } from '@/components/PrivateThreadsList/Header';
import { PrivateThread } from '@/components/PrivateThreadsList/PrivateThread';
import { ThreadsContext } from '@/pages/ThreadsContext';

export function PrivateThreadsList({ className = '' }: { className?: string }) {
	const { threads } = useContext(ThreadsContext);

	return (
		<aside className={`flex flex-col h-full ${className}`}>
			<SearchButton />

			<Header className="bg-primary-1100  sticky" title="Direct Messages" />
			<nav className="overflow-y-auto w-[22rem]">
				<ul className="flex flex-1 flex-col">
					{/* @todo del btn on hover */}
					{threads.map(({ _id: id }) => (
						<PrivateThread id={id} key={id} />
					))}
				</ul>
			</nav>

			{/* <Status user={user} /> */}
		</aside>
	);
}

PrivateThreadsList.displayName = 'PrivateThreadsList';
