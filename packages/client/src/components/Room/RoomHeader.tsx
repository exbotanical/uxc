import { connector, PropsFromRedux } from '@/state';
import { EditIcon } from '@/ui/Icons/EditIcon';
import { onEnterKeyPressed } from '@/utils';
import React from 'react';

import type { User } from '@uxc/types';

interface RoomHeaderProps {
	user: User;
}

function RoomHeader({
	user,
	showUpsertChannelModal
}: RoomHeaderProps & PropsFromRedux) {
	const handleClick = () => {
		showUpsertChannelModal({
			data: user.currentChannel,
			type: 'edit'
		});
	};

	return (
		<header className="border-b my-2 border-outline flex px-3 py-2 justify-between h-9 mt-0">
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
					onClick={handleClick}
					onKeyPress={onEnterKeyPressed(handleClick)}
					role="button"
					tabIndex={0}
					className="cursor-pointer p-2 hover:bg-transparent-alt rounded-full transition ease-in-out transform hover:scale-125 duration-300"
				>
					<EditIcon />
				</div>
			</section>
		</header>
	);
}

RoomHeader.displayName = 'RoomHeader';

export const ConnectedRoomHeader = connector(RoomHeader);
