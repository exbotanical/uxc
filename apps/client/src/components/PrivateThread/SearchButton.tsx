import React, { useState } from 'react';

import { SearchModal } from '@/components/Modal/SearchModal';
import styled from 'styled-components';
import { FlexCol } from '@/styles/Layout';
import { FontSizeBase } from '@/styles/Typography/FontSize';

const SearchButtonContainer = styled.div`
	${FlexCol}
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 75px;
	min-height: 75px;
	padding: 0.75rem;
	border-bottom-width: 2px;
	border-color: ${({ theme }) => theme.colors.primary['1200']};
	background-color: ${({ theme }) => theme.colors.primary['1100']};
`;

const Button = styled.button`
	${FontSizeBase}
	display: flex;
	align-items: center;
	height: 2.25rem;
	width: 100%;
	border-radius: 5px;
	padding: 0.5rem 1rem;
	color: ${({ theme }) => theme.colors.primary['200']};
	background-color: ${({ theme }) => theme.colors.primary['1300']};
	text-transform: none;
	letter-spacing: normal;

	&:focus {
		outline: none;
	}
`;

export function SearchButton() {
	const [isOpen, setIsOpen] = useState(false);
	const close = () => {
		setIsOpen(false);
	};

	return (
		<SearchButtonContainer>
			<Button
				onClick={() => {
					setIsOpen(true);
				}}
				type="button"
			>
				Find or start a conversation
			</Button>

			<SearchModal closeSearch={close} isOpen={isOpen} />
		</SearchButtonContainer>
	);
}
