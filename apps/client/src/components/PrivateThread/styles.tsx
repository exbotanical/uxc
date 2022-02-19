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

	border-left: ${({ theme, isActiveItem }) =>
		isActiveItem && `4px solid ${theme.colors.interactive.norm}`};

	&:hover {
		background-color: ${({ theme }) => theme.colors.background.hover};
	}
`;
