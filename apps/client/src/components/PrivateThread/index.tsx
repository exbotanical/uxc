import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SvgIcon from '@/components/Icon';
import { Delimiter } from '@/components/PrivateThread/Delimiter';
import { PrivateThread } from '@/components/PrivateThread/PrivateThread';
import { ThreadsContext } from '@/state/context/ThreadsContext';

export function PrivateThreadsList() {
	const { threads } = useContext(ThreadsContext);
	const navigate = useNavigate();
	const location = useLocation();
	const paths = location.pathname.split('/');

	const isActiveItem = paths[paths.length - 1] == '';
	const activeClass = `${
		isActiveItem ? 'bg-primary-1000 text-primary-200' : 'text-primary-100'
	}`;

	const handleClick = (path: string) => {
		navigate(`/${path}`);
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
		<>
			<ul>
				<li
					className={`w-full flex items-center p-4 rounded-sm hover:bg-primary-1000 ${activeClass}`}
					onClick={() => {
						handleClick('');
					}}
					onKeyPress={(e) => {
						onEnterKeyPressed(e, '/');
					}}
					role="button"
					style={{ transition: 'color 0.3s, background-color 0.4s' }}
					tabIndex={0}
				>
					<SvgIcon dimensions={21} name="people" />
					<p className="text-primary-200 text-lg font-semibold ml-6">Friends</p>
				</li>
			</ul>

			<Delimiter title="Direct Messages" />

			<ul className="flex flex-col overflow-y-auto h-full">
				{threads.map(({ _id: id }) => (
					// @todo scrollto selected
					<PrivateThread id={id} key={id} />
				))}
			</ul>
		</>
	);
}

PrivateThreadsList.displayName = 'PrivateThreadsList';
