import React from 'react';

import { Button } from '@/components/Buttons/Button';
import { Input } from '@/components/Fields/Input';
import { Modal } from '@/components/Modal/Modal';
import styled from 'styled-components';
import { FontSizeXl } from '@/theme/Typography/FontSize';

const Form = styled.form`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 1rem;
	width: 100%;

	&:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
`;

const HeaderContainer = styled.header`
	grid-column: span 3 / span 3;
	display: block;
`;

const Header = styled.h1`
	${FontSizeXl}
	margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
	grid-column: span 2 / span 2;
	display: flex;
	height: 100%;
	width: 100%;
`;

const ActionContainer = styled.div`
	grid-column: 1 / -1;

	display: flex;
	align-items: center;

	padding-top: 0.5rem;

	& > * + * {
		margin-left: 0.75rem;
	}
`;
export function SearchModal({
	isOpen,
	closeSearch
}: {
	isOpen: boolean;
	closeSearch: () => void;
}) {
	return (
		<Modal isOpen={isOpen} onRequestClose={closeSearch}>
			<Form>
				<HeaderContainer>
					<Header>Search for channels or DMs</Header>
				</HeaderContainer>

				<InputContainer>
					<Input
						autoComplete="off"
						maxLength={60}
						name="Search"
						label="Search"
					/>
				</InputContainer>

				<ActionContainer>
					<Button onClick={closeSearch} type="button">
						Cancel
					</Button>

					<Button type="submit">Search</Button>
				</ActionContainer>
			</Form>
		</Modal>
	);
}

SearchModal.displayName = 'SearchModal';
