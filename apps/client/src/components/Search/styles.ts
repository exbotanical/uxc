import styled from 'styled-components';

import { FontSizeLg } from '@/styles/Typography/FontSize';
import { inputLabel, labelLabel } from './constants';

export const Container = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 47.375rem;
	display: flex;
	flex-direction: column;
	min-height: 0;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.colors.background.dark};
`;

export const Header = styled.header`
	padding: 0 1rem;
	position: relative;
	display: flex;
	flex: none;
	align-items: center;
	border-bottom-width: 1px;
	border-color: ${({ theme }) => theme.colors.border.weak};
`;

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
	background: transparent;
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
`;

export const CloseButton = styled.button`
	background-color: rgb(71 85 105/1);
	padding: 0.25rem 0.375rem;
	border-radius: 0.375rem;
`;

export const ModalContent = styled.div`
	flex: 1 1 auto;
	overflow: auto;
`;

export const Footer = styled.footer`
	display: flex;
	flex: none;
	justify-content: flex-end;
	border-top-width: 1px;
	border-color: ${({ theme }) => theme.colors.border.weak};
	padding: 1rem 1.5rem;
`;
