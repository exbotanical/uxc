import { CloseIconButton } from '@uxc/client/ui/CloseIconButton';
import { handleKeypressWith } from '@uxc/client/utils';
import React, { useEffect, useRef } from 'react';

import type { Notification as NotifType } from '@uxc/client/state/types';


export type NotificationDuration = 'default' | 'sticky';

export type NotificationProps = Partial<NotifType> & {
	onClose?: () => void;
};

export function Notification({
	message,
	button,
	duration = 'default',
	type,
	onClose
}: NotificationProps) {
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (duration === 'sticky') {
			return;
		}

		const timer = setTimeout(() => {
			onCloseRef.current();
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
					className="flex absolute cursor-pointer"
					onClick={onClose}
					onKeyPress={handleKeypressWith(onClose)}
					role="button"
					style={{
						height: 13,
						right: 13,
						top: 5,
						width: 13
					}}
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
