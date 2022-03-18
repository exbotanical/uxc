import React, {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	forwardRef,
	ReactNode
} from 'react';
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
	padding: 0.75rem 1.5rem;
	background-color: ${({ theme }) => theme.colors.interactive.norm} !important;
	border-radius: 4px;
	color: ${({ theme }) => theme.colors.font.strong};
	font-weight: 700;
	outline-offset: 2px;
	transition-duration: 700ms;
	transition-property: color, background-color;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

	&:active {
		background-color: ${({ theme }) =>
			theme.colors.interactive.active} !important;
		transform: translateY(0.1px);
	}

	&[aria-disabled='true'] {
		background-color: ${({ theme }) =>
			theme.colors.interactive.hover} !important;
		cursor: not-allowed;
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, loading = false, ...props }, ref) => {
		return (
			<StyledButton ref={ref} {...props}>
				<ContentContainer loadingState={loading}>{children}</ContentContainer>

				{loading ? <Spinner>@todo</Spinner> : null}
			</StyledButton>
		);
	}
);

Button.displayName = 'Button';
