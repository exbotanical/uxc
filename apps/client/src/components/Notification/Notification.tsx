import React, { useEffect } from 'react';

import type { Notification as NotifType } from '@/state/types';

import { CloseIconButton } from '@/components/Buttons/CloseIconButton';
import { onEnterKeyPressed } from '@/utils';

export type NotificationDuration = 'default' | 'sticky';

export type NotificationProps = Partial<NotifType> & {
	onClose?: () => void;
};

export function Notification({
	message,
	button,
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
			className={`flex rounded-8 p-3 relative w-full items-center justify-center text-button transition-transform duration-300 ${color}`}
		>
			{onClose ? (
				<div
					className="flex absolute cursor-pointer h-4 w-12 right-2 bottom-5 pt-1"
					onClick={onClose}
					onKeyPress={onEnterKeyPressed(onClose)}
					role="button"
					tabIndex={0}
				>
					<CloseIconButton style={{ transform: 'rotate(45deg)' }} />
				</div>
			) : null}

			<div className="flex space-x-4 items-center">
				<div className="bold">{message}</div>

				{button}
			</div>
		</div>
	);
}

Notification.displayName = 'Notification';
