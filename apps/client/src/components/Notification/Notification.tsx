import React, { useEffect } from 'react';

import type { Notification as NotifType } from '@/state/types';

import { onEnterKeyPressed } from '@/utils';
import SvgIcon from '../Icon';

export type NotificationDuration = 'default' | 'sticky';

export type NotificationProps = Partial<NotifType> & {
	onClose?: () => void;
};

export function Notification({
	message,
	duration = 'default',
	type,
	onClose = () => {}
}: NotificationProps) {
	useEffect(() => {
		if (duration === 'sticky') {
			return;
		}

		const timer = setTimeout(() => {
			onClose();
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [duration]);

	const color =
		type === 'error'
			? 'bg-accent'
			: type === 'success'
			? 'bg-green-400'
			: 'bg-secondary';

	return (
		<div
			className={`flex rounded-md w-96 p-3 items-center self-center justify-between text-button transition-transform duration-300 mb-2 ${color}`}
		>
			<div className="font-bold ">{message}</div>

			<button
				onClick={onClose}
				onKeyPress={onEnterKeyPressed(onClose)}
				role="button"
				tabIndex={0}
				className="self-end"
			>
				<SvgIcon name="close" dimensions={32} />
			</button>
		</div>
	);
}

Notification.displayName = 'Notification';
