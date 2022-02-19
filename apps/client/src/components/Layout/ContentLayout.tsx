import { FlexCol } from '@/styles/Layout';
import { FontSizeXl } from '@/styles/Typography/FontSize';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { ConnectedChatRoom as ChatRoom } from '@/components/ChatRoom';
import { Friends } from '@/components/Friends';
import SvgIcon from '@/components/Icon';

const Container = styled.div`
	${FlexCol}
	align-items: center;
	width: 100%;
	color: ${({ theme }) => theme.colors.font.strong};
	background-color: ${({ theme }) => theme.colors.background.weak};
	border: 1px solid ${({ theme }) => theme.colors.border.weak};
`;

const Header = styled.header`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border: 1px solid ${({ theme }) => theme.colors.border.weak};
	width: 100%;
	padding: 1rem;
	height: 75px;
	min-height: 75px;
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
	border-radius: 4px;
`;

export function ContentLayout() {
	return (
		<Container>
			<Header>
				<SvgIcon size={21} name="people" />
				<HeaderLabel>Friends</HeaderLabel>
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
