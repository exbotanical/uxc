import React from 'react';
import styled from 'styled-components';

import type { PropsFromRedux } from '@/state';

import { Notification } from '@/components/Notification/Notification';
import { connector } from '@/state';
import { FlexCol } from '@/styles/Layout';

type NotificationControllerProps = PropsFromRedux;

const Container = styled.div`
	${FlexCol}
	position: absolute;
	z-index: 1001;
	right: 0px;
	bottom: 0px;
	left: 0px;
	width: 100%;
	justify-content: center;
	margin-right: auto;
	margin-bottom: 0.75rem;
	margin-left: auto;
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
