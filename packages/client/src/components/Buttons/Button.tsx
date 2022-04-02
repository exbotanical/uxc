import React, {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	forwardRef,
	ReactNode
} from 'react';
import styled from 'styled-components';

import type { DefaultTheme, StyledComponent } from 'styled-components';

import { RowCenter } from '@/styles/Layout';
import { FontSizeLg, FontSizeSm } from '@/styles/Typography/FontSize';
import type { AllUndef } from '@uxc/common';

type ButtonAttrs = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

type StyledButtonProps = { size: ButtonSize; flat: boolean };

type ButtonSize = 'sm' | 'lg';

export type ButtonProps = Omit<ButtonAttrs, 'ref'> &
	AllUndef<StyledButtonProps> & {
		loading?: boolean;
		icon?: ReactNode;
		transition?: boolean;
	};

const BaseButton = styled(RowCenter).attrs({
	as: 'button'
})<StyledButtonProps>`
	${({ size }) => (size === 'lg' ? FontSizeLg : FontSizeSm)};
	width: 100%;
	max-width: ${({ size }) => (size === 'lg' ? '' : 'max-content')};
	padding: 0.75rem 1.5rem;
	border-radius: 4px;
	font-weight: 700;
	outline-offset: 2px;
	transition-duration: 300ms;
	transition-property: color, background-color;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

	&:active {
		transform: translateY(0.1px);
	}

	&[aria-disabled='true'] {
		cursor: not-allowed;
	}
`;

const StyledButton = styled(BaseButton).attrs({
	as: 'button'
})<StyledButtonProps>`
	background-color: ${({ theme }) => theme.colors.interactive.norm};
	color: ${({ theme }) => theme.colors.font.strong};

	&:active {
		background-color: ${({ theme }) => theme.colors.interactive.active};
	}

	&[aria-disabled='true'] {
		background-color: ${({ theme }) => theme.colors.interactive.hover};
	}

	&:hover {
		background-color: ${({ theme }) => theme.colors.interactive.hover};
	}
` as StyledComponent<'button', DefaultTheme, StyledButtonProps>;

const FlatStyledButton = styled(BaseButton).attrs({
	as: 'button'
})<StyledButtonProps>`
	background-color: inherit;
	/* border: ${({ theme }) => theme.colors.accent.weak} 1px solid; */
	color: ${({ theme }) => theme.colors.accent.weak};

	&:active {
		background-color: ${({ theme }) => theme.colors.accent.hover};
		transform: translateY(0.1px);
	}

	&[aria-disabled='true'] {
		background-color: ${({ theme }) => theme.colors.accent.hover};
		cursor: not-allowed;
	}

	&:hover {
		background-color: ${({ theme }) => theme.colors.accent.hover};
	}
` as StyledComponent<'button', DefaultTheme, StyledButtonProps>;

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
	({ children, size = 'lg', flat = false, loading = false, ...props }, ref) => {
		const ButtonComp = flat ? FlatStyledButton : StyledButton;

		return (
			<ButtonComp ref={ref} {...{ flat, size, ...props }}>
				<ContentContainer loadingState={loading}>{children}</ContentContainer>

				{loading ? <Spinner>@todo</Spinner> : null}
			</ButtonComp>
		);
	}
);

Button.displayName = 'Button';
