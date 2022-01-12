import React from 'react';

import type { User } from '@/types/user';

import { connector, PropsFromRedux } from '@/state';
import { EditIcon } from '@/ui/Icons/EditIcon';
import { handleKeypressWith } from '@/utils';

interface ChannelHeaderProps {
	user: User;
}

function ChannelHeader({
	user,
	showUpsertChannelModal
}: ChannelHeaderProps & PropsFromRedux) {
	const handleClick = () => {
		showUpsertChannelModal({
			data: user.currentChannel,
			type: 'edit'
		});
	};

	return (
		<div className="border-b border-outline flex px-3 py-2 justify-between">
			<div className="flex flex-col">
				<h4 className="text-primary-100 mb-1 font-extrabold">
					#{user.currentChannel.name}
				</h4>

				<div className="text-primary-200 text-md truncate">
					{user.currentChannel.desc}
				</div>
			</div>

			<div className="self-end py-2">
				<div
					onClick={handleClick}
					onKeyPress={handleKeypressWith(handleClick)}
					role="button"
					tabIndex={0}
				>
					<EditIcon />
				</div>
			</div>

			{/* <div className="my-2 px-4 rounded-lg shadow-lg space-x-6 flex items-center bg-primary-700 rounded-8">
				<button className="focus:outline-none">
					<svg
						className="fill-current text-primary-100 h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
					</svg>
				</button>
				<input
					type="search"
					className="bg-transparent text-base focus:outline-none"
					placeholder="Search..."
				/>
			</div> */}
		</div>
	);
}

ChannelHeader.displayName = 'ChannelHeader';

export const ChannelHeaderContainer = connector(ChannelHeader);
