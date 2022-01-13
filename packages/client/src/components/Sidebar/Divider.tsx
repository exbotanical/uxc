import { connector, PropsFromRedux } from '@/state';
import { onEnterKeyPressed } from '@/utils';
import React from 'react';

interface DividerProps {
	title: string;
}

function Divider({
	title,
	showUpsertChannelModal
}: PropsFromRedux & DividerProps) {
	const handleClick = () => {
		showUpsertChannelModal({ type: 'create' });
	};

	return (
		<div className="grid grid-cols-4 items-center text-white my-1 px-2">
			<div className="col-span-3">
				<p className="whitespace-nowrap font-bold text-sm opacity-75 uppercase">
					{title}
				</p>
			</div>

			<div className="place-self-end" style={{ paddingRight: '2.75px' }}>
				<div
					onClick={handleClick}
					onKeyPress={onEnterKeyPressed(handleClick)}
					role="button"
					tabIndex={0}
					className="cursor-pointer p-1 hover:bg-transparent-alt rounded-full transition ease-in-out transform hover:scale-125 duration-300"
				>
					<svg
						className="fill-current h-4 w-4 opacity-50"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
					</svg>
				</div>
			</div>
		</div>
	);
}

Divider.displayName = 'Divider';

export const ConnectedDivider = connector(Divider);
