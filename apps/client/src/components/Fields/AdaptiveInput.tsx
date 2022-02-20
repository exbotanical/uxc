import type { ComponentPropsWithoutRef } from 'react';

import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { FontSizeXs, FontSizeXl } from '@/styles/Typography/FontSize';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	label: string;
	error?: boolean;
}

const Container = styled.div`
	position: relative;
`;

const Input = styled.input<{ hasError: boolean }>`
	${FontSizeXl}
	${({ theme, hasError }) =>
		hasError &&
		`outline: solid 1px ${theme.colors.accent['900']};outline-offset: -2px;`}
	padding: 0.75rem;
	margin-top: 0.25rem;
	border-radius: 0.25rem;
	width: 100%;
	color: ${({ theme }) => theme.colors.font.strong};
	background: ${({ theme }) => theme.colors.field.norm};

	&::placeholder {
		color: ${({ theme }) => theme.colors.font.weak};
		opacity: 0.8;
	}

	&:disabled {
		background: ${({ theme }) => theme.colors.field.disabled};
	}

	&:hover {
		background: ${({ theme }) => theme.colors.field.hover};
	}

	&:focus {
		outline: none !important;
		box-shadow: 0 0 3px ${({ theme }) => theme.colors.font.strong};
	}
`;

const Label = styled.label`
	${FontSizeXs}
	padding: 1rem;
	position: absolute;
	bottom: 36px;
	left: -10px;
	color: ${({ theme }) => theme.colors.blue['300']};

	// @todo
	${Input}:active {
		color: ${({ theme }) => theme.colors.blue['500']};
	}
`;

export const AdaptiveInput = forwardRef<HTMLInputElement, InputProps>(
	({ id, label, className, error = false, ...props }, ref) => {
		return (
			<Container className={className}>
				<Input hasError={error} id={id} ref={ref} {...props} />
				<Label htmlFor={id}>{label}</Label>
			</Container>
		);
	}
);

AdaptiveInput.displayName = 'AdaptiveInput';
