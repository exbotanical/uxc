import React from 'react';

import type { User } from '@uxc/types';

import { connector, PropsFromRedux } from '@/state';
import { EditIcon } from '@/components/Icons/EditIcon';
import { onEnterKeyPressed } from '@/utils';

interface RoomHeaderProps {
	user: User;
}

function RoomHeader({
	user,
	showUpsertChannelModal
}: PropsFromRedux & RoomHeaderProps) {
	const handleClick = () => {
		showUpsertChannelModal({
			data: user.currentChannel,
			type: 'edit'
		});
	};

	return (
		<header className="border-b mb-2 border-outline flex px-3 py-2 justify-between h-[75px]">
			<section className="flex flex-col">
				<h4 className="text-primary-100 mb-1 font-extrabold">
					#{user.currentChannel.name}
				</h4>

				<div className="text-primary-200 text-md truncate">
					{user.currentChannel.desc}
				</div>
			</section>

			<section>
				<div
					className="cursor-pointer p-2 hover:bg-transparent-alt rounded-full transition ease-in-out transform hover:scale-125 duration-300"
					onClick={handleClick}
					onKeyPress={onEnterKeyPressed(handleClick)}
					role="button"
					tabIndex={0}
				>
					<EditIcon />
				</div>
			</section>
		</header>
	);
}

RoomHeader.displayName = 'RoomHeader';

export const ConnectedRoomHeader = connector(RoomHeader);
