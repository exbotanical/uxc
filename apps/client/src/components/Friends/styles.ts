import styled from 'styled-components';

import { FlexCol } from '@/styles/Layout';
import { FontSizeBase, FontSizeXs } from '@/styles/Typography/FontSize';

export const Container = styled.div`
	${FlexCol}
	flex-shrink: 1;
`;

export const Form = styled.form`
	align-self: center;
	margin-top: 3rem;
	margin-bottom: 3rem;
`;

export const ListContainer = styled.ul`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
`;

export const ListItem = styled.li`
	${FlexCol}
	align-items: center;
	justify-content: center;
	margin: 2rem;
`;

export const Avatar = styled.div`
	width: 5rem;
	height: 5rem;
	margin-bottom: 0.5rem;
	background-color: ${({ theme }) => theme.colors.blue['100']};
	border-radius: 9999px;
`;

export const Username = styled.h4`
	${FontSizeBase}
	font-weight: 700;
`;

export const UserStatus = styled.h5`
	${FontSizeXs}
	color: ${({ theme }) => theme.colors.font.weak};
	font-weight: 700;
`;

export const ActionsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	gap: 0.25rem;
`;

export const ActionBubble = styled.div`
	width: 2rem;
	height: 2rem;
	background-color: ${({ theme }) => theme.colors.accent.norm};
	border-radius: 9999px;
`;
