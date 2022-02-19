import { useQuery } from '@apollo/client';
import React from 'react';
import { Navigate } from 'react-router-dom';

import SvgIcon from '@/components/Icon';
import { UserStatus } from '@/components/User/UserStatus';

import type { User } from '@uxc/types';

import { SearchButton } from '@/components/PrivateThread/SearchButton';
import { GET_CURRENT_USER } from '@/services/api/queries';
import styled from 'styled-components';
import { FlexCol } from '@/styles/Layout';

const Container = styled.aside`
	${FlexCol}
	height: 100vh;
	width: 22rem;
	min-width: 22rem;
	background-color: ${({ theme }) => theme.colors.background.dark};
`;

const Footer = styled.footer`
	margin-top: auto;
	background-color: ${({ theme }) => theme.colors.background.dark};
	border-top: 1px solid ${({ theme }) => theme.colors.border.norm};
	border-radius: 4px;
	height: 75px;
	max-height: 75px;
`;

const FooterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
`;

export function SidebarLayout({ body }: { body: React.ReactNode }) {
	const { loading, data, error } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	if (loading) {
		return <>Loading...</>;
	}

	if (error || !data) {
		// @todo logout user else infinite switchback
		return <Navigate replace to="/signin" />;
	}

	return (
		<Container>
			<SearchButton />

			{body}
			<Footer>
				<FooterContainer>
					<UserStatus user={data.getCurrentUser} />
					<button type="button">
						<SvgIcon size={22} color="#979bb0" name="gear" />
					</button>
				</FooterContainer>
			</Footer>
		</Container>
	);
}
