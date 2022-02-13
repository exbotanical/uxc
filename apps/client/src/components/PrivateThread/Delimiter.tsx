import React from 'react';

import type { PropsFromRedux } from '@/state';

import { connector } from '@/state';
import { onEnterKeyPressed } from '@/utils';

interface DelimiterProps {
	title: string;
	className?: string;
}

function Delimiter({
	title,
	className = '',
	showUpsertThreadModal
}: DelimiterProps & PropsFromRedux) {
	const handleClick = () => {
		showUpsertThreadModal({ type: 'create', data: null });
	};

	return (
		<div
			className={`flex justify-between items-center text-primary-100 p-4 ${className}`}
		>
			<p className="whitespace-nowrap font-bold text-sm opacity-75 uppercase">
				{title}
			</p>

			<button
				className="btn-hover"
				onClick={handleClick}
				onKeyPress={onEnterKeyPressed(handleClick)}
				role="button"
				tabIndex={0}
			>
				<svg
					fill="currentColor"
					viewBox="0 0 16 16"
					height="28"
					width="28"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
				</svg>
			</button>
		</div>
	);
}

Delimiter.displayName = 'Delimiter';

export const ConnectedDelimiter = connector(Delimiter);
