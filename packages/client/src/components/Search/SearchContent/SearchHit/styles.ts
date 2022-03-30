import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';

import { FontSizeBase } from '@/styles/Typography/FontSize';

export const SearchHit = styled.li.attrs<{ isFocused: boolean }>(
	({ isFocused }) => ({
		'role': 'option',
		'aria-selected': isFocused
	})
)<{ isFocused: boolean }>`
	outline: none;
`;

export const StyledHashLink = styled(HashLink)`
	position: relative;
	display: block;
	padding: 0.75rem 1rem;
	border: none;
	margin-right: 1.5rem;
	margin-left: 1.5rem;
	background-color: ${({ theme }) => theme.colors.background.norm};
	border-radius: 0.5rem;
	color: ${({ theme }) => theme.colors.font.strong};
	cursor: pointer;
	transition: color 0.3s, background-color 0.4s;
	text-decoration: none !important;

	&:focus-visible {
		outline: 1px solid white;
	}

	${SearchHit}:hover &,
	${SearchHit}:focus & {
		background-color: ${({ theme }) => theme.colors.link.norm};
	}
`;

export const SearchHitIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
	border: 1px solid ${({ theme }) => theme.colors.background.norm};
	margin-right: 1rem;
	background-color: ${({ theme }) => theme.colors.background.hover};
	border-radius: 0.375rem;

	${SearchHit}:hover &,
	${SearchHit}:focus & {
		background-color: inherit;
		border: 0.125px solid rgba(255, 255, 255, 0.25);
	}
`;

export const SearchHitContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const SearchHitContent = styled.div`
	z-index: 1;
	display: flex;
	min-width: 0;
	flex: auto;
	flex-direction: column-reverse;
`;

export const SearchHitTitle = styled.span`
	${FontSizeBase}
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const SearchHitAction = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	flex: none;
	margin-left: 0.875rem;
`;
