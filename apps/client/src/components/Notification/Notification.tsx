import React, { useEffect } from 'react';
import styled from 'styled-components';

import SvgIcon from '../Icon';

import type { Notification as NotifType } from '@/state/types';

import { onEnterKeyPressed } from '@/utils';

export type NotificationDuration = 'default' | 'sticky';

export type NotificationProps = Partial<NotifType> & {
	onClose?: () => void;
};

const Container = styled.div<{ type: NotifType['type'] }>`
	display: flex;
	width: 24rem;
	align-items: center;
	align-self: center;
	justify-content: space-between;
	padding: 0.75rem;
	margin-bottom: 0.5rem;

	background-color: ${({ theme, type }) => {
		switch (type) {
		case 'error':
		return theme.colors.accent['100'];

		case 'success':
		return theme.colors.accent['600'];

		default:
		return theme.colors.accent['500'];
		}
		}};
	border-radius: 0.375rem;
	transition-duration: 150ms;
	transition-duration: 300ms;
	transition-property: transform;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const AlignedButton = styled.button`
	align-self: flex-end;
`;

export function Notification({
	message,
	duration = 'default',
	type = 'info',
	onClose = () => {}
}: NotificationProps) {
	useEffect(() => {
		if (duration === 'sticky') {
			return;
		}

		const timer = setTimeout(onClose, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [duration, onClose]);

	return (
		<Container type={type}>
			<p>{message}</p>

			<AlignedButton
				onClick={onClose}
				onKeyPress={onEnterKeyPressed(onClose)}
				role="button"
				tabIndex={0}
			>
				<SvgIcon name="close" size={32} />
			</AlignedButton>
		</Container>
	);
}

Notification.displayName = 'Notification';
