import React from 'react';

import type { FC } from 'react';

import { handleKeypressWith } from '@/utils';
import { connector, PropsFromRedux } from '@/state';

interface ISidebarSectionProps {
	title: string;
}

const SidebarSection: FC<ISidebarSectionProps & PropsFromRedux> = ({
	title,
	showUpsertChannelModal
}) => {
	const handleClick = () => {
		showUpsertChannelModal({ type: 'create' });
	};

	return (
		<div className="px-2 my-2 text-white flex justify-between items-center">
			<p className="whitespace-nowrap font-bold text-sm opacity-75 uppercase">
				{title}
			</p>
			<div
				role="button"
				tabIndex={0}
				onClick={handleClick}
				onKeyPress={handleKeypressWith(handleClick)}
			>
				<svg
					className="fill-current h-4 w-4 opacity-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
				</svg>
			</div>
		</div>
	);
};

SidebarSection.displayName = 'SidebarSection';

export const SidebarSectionContainer = connector(SidebarSection);
