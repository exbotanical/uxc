import React from 'react';

import type { PropsFromRedux} from '@/state';

import { Notification } from '@/components/Notification/Notification';
import { connector } from '@/state';

type NotificationControllerProps = PropsFromRedux;

function NotificationControllerBase({
	notifications,
	hideNotification
}: NotificationControllerProps & PropsFromRedux) {
	return (
		<div
			className="absolute w-24 flex bottom-0 justify-center mx-auto inset-x-0"
			style={{ zIndex: 1001 }}
		>
			<div className="flex flex-col w-full">
				{notifications.map(({ id, message, duration, ...otherProps }) => (
					<div className="flex mb-3" key={id}>
						<Notification
							duration={duration}
							message={message}
							onClose={() => hideNotification({ id })}
							{...otherProps}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

NotificationControllerBase.displayName = 'NotificationControllerBase';

export const NotificationController = connector(NotificationControllerBase);
