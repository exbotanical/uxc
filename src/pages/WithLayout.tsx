import React from 'react';

import type { FC } from 'react';

import { Sidebar } from '@/components/sidebar/Sidebar';
import { NotificationController } from '@/components/notification/NotificationController';
import { CreateChannelModalContainer } from '@/components/modal/CreateChannel';

import '@/styles/landing.scss';
import { Profile, RightPanel } from '@/components/panels/RightPanel';
import { UsersInChannelContainer } from '@/components/channel/users/UsersInChannel';

export const WithLayout: FC<{ isDash: boolean }> = ({ children, isDash }) => {
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
					{isDash ?
						(
							<RightPanel top={<Profile />} bottom={<div />} />
						) :
						(
							<UsersInChannelContainer />
						)}
				</div>
			</div>
		</>
	);
};
