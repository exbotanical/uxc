import { FontSizeXs } from '@/styles/Typography/FontSize';
import React from 'react';
import styled from 'styled-components';

interface UnreadMessagesBadgeProps {
	newMessages: number;
}

const THRESHOLD = 10;

const Container = styled.span<{ size: 'sm' | 'lg' }>`
	${FontSizeXs}
	font-weight: 700;
	position: relative;
	left: 1.75rem;
	bottom: 1.25rem;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	line-height: 1;
	border-radius: 9999px;
	width: ${({ size }) => (size === 'sm' ? 1.25 : 1.75)}rem;
	height: 1.25rem;
	background-color: ${({ theme }) => theme.colors.accent['100']};
`;

export function UnreadMessagesBadge({ newMessages }: UnreadMessagesBadgeProps) {
	if (!newMessages) {
		return null;
	}

	const manyMessages = newMessages > THRESHOLD;
	const formattedCount = manyMessages ? `${THRESHOLD}+` : newMessages;
	const badgeSize = manyMessages ? 'lg' : 'sm';

	return (
		<Container size={badgeSize}>
			<p>{formattedCount}</p>
		</Container>
	);
}
UnreadMessagesBadge.displayName = 'UnreadMessagesBadge';
