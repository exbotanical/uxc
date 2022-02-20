import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import React from 'react';
import styled from 'styled-components';

import type { DefaultTheme, StyledComponent } from 'styled-components';

import { RowCenter } from '@/styles/Layout';
import { FontSizeLg } from '@/styles/Typography/FontSize';

type ButtonAttrs = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export type ButtonProps = Omit<ButtonAttrs, 'ref'> & {
	loading?: boolean;
	icon?: ReactNode;
	transition?: boolean;
};

const StyledButton = styled(RowCenter).attrs({
	as: 'button'
})`
	${FontSizeLg}
	width: 100%;
	outline-offset: 2px;
	font-weight: 700;
	padding: 0.75rem 1.5rem;
	border-radius: 4px;
	transition-property: color, background-color;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 700ms;
	color: ${({ theme }) => theme.colors.font.strong};
	background-color: ${({ theme }) => theme.colors.interactive.norm} !important;

	&:active {
		transform: translateY(0.1px);
		background-color: ${({ theme }) =>
			theme.colors.interactive.active} !important;
	}

	&:disabled {
		background-color: ${({ theme }) =>
			theme.colors.interactive.hover} !important;
		cursor: auto;
	}

	&:hover {
		background-color: ${({ theme }) =>
			theme.colors.interactive.hover} !important;
	}
` as StyledComponent<'button', DefaultTheme>;

const Loading = `opacity: 0;`;

const Normal = `
	display:flex;
	align-items:center;
`;

const ContentContainer = styled.div<{ loadingState: boolean }>`
	${({ loadingState }) => {
		return loadingState ? Loading : Normal;
	}}
`;

const Spinner = styled.span`
	position: absolute;
`;

export function Button({ children, loading = false, ...props }: ButtonProps) {
	return (
		<StyledButton {...props}>
			<ContentContainer loadingState={loading}>{children}</ContentContainer>

			{loading ? <Spinner>@todo</Spinner> : null}
		</StyledButton>
	);
}

Button.displayName = 'Button';
