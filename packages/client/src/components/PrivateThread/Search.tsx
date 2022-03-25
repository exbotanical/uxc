import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { SearchContext } from '../Search/SearchContext';

import { SearchModal } from '@/components/Search';
import { FlexCol } from '@/styles/Layout';
import { FontSizeBase } from '@/styles/Typography/FontSize';

const SearchContainer = styled.div`
	${FlexCol}
	width: 100%;
	height: 65px;
	min-height: 65px;
	align-items: center;
	justify-content: center;
	padding: 0.75rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border.weak};
	background-color: ${({ theme }) => theme.colors.background.dark};
`;

const Button = styled.button`
	${FontSizeBase}
	display: flex;
	width: 100%;
	height: 2.25rem;
	align-items: center;
	padding: 0.5rem 1rem;
	background-color: ${({ theme }) => theme.colors.background.hover} !important;
	border-radius: 3px;
	color: ${({ theme }) => theme.colors.font.weak};
	letter-spacing: normal;
	text-transform: none;
`;

export function Search() {
	const { setIsOpen } = useContext(SearchContext);

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

			<SearchModal />
		</SearchContainer>
	);
}
