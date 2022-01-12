

import { connector, PropsFromRedux } from '@uxc/client/state';
import { EditIcon } from '@uxc/client/ui/Icons/EditIcon';
import { handleKeypressWith } from '@uxc/client/utils';
import React from 'react';

import type { User } from '@uxc/client/types/user';

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
		</div>
	);
}

ChannelHeader.displayName = 'ChannelHeader';

export const ChannelHeaderContainer = connector(ChannelHeader);
