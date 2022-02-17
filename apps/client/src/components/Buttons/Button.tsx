import { RowCenter } from '@/theme/Layout';
import { FontSizeXl } from '@/theme/Typography/FontSize';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import React from 'react';
import styled from 'styled-components';
import type { DefaultTheme, StyledComponent } from 'styled-components';

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
	${FontSizeXl}
	width: 12rem;
	outline: 2px solid transparent;
	outline-offset: 2px;
	font-weight: 700;
	padding: 1rem 1.5rem;
	border-radius: 9999px;
	transition-property: color, background-color, border-color,
		text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
		backdrop-filter;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 700ms;
	color: ${({ theme }) => theme.colors.primary['900']};
	background-color: ${({ theme }) => theme.colors.primary['100']};

	&:active {
		transform: translateY(1px);
	}

	&:hover {
		transform: scale(1.05);
	}
` as StyledComponent<'button', DefaultTheme, {}, never>;

const Loading = `opacity: 0;`;

const Normal = `
	display:flex;
	align-items:center;
`;

const ContentContainer = styled.span<{ loading: boolean }>`
	${({ loading }) => (loading ? Loading : Normal)}
`;

const Spinner = styled.span`
	position: absolute;
`;

export function Button({
	children,
	disabled,
	loading = false,
	...props
}: ButtonProps) {
	return (
		<StyledButton disabled={!!disabled || !!loading} {...props}>
			<ContentContainer loading={loading}>{children}</ContentContainer>

			{loading ? <Spinner>@todo</Spinner> : null}
		</StyledButton>
	);
}

Button.displayName = 'Button';
