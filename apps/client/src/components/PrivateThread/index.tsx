import React, { useContext } from 'react';

import { SearchButton } from './SearchButton';

import { ConnectedDelimiter as Delimiter } from '@/components/PrivateThread/Delimiter';
import { PrivateThread } from '@/components/PrivateThread/PrivateThread';
import { ThreadsContext } from '@/state/context/ThreadsContext';
import SvgIcon from '../Icon';
import { useLocation, useNavigate } from 'react-router-dom';

export function PrivateThreadsList({ className = '' }: { className?: string }) {
	const { threads } = useContext(ThreadsContext);
	const navigate = useNavigate();
	const location = useLocation();
	const paths = location.pathname.split('/');

	const isActiveItem = paths[paths.length - 1] == '/thread';
	const activeClass = `${
		isActiveItem ? 'bg-red text-tertiary' : 'text-primary-100'
	}`;

	const handleClick = (path: string) => {
		navigate(`/thread/${path}`);
	};

	const onEnterKeyPressed = (
		event: React.KeyboardEvent<HTMLLIElement>,
		path: string
	) => {
		if (event.key == 'Enter') {
			event.preventDefault();
			handleClick(path);
		}
	};

	return (
		<aside className={`flex flex-col h-full ${className}`}>
			<SearchButton />

			<nav className="overflow-hidden w-[22rem]">
				<ul>
					<li
						className={`${activeClass} w-full flex items-center p-4 rounded-sm`}
						onClick={(e) => handleClick('/thread')}
						onKeyPress={(e) => {
							onEnterKeyPressed(e, '/thread');
						}}
						role="button"
						style={{ transition: 'color 0.3s, background-color 0.4s' }}
						tabIndex={0}
					>
						<SvgIcon name="people" dimensions={21} />
						<p className="text-primary-200 text-lg font-semibold ml-6">
							Friends
						</p>
					</li>
				</ul>

				<Delimiter className="bg-primary-1000" title="Direct Messages" />
				<ul className="flex flex-1 flex-col overflow-y-auto h-full">
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
