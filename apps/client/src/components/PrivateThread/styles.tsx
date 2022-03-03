import styled from 'styled-components';

export const ListItem = styled.li<{ isActiveItem: boolean }>`
	display: flex;
	align-items: center;
	border-radius: 0.125rem;
	width: 100%;
	transition: color 0.3s, background-color 0.4s;
	color: ${({ theme, isActiveItem }) =>
		isActiveItem ? theme.colors.accent.norm : theme.colors.font.strong};
	background-color: ${({ theme, isActiveItem }) =>
		isActiveItem && theme.colors.background.hover};

	&:hover {
		background-color: ${({ theme }) => theme.colors.background.hover};
	}
`;

export const ActiveItemIndicator = styled.div`
	background-color: ${({ theme }) => theme.colors.interactive.norm};
	height: 100%;
	width: 4px;
	position: absolute;
	z-index: 1;
	left: 0px;
`;
