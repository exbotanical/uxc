import type { ComponentPropsWithoutRef } from 'react';

import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import {
	FontSizeXs,
	FontSizeXl,
	FontSizeSm
} from '@/styles/Typography/FontSize';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	label: string;
	error?: string | null;
}

const Container = styled.div`
	position: relative;
	padding-bottom: 2.25rem;
`;

const Input = styled.input.attrs<{ hasError: boolean }>(({ hasError }) => ({
	'aria-invalid': !!hasError
}))<{ hasError: boolean }>`
	${FontSizeXl}
	${({ theme, hasError }) =>
		hasError && `border-bottom: solid 4px ${theme.colors.error.norm}`};
	width: 100%;
	height: 65px;
	padding: 1rem 1.25rem 0;
	background-color: ${({ theme }) => theme.colors.field.norm};
	border-radius: 0.25rem;
	color: ${({ theme }) => theme.colors.font.strong};

	&:disabled {
		background-color: ${({ theme }) => theme.colors.field.disabled};
	}

	&:hover {
		background-color: ${({ theme }) => theme.colors.field.hover};
	}

	&:focus {
		box-shadow: 0 0 3px ${({ theme }) => theme.colors.font.strong};
		/* @todo */
		outline: none;
	}

	:-webkit-autofill {
		box-shadow: 0 0 0 40px ${({ theme }) => theme.colors.field.norm} inset;
		caret-color: ${({ theme }) => theme.colors.font.strong};
		-webkit-text-fill-color: ${({ theme }) => theme.colors.font.strong};
	}

	:-webkit-autofill:hover,
	:-webkit-autofill:focus {
		box-shadow: 0 0 0 40px ${({ theme }) => theme.colors.field.hover} inset;
	}
`;

const Label = styled.label`
	${FontSizeXl}
	position: absolute;
	top: 50%;
	left: 20px;
	color: ${({ theme }) => theme.colors.blue['300']};
	transform: translateY(-50%);
	transition: font 0.3s ease, top 0.3s ease, transform 0.3s ease,
		-webkit-transform 0.3s ease, -moz-transform 0.3s ease,
		-o-transform 0.3s ease;
`;

const InputWrapper = styled.div<{ hasValue: boolean }>`
	position: relative;

	${Input}:focus + ${Label} {
		${FontSizeXs}
		top: 9px;
		color: ${({ theme }) => theme.colors.blue['300']};
	}

	${Input} + ${Label} {
		${({ hasValue }) => hasValue && `top: 9px;${FontSizeXs}`}
	}
`;

const InputError = styled.p`
	${FontSizeSm}
	position: absolute;
	padding: 0.25rem;
	color: ${({ theme }) => theme.colors.error.norm};
	white-space: nowrap;
`;

export const AdaptiveInput = forwardRef<HTMLInputElement, InputProps>(
	({ id, label, className, error = null, ...props }, ref) => {
		const labelId = v4();

		return (
			<Container>
				<InputWrapper className={className} hasValue={!!props.value}>
					<Input
						aria-labelledby={labelId}
						autoCapitalize="off"
						autoCorrect="off"
						hasError={!!error}
						id={id}
						ref={ref}
						{...props}
					/>
					<Label htmlFor={id} id={labelId}>
						{label}
					</Label>
				</InputWrapper>
				{error ? (
					<InputError data-testid={`${id}-error`}>{error}</InputError>
				) : null}
			</Container>
		);
	}
);

AdaptiveInput.displayName = 'AdaptiveInput';
