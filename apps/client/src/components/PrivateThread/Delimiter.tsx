import React from 'react';
import styled from 'styled-components';

import { FontSizeSm } from '@/styles/Typography/FontSize';

interface DelimiterProps {
	title: string;
}

const Container = styled.div`
	padding: 1rem;
	justify-content: space-between;
	color: ${({ theme }) => theme.colors.font.strong};
`;

const Label = styled.p`
	${FontSizeSm}
	font-weight: 700;
	text-transform: uppercase;
	white-space: nowrap;
	opacity: 0.75;
`;

export function Delimiter({ title }: DelimiterProps) {
	return (
		<Container>
			<Label>{title}</Label>
		</Container>
	);
}

Delimiter.displayName = 'Delimiter';
