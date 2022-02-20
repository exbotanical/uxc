import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import type { User } from '@uxc/types';

import { ConnectedChatRoom as ChatRoom } from '@/components/ChatRoom';
import { Friends } from '@/components/Friends';
import SvgIcon from '@/components/Icon';
import { GET_CURRENT_USER } from '@/services/api/queries';
import { ThreadsContext } from '@/state/context/ThreadsContext';
import { FlexCol } from '@/styles/Layout';
import { FontSizeXl } from '@/styles/Typography/FontSize';

const Container = styled.div`
	${FlexCol}
	align-items: center;
	width: 100%;
	color: ${({ theme }) => theme.colors.font.strong};
	background-color: ${({ theme }) => theme.colors.background.weak};
`;

const Header = styled.header`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	height: 75px;
	min-height: 75px;
	border-left: 1px solid ${({ theme }) => theme.colors.border.norm};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border.norm};
`;

const HeaderLabel = styled.p`
	${FontSizeXl}
	font-weight: 700;
`;

const ContentContainer = styled.div`
	display: flex;
	justify-content: center;
	overflow: hidden;
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background.norm};
	border-left: 1px solid ${({ theme }) => theme.colors.border.norm};
	border-radius: 4px;
`;

const ItemPadding = `1rem`;
const Item = styled.div`
	padding: ${ItemPadding};
	display: flex;
	align-items: center;
	border-right: 1px solid ${({ theme }) => theme.colors.border.norm};
	height: 100%;

	& > svg {
		margin-right: ${ItemPadding};
	}
`;

export function ContentLayout() {
	const location = useLocation();
	const paths = location.pathname.split('/');
	const threadId = paths[paths.length - 1];

	const { getThreadById } = useContext(ThreadsContext);
	const { data: user } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const thread = getThreadById(threadId);

	const them = thread?.users.find(
		({ _id }) => _id !== user?.getCurrentUser._id
	);

	return (
		<Container>
			<Header>
				<Item>
					<SvgIcon name="people" size={21} />
					<HeaderLabel>{them?.username || 'Friends'}</HeaderLabel>
				</Item>
			</Header>

			<ContentContainer>
				<Routes>
					<Route element={<Friends />} path="/" />
					<Route element={<ChatRoom />} path="/:threadId" />
				</Routes>
			</ContentContainer>
		</Container>
	);
}
