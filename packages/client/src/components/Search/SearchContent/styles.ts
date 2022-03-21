import styled from 'styled-components';

import { labelLabel } from '@/components/Search/constants';
import { FontSizeLg } from '@/styles/Typography/FontSize';

export const SearchHitSection = styled.section`
	padding-bottom: 1.5rem;
`;

export const SearchSource = styled.div`
	${FontSizeLg}
	padding-top: 1.5rem;
	margin: 0 1.5rem 1rem;
	color: ${({ theme }) => theme.colors.font.weak};
	font-weight: 600;
`;

export const SearchHitList = styled.ul.attrs({
	'role': 'listbox',
	'aria-labelledby': labelLabel
})`
	padding: 0;
	margin: 0;

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

export const SearchHistoryHitList = styled.ul.attrs({
	'role': 'listbox',
	'aria-labelledby': labelLabel
})`
	padding: 0;
	margin: 0;

	& > li:first-child > a {
		border-top-width: 1px;
	}

	& > li > a {
		border-bottom-width: 1px;
	}
`;

export const NoContent = styled.div`
	padding: 4rem 1.5rem;
	color: ${({ theme }) => theme.colors.font.weak};
	text-align: center;
`;
