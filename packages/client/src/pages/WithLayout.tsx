import React from 'react';
import { UsersInChannelContainer } from '@uxc/client/components/Channel/Users/UsersInChannel';
import { CreateChannelModalContainer } from '@uxc/client/components/Modal/CreateChannel';
import { NotificationController } from '@uxc/client/components/Notification/NotificationController';
import { Profile, RightPanel } from '@uxc/client/components/Panels/RightPanel';
import { Sidebar } from '@uxc/client/components/Sidebar/Sidebar';
import '@uxc/client/styles/landing.scss';
import { useViewportSize } from '@uxc/client/hooks/useViewportSize';

export function WithLayout({
	children,
	isDash
}: {
	// TODO
	children: JSX.Element | JSX.Element[];
	isDash: boolean;
}) {
	const viewport = useViewportSize();

	return (
		<>
			<NotificationController />

			<CreateChannelModalContainer />

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-2 lg:gap-4 p-0 lg:p-2">
				<div className="col-span-1 lg:col-span-3">
					<Sidebar />
				</div>

				<div className="col-span-1 md:col-span-2 lg:col-span-6">{children}</div>

				{viewport > 1 ? (
					<div className="col-span-0 md:col-span-3">
						{isDash ? (
							<RightPanel bottom={<div />} top={<Profile />} />
						) : (
							<UsersInChannelContainer />
						)}
					</div>
				) : null}
			</div>
		</>
	);
}
