import styled from 'styled-components';

export const ListItem = styled.li<{ isActiveItem: boolean }>`
	display: flex;
	align-items: center;
	border-radius: 0.125rem;
	width: 100%;
	transition: color 0.3s, background-color 0.4s;
	color: ${({ theme, isActiveItem }) =>
		isActiveItem ? theme.colors.primary['200'] : theme.colors.primary['100']};
	background-color: ${({ theme, isActiveItem }) =>
		isActiveItem && theme.colors.primary['1000']};

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary['1000']};
	}
`;
