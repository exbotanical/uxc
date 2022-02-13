import React from 'react';

import type { PropsFromRedux } from '@/state';
import type { User } from '@uxc/types';

import { StatusIndicator } from '@/components/Badges/StatusIndicator';
import { Input } from '@/components/Fields/Input';
import { connector } from '@/state';
import { onEnterKeyPressed } from '@/utils';
import SvgIcon from '../Icon';

interface ChatThreadHeaderProps {
	user: User;
}

function ChatThreadHeader({
	user,
	showUpsertThreadModal
}: ChatThreadHeaderProps & PropsFromRedux) {
	const handleClick = () => {
		showUpsertThreadModal({
			data: 'threadId',
			type: 'edit'
		});
	};

	return (
		<div
			className="flex justify-between border-b border-slate-800 bg-primary-800 p-2"
			style={{ minHeight: '50px', height: '50px' }}
		>
			<div className="flex justify-between items-center text-primary-100 font-bold">
				<SvgIcon name="ampersat" dimensions={21} />
				whitney
			</div>

			<div className="flex items-center">
				<Input
					autoComplete="off"
					className="text-primary-100 bg-primary-900 text-xs h-5"
					placeholder="Search"
				/>

				<div className="ml-4 mt-1 text-primary-100">
					<button className="btn-hover">
						<SvgIcon name="info" dimensions={21} />
					</button>
				</div>
			</div>

			{/* <button
				className="btn-hover p-2"
				onClick={handleClick}
				onKeyPress={onEnterKeyPressed(handleClick)}
				role="button"
				tabIndex={0}
			>
				<EditIcon />className="text-primary-300"
			</button> */}
		</div>
	);
}

ChatThreadHeader.displayName = 'ChatThreadHeader';

export const ConnectedChatThreadHeader = connector(ChatThreadHeader);
