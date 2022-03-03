import React, { createRef, useContext } from 'react';
import styled from 'styled-components';

import { Modal } from '@/components/Modal/Modal';
import SvgIcon from '@/components/Icon';
import { SearchResult } from './SearchResult';

const Container = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 47.375rem;
	display: flex;
	flex-direction: column;
	min-height: 0;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.colors.background.dark};
`;

const Header = styled.header`
	padding: 0 1rem;
	position: relative;
	display: flex;
	flex: none;
	align-items: center;
	border-bottom-width: 1px;
	border-color: ${({ theme }) => theme.colors.border.weak};
`;

const Form = styled.form.attrs({
	role: 'search',
	noValidate: true
})`
	display: flex;
	min-width: 0;
	flex: 1 1 auto;
	align-items: center;
	padding: 0 1rem;
`;

const SearchLabel = styled.label.attrs({
	htmlFor: 'search-input',
	id: 'search'
})`
	height: 1.5rem;
	width: 1.5rem;
	display: flex;
	align-items: center;
`;

const SearchInput = styled.input.attrs({
	'autoComplete': 'off',
	'aria-autocomplete': 'list',
	'aria-labelledby': 'search',
	'id': 'search-input',
	'autoCorrect': 'off',
	'autoCapitalize': 'off',
	'spellCheck': 'false',
	'maxLength': 64,
	'type': 'search',
	'placeholder': 'Search',
	'name': 'Search'
})`
	appearance: none;
	background: transparent;
	height: 3.5rem;
	/* font-size: 1rem; */
	/* color: #0f172a; */
	margin-left: 0.75rem;
	margin-right: 1rem;
	flex: auto;
	min-width: 0;
`;

const CloseButton = styled.button`
	background-color: rgb(71 85 105/1);
	padding: 0.25rem 0.375rem;
	border-radius: 0.375rem;
`;

const ModalContent = styled.div`
	flex: 1 1 auto;
	overflow: auto;
	padding-bottom: 1.5rem;
`;

const ResultsSourceHeader = styled.div`
	margin: 0 1.5rem 1rem;
	padding-top: 1.5rem;
`;

const ResultsList = styled.ul.attrs({
	'role': 'listbox',
	'aria-labelledby': 'search'
})`
	margin: 0;
	padding: 0;
`;

const Footer = styled.footer`
	display: flex;
	flex: none;
	justify-content: flex-end;
	border-top-width: 1px;
	border-color: ${({ theme }) => theme.colors.border.weak};
	padding: 1rem 1.5rem;
`;

export function SearchModal({
	isOpen,
	closeSearch
}: {
	isOpen: boolean;
	closeSearch: () => void;
}) {
	const modalRef = createRef<HTMLDivElement>();

	return isOpen ? (
		<Modal onModalClose={closeSearch} modalRef={modalRef}>
			<Container ref={modalRef}>
				<Header>
					<Form>
						<SearchLabel>
							<SvgIcon name="search" size={18} />
						</SearchLabel>

						<SearchInput />
					</Form>

					<CloseButton onClick={closeSearch}>
						<SvgIcon name="escape" size={18} color="#fff" />
					</CloseButton>
				</Header>

				<ModalContent>
					<section>
						<ResultsSourceHeader>RECENT</ResultsSourceHeader>

						<ResultsList>
							{Array(10)
								.fill(null)
								.map((e, i) => {
									return <SearchResult key={i} />;
								})}
						</ResultsList>
					</section>
				</ModalContent>
				<Footer />
			</Container>
		</Modal>
	) : null;
}

SearchModal.displayName = 'SearchModal';
