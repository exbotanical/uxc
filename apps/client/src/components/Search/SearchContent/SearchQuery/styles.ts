import styled from 'styled-components';

import { FontSizeBase, FontSizeXs } from '@/styles/Typography/FontSize';

export const ListItem = styled.li<{ isActiveRecord: boolean }>`
	position: 'relative';
	cursor: pointer;

	transition: color 0.3s, background-color 0.4s;
	color: ${({ theme, isActiveRecord }) =>
		isActiveRecord ? theme.colors.accent.norm : theme.colors.font.strong};
	background-color: ${({ theme, isActiveRecord }) =>
		isActiveRecord && theme.colors.background.hover};

	&:hover {
		background-color: ${({ theme }) => theme.colors.background.hover};
	}
`;

export const LinkBoundary = styled.a`
	display: block;

	border-color: ${({ theme }) => theme.colors.border.weak};
	padding: 1rem 1.5rem;
	display: flex;
	align-items: center;
`;

export const ListItemContent = styled.div`
	flex: auto;
	display: flex;
	flex-direction: column;
	min-width: 0;
	z-index: 1;
`;

export const LeftAction = styled.div`
	margin-left: 0.875rem;
	flex: none;
`;

export const RightAction = styled.div`
	margin-left: 0.75rem;
	border-left-width: 1px;
	border-color: ${({ theme }) => theme.colors.border.weak};
	padding-left: 0.75rem;
`;

export const Label = styled.span`
	${FontSizeBase}
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height: 1.5rem;
	color: ${({ theme }) => theme.colors.font.weak} !important;
`;

export const Badge = styled.span`
	${FontSizeXs}
	color: ${({ theme }) => theme.colors.font.weak};
	margin-bottom: 0.25rem;
	align-self: flex-start;
	background: ${({ theme }) => theme.colors.background.strong};
	border-radius: 999px;
	padding: 0.15rem 0.375rem;
`;

export const IconButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1.5rem;
	height: 1.5rem;
`;
