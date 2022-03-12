import React, { useState } from 'react';
import styled from 'styled-components';

import { SearchModal } from '@/components/Search';
import { FlexCol } from '@/styles/Layout';
import { FontSizeBase } from '@/styles/Typography/FontSize';

const SearchContainer = styled.div`
	${FlexCol}
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 65px;
	min-height: 65px;
	padding: 0.75rem;
	background-color: ${({ theme }) => theme.colors.background.dark};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border.weak};
`;

const Button = styled.button`
	${FontSizeBase}
	display: flex;
	align-items: center;
	height: 2.25rem;
	width: 100%;
	border-radius: 3px;
	padding: 0.5rem 1rem;
	color: ${({ theme }) => theme.colors.font.weak};
	background-color: ${({ theme }) => theme.colors.background.hover} !important;
	text-transform: none;
	letter-spacing: normal;
`;

export function Search() {
	const [isOpen, setIsOpen] = useState(false);
	const close = () => {
		setIsOpen(false);
	};

	return (
		<SearchContainer>
			<Button
				data-testid="uxc-search-btn"
				onClick={() => {
					setIsOpen(true);
				}}
				type="button"
			>
				Find or start a conversation
			</Button>

			<SearchModal closeSearch={close} isOpen={isOpen} />
		</SearchContainer>
	);
}
