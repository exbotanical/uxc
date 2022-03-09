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
	height: 1.5rem;
	width: 1.5rem;
	display: flex;
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
	appearance: none;
	background-color: transparent;
	height: 3.5rem;
	color: ${({ theme }) => theme.colors.font.weak};
	margin-left: 0.75rem;
	margin-right: 1rem;
	flex: auto;
	min-width: 0;
	padding: 0;

	&:focus {
		outline: none !important;
	}

	::-webkit-search-cancel-button {
		-webkit-appearance: none;
		appearance: none;
	}
`;
