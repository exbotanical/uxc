import React from 'react';

import type { FC } from 'react';

import { Notification } from '@/components/notification/Notification';
import { PropsFromRedux, connector } from '@/state';

interface INotificationControllerProps extends PropsFromRedux {}

const NotificationControllerBase: FC<
	PropsFromRedux & INotificationControllerProps
> = ({ notifications, hideNotification }) => {
	return (
		<div
			style={{ zIndex: 1001 }}
			className={
				'absolute w-24 flex w-full fixed bottom-0 justify-center mx-auto inset-x-0'
			}
		>
			<div className={'flex flex-col w-full'}>
				{notifications.map(({ id, message, duration, ...otherProps }) => (
					<div key={id} className={'flex mb-3'}>
						<Notification
							message={message}
							duration={duration}
							onClose={() => hideNotification({ id })}
							{...otherProps}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

NotificationControllerBase.displayName = 'NotificationControllerBase';

export const NotificationController = connector(NotificationControllerBase);
