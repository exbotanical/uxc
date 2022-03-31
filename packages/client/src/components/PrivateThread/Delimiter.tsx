import React, { forwardRef } from 'react';
import styled from 'styled-components';

import SvgIcon from '../Icon';

import { FontSizeSm } from '@/styles/Typography/FontSize';

interface DelimiterProps {
	title: string;
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	color: ${({ theme }) => theme.colors.font.strong};
`;

const Label = styled.p`
	${FontSizeSm}
	font-weight: 700;
	opacity: 0.75;
	text-transform: uppercase;
	white-space: nowrap;
`;

export const Delimiter = forwardRef<HTMLButtonElement, DelimiterProps>(
	({ title }, ref) => {
		return (
			<Container>
				<Label>{title}</Label>
				<button
					data-testid="dm-btn"
					ref={ref}
					type="button"
					title="Create direct message"
				>
					<SvgIcon name="plus" size={24} />
				</button>
			</Container>
		);
	}
);

Delimiter.displayName = 'Delimiter';
