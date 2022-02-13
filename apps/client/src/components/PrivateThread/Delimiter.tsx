import React from 'react';

import type { PropsFromRedux } from '@/state';

import { connector } from '@/state';
import { onEnterKeyPressed } from '@/utils';
import SvgIcon from '../Icon';

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
				<SvgIcon name="plus" dimensions={21} />
			</button>
		</div>
	);
}

Delimiter.displayName = 'Delimiter';

export const ConnectedDelimiter = connector(Delimiter);
