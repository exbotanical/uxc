import { FontSizeSm } from '@/styles/Typography/FontSize';
import styled from 'styled-components';

export const SearchHit = styled.li.attrs<{ isActiveRecord: boolean }>(
	({ isActiveRecord }) => ({
		'role': 'option',
		'tabIndex': 0,
		'aria-selected': !!isActiveRecord // @todo on hover, too
	})
)<{ isActiveRecord: boolean }>`
	border-radius: 0.5rem;
	padding: 0.75rem 1rem;
	margin-left: 1.5rem;
	margin-right: 1.5rem;
	display: block;
	position: relative;
	border: none;
	cursor: pointer;
	transition: color 0.3s, background-color 0.4s;
	background-color: ${({ theme }) => theme.colors.background.norm};
	color: ${({ theme }) => theme.colors.font.strong};

	&:hover,
	&[aria-selected='true'] {
		background-color: ${({ theme }) => theme.colors.link.norm};
	}
`;

export const SearchHitIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 1rem;
	padding: 0.5rem;
	background-color: ${({ theme }) => theme.colors.background.hover};
	border: 1px solid ${({ theme }) => theme.colors.background.norm};

	border-radius: 0.375rem;

	${SearchHit}:hover & {
		background-color: ${({ theme }) => theme.colors.link.norm};
		border: 0.125px solid rgba(255, 255, 255, 0.25);
	}

	${SearchHit}[aria-selected=true] & {
		background-color: ${({ theme }) => theme.colors.link.norm};
		border: 0.125px solid rgba(255, 255, 255, 0.25);
	}
`;

export const SearchHitContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const SearchHitContent = styled.div`
	flex: auto;
	display: flex;
	flex-direction: column-reverse;
	min-width: 0;
	z-index: 1;
`;

export const SearchHitTitle = styled.span`
	${FontSizeSm}
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const SearchHitAction = styled.div`
	height: 1.5rem;
	width: 1.5rem;
	margin-left: 0.875rem;
	flex: none;
`;
