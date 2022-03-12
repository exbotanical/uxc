import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { FontSizeSm } from '@/styles/Typography/FontSize';
import SvgIcon from '../Icon';

interface DelimiterProps {
	title: string;
}

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	color: ${({ theme }) => theme.colors.font.strong};
`;

const Label = styled.p`
	${FontSizeSm}
	font-weight: 700;
	text-transform: uppercase;
	white-space: nowrap;
	opacity: 0.75;
`;

export const Delimiter = forwardRef<HTMLButtonElement, DelimiterProps>(
	({ title }, ref) => {
		return (
			<Container>
				<Label>{title}</Label>
				<button ref={ref} data-testid="dm-btn">
					<SvgIcon name="plus" size={24} />
				</button>
			</Container>
		);
	}
);

Delimiter.displayName = 'Delimiter';
