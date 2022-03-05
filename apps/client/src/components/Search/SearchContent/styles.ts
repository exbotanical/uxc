import styled from 'styled-components';

import { FontSizeLg } from '@/styles/Typography/FontSize';
import { labelLabel } from '@/components/Search/constants';

export const SearchHitSection = styled.section`
	padding-bottom: 1.5rem;
`;

export const SearchSource = styled.div`
	${FontSizeLg}
	margin: 0 1.5rem 1rem;
	padding-top: 1.5rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.font.weak};
`;

export const SearchHitList = styled.ul.attrs({
	'role': 'listbox',
	'aria-labelledby': labelLabel
})`
	margin: 0;
	padding: 0;

	& > li:not(:last-child) {
		margin-bottom: 0.5rem;
	}

	& > li:first-child > a {
		border-top-width: 1px;
	}

	& > li > a {
		border-bottom-width: 1px;
	}
`;

export const ResultsList = styled.ul.attrs({
	'role': 'listbox',
	'aria-labelledby': labelLabel
})`
	margin: 0;
	padding: 0;

	& > li:first-child > a {
		border-top-width: 1px;
	}

	& > li > a {
		border-bottom-width: 1px;
	}
`;

export const NoContent = styled.div`
	padding: 4rem 1.5rem;
	text-align: center;
	color: ${({ theme }) => theme.colors.font.weak};
`;
