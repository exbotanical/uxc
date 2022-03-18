import styled from 'styled-components';

import { inputLabel, labelLabel } from '../constants';

import { FontSizeLg } from '@/styles/Typography/FontSize';

export const Form = styled.form.attrs({
	role: 'search',
	noValidate: true
})`
	display: flex;
	min-width: 0;
	flex: 1 1 auto;
	align-items: center;
	padding: 0 1rem;
`;

export const SearchLabel = styled.label.attrs({
	htmlFor: inputLabel,
	id: labelLabel
})`
	display: flex;
	width: 1.5rem;
	height: 1.5rem;
	align-items: center;
`;

export const SearchInput = styled.input.attrs({
	'autoComplete': 'off',
	'aria-autocomplete': 'list',
	'aria-labelledby': labelLabel,
	'id': inputLabel,
	'autoCorrect': 'off',
	'autoCapitalize': 'off',
	'spellCheck': 'false',
	'maxLength': 64,
	'type': 'search',
	'placeholder': 'Search',
	'name': 'Search'
})`
	${FontSizeLg}
	min-width: 0;
	height: 3.5rem;
	flex: auto;
	padding: 0;
	margin-right: 1rem;
	margin-left: 0.75rem;
	appearance: none;
	background-color: transparent;
	color: ${({ theme }) => theme.colors.font.weak};

	&:focus {
		outline: none !important;
	}

	::-webkit-search-cancel-button {
		appearance: none;
		appearance: none;
	}
`;
