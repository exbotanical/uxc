import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import {
	FontSizeXs,
	FontSizeXl,
	FontSizeSm
} from '@/styles/Typography/FontSize';

import type { ComponentPropsWithoutRef } from 'react';

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
	height: 65px;
	padding: 1rem 1.25rem 0;
	border-radius: 0.25rem;
	width: 100%;
	color: ${({ theme }) => theme.colors.font.strong};
	background-color: ${({ theme }) => theme.colors.field.norm};

	&:disabled {
		background: ${({ theme }) => theme.colors.field.disabled};
	}

	&:hover {
		background: ${({ theme }) => theme.colors.field.hover};
	}

	&:focus {
		/* @todo */
		outline: none;
		box-shadow: 0 0 3px ${({ theme }) => theme.colors.font.strong};
	}

	:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.field.norm}
			inset;
		-webkit-text-fill-color: ${({ theme }) => theme.colors.font.strong};
	}

	:-webkit-autofill:hover,
	:-webkit-autofill:focus {
		-webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.field.hover}
			inset;
	}
`;

const Label = styled.label`
	${FontSizeXl}
	position: absolute;
	top: 50%;
	left: 20px;
	transition: font 0.1s ease, top 0.1s ease, transform 0.1s ease,
		-webkit-transform 0.1s ease, -moz-transform 0.1s ease,
		-o-transform 0.1s ease;
	transform: translateY(-50%);
	color: ${({ theme }) => theme.colors.blue['300']};
`;

const InputWrapper = styled.div<{ hasValue: boolean }>`
	position: relative;

	${Input}:focus + ${Label} {
		${FontSizeXs}
		top: 9px;
		color: ${({ theme }) => theme.colors.blue['300']};
	}

	${Input} + ${Label} {
		${({ hasValue }) => hasValue && `top: 9px;${FontSizeXs}`};
	}
`;

const InputError = styled.p`
	${FontSizeSm}
	white-space: nowrap;
	position: absolute;
	color: ${({ theme }) => theme.colors.error.norm};
	padding: 0.25rem;
`;

export const AdaptiveInput = forwardRef<HTMLInputElement, InputProps>(
	({ id, label, className, error = null, ...props }, ref) => {
		const labelId = v4();

		return (
			<Container>
				<InputWrapper className={className} hasValue={!!props.value}>
					<Input
						hasError={!!error}
						id={id}
						ref={ref}
						aria-labelledby={labelId}
						aria-autocomplete="list"
						autoCorrect="off"
						autoCapitalize="off"
						{...props}
					/>
					<Label htmlFor={id} id={labelId}>
						{label}
					</Label>
				</InputWrapper>
				{!!error ? (
					<InputError data-testid="input-error">{error}</InputError>
				) : null}
			</Container>
		);
	}
);

AdaptiveInput.displayName = 'AdaptiveInput';
