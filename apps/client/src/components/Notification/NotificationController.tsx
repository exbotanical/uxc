import React from 'react';

import type { PropsFromRedux } from '@/state';

import { Notification } from '@/components/Notification/Notification';
import { connector } from '@/state';

type NotificationControllerProps = PropsFromRedux;

function NotificationControllerBase({
	notifications,
	hideNotification
}: NotificationControllerProps & PropsFromRedux) {
	return (
		<div
			className="absolute flex flex-col bottom-0 justify-center mx-auto w-full inset-x-0 mb-3 "
			style={{ zIndex: 1001 }}
		>
			{notifications.map(({ id, message, duration, ...otherProps }) => (
				<Notification
					duration={duration}
					message={message}
					onClose={() => hideNotification({ id })}
					{...otherProps}
					key={id}
				/>
			))}
		</div>
	);
}

NotificationControllerBase.displayName = 'NotificationControllerBase';

export const NotificationController = connector(NotificationControllerBase);
