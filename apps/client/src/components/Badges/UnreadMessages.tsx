import React from 'react';
import styled from 'styled-components';

import { FontSizeXs } from '@/styles/Typography/FontSize';

interface UnreadMessagesBadgeProps {
	newMessages: number;
}

const THRESHOLD = 10;

const Container = styled.span<{ size: 'lg' | 'sm' }>`
	${FontSizeXs}
	position: relative;
	bottom: 1.25rem;
	left: 1.75rem;
	display: inline-flex;
	width: ${({ size }) => (size === 'sm' ? 1.25 : 1.75)}rem;
	height: 1.25rem;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.accent['100']};
	border-radius: 9999px;
	font-weight: 700;
	line-height: 1;
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
