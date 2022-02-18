import { FontSizeLg, FontSizeXl } from '@/styles/Typography/FontSize';
import type { ComponentPropsWithoutRef } from 'react';

import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	label: string;
	error?: string;
}

const Container = styled.div`
	position: relative;
`;

const Input = styled.input`
	${FontSizeXl}
	display: block;
	padding: 1rem;
	margin-top: 0.25rem;
	border-radius: 0.5rem;
	width: 100%;
	color: ${({ theme }) => theme.colors.primary['100']};
	background: ${({ theme }) => theme.colors.rowan['700']};

	::placeholder {
		color: ${({ theme }) => theme.colors.primary['200']};
		opacity: 0.8;
	}

	&:focus {
		outline: none;
	}
`;

const Label = styled.label`
	${FontSizeLg}
	padding: 1rem;
	padding-top: 1.25rem;
	position: absolute;
	top: 0px;
	pointer-events: none;
	transition-duration: 300ms;
	transform-origin: -15% -27%;
	color: ${({ theme }) => theme.colors.primary['200']};
`;

export const AdaptiveInput = forwardRef<HTMLInputElement, InputProps>(
	({ id, label, className, error, ...props }, ref) => {
		return (
			<Container className={className}>
				<Input id={id} ref={ref} {...props} />
				<Label htmlFor={id}>{label}</Label>
			</Container>
		);
	}
);

AdaptiveInput.displayName = 'AdaptiveInput';
