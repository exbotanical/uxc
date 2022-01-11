import React from 'react';

import { UsersInChannelContainer } from '@/components/Channel/Users/UsersInChannel';
import { CreateChannelModalContainer } from '@/components/Modal/CreateChannel';
import { NotificationController } from '@/components/Notification/NotificationController';
import { Profile, RightPanel } from '@/components/Panels/RightPanel';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import '@/styles/landing.scss';

export function WithLayout({
	children,
	isDash
}: {
	// TODO
	children: JSX.Element | JSX.Element[];
	isDash: boolean;
}) {
	return (
		<>
			<NotificationController />

			<CreateChannelModalContainer />

			<div
				className="grid grid-cols-12 gap-4 pb-4 px-6 pt-6 h-screen"
				style={{ height: '100vh' }}
			>
				<div className="col-span-3">
					<Sidebar />
				</div>

				<div className="col-span-6">{children}</div>

				<div className="col-span-3">
					{isDash ? (
						<RightPanel bottom={<div />} top={<Profile />} />
					) : (
						<UsersInChannelContainer />
					)}
				</div>
			</div>
		</>
	);
}
