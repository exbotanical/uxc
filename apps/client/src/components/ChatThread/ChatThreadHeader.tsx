import React from 'react';

import { StatusIndicator } from '@/components/Badges/StatusIndicator';
import { Input } from '@/components/Fields/Input';

import type { User } from '@uxc/types';

import { EditIcon } from '@/components/Icons/EditIcon';
import { connector, PropsFromRedux } from '@/state';
import { onEnterKeyPressed } from '@/utils';

interface ChatThreadHeaderProps {
	user: User;
}

function ChatThreadHeader({
	user,
	showUpsertThreadModal
}: PropsFromRedux & ChatThreadHeaderProps) {
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
				<svg
					fill="currentColor"
					height="24"
					viewBox="0 0 16 16"
					width="24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
				</svg>
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
						<svg
							fill="currentColor"
							height="24"
							viewBox="0 0 16 16"
							width="24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
						</svg>
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
				<EditIcon />
			</button> */}
		</div>
	);
}

ChatThreadHeader.displayName = 'ChatThreadHeader';

export const ConnectedChatThreadHeader = connector(ChatThreadHeader);
