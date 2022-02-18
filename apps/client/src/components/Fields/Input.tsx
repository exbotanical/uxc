import { ScreenReaderOnly } from '@/styles/Layout';
import { FontSizeXl } from '@/styles/Typography/FontSize';
import type { ComponentPropsWithoutRef } from 'react';

import React, { forwardRef } from 'react';
import styled from 'styled-components';

import SvgIcon from '@/components/Icon';

interface OptionConfig {
	iconName: string;
	handleClick?: () => void;
}

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	label: string;
	error?: string;
	options?: OptionConfig[];
}

const Container = styled.div`
	display: flex;
	flex: 1 1 0%;
	align-items: center;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.colors.primary['1300']};
`;

const StyledInput = styled.input`
	${FontSizeXl}
	width: 100%;
	padding: 0.75rem;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.colors.primary['1300']};
	color: ${({ theme }) => theme.colors.primary['100']};

	&:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
	}

	&::placeholder {
		color: ${({ theme }) => theme.colors.primary['200']};
		opacity: 0.8;
	}
`;

const Label = styled.label`
	${ScreenReaderOnly}
`;

const ButtonContainer = styled.div`
	display: flex;
	margin-right: 0.75rem;
`;

const Button = styled.button`
	color: ${({ theme }) => theme.colors.primary['100']};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, options, ...props }, ref) => {
		return (
			<Container>
				<StyledInput ref={ref} {...props} />
				<Label>{label}</Label>

				<ButtonContainer>
					{options?.map(({ iconName, handleClick }, idx) => {
						return handleClick ? (
							<Button key={idx} onClick={handleClick} type="button">
								<SvgIcon dimensions={22} name={iconName} />
							</Button>
						) : (
							<SvgIcon dimensions={22} key={idx} name={iconName} />
						);
					})}
				</ButtonContainer>
			</Container>
		);
	}
);

Input.displayName = 'Input';
