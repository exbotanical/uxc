import React, { useEffect, useRef } from 'react';

import type { FC } from 'react';

import { INotification } from '@/state/types';
import { handleKeypressWith } from '@/utils';

import { CloseIconButton } from '@/ui/CloseIconButton';

export type TNotificationDuration = 'default' | 'sticky';

export type INotificationProps = Partial<INotification> & {
	onClose?: () => void;
};

export const Notification: FC<INotificationProps> = ({
	message,
	button,
	duration = 'default',
	type,
	onClose
}) => {
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (duration === 'sticky') {
			return;
		}

		const timer = setTimeout(() => {
			onCloseRef.current?.();
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [duration]);

	const color =
		type === 'error' ?
			'bg-accent' :
			type === 'success' ?
				'bg-green-400' :
				'bg-secondary';

	return (
		<div
			className={`flex rounded-8 p-3 relative w-full items-center justify-center text-button transition-transform duration-300 ${color}`}
		>
			{onClose ?
				(
					<div
						className={'flex absolute cursor-pointer'}
						style={{
              top: 5,
              right: 13,
              width: 13,
              height: 13
            }}
						onClick={onClose}
						onKeyPress={handleKeypressWith(onClose)}
						role="button"
						tabIndex={0}
					>
						<CloseIconButton style={{ transform: 'rotate(45deg)' }} />
					</div>
				) :
				null}
			<div className={'flex space-x-4 items-center'}>
				<div className={'bold'}>{message}</div>
				{button}
			</div>
		</div>
	);
};

Notification.displayName = 'Notification';
