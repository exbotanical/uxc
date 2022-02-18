import React from 'react';

import type { PropsFromRedux } from '@/state';

import { Notification } from '@/components/Notification/Notification';
import { connector } from '@/state';
import styled from 'styled-components';
import { FlexCol } from '@/styles/Layout';

type NotificationControllerProps = PropsFromRedux;

const Container = styled.div`
	${FlexCol}
	justify-content: center;
	position: absolute;
	width: 100%;
	bottom: 0px;
	left: 0px;
	right: 0px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 0.75rem;
	z-index: 1001;
`;

function NotificationControllerBase({
	notifications,
	hideNotification
}: NotificationControllerProps & PropsFromRedux) {
	return (
		<Container>
			{notifications.map(({ id, message, duration, ...otherProps }) => (
				<Notification
					duration={duration}
					message={message}
					onClose={() => hideNotification({ id })}
					{...otherProps}
					key={id}
				/>
			))}
		</Container>
	);
}

NotificationControllerBase.displayName = 'NotificationControllerBase';

export const NotificationController = connector(NotificationControllerBase);
