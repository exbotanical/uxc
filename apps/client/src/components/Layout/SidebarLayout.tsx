import { useQuery } from '@apollo/client';
import React from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import type { User } from '@uxc/types';

import SvgIcon from '@/components/Icon';
import { Search } from '@/components/PrivateThread/Search';
import { UserStatus } from '@/components/User/UserStatus';
import { GET_CURRENT_USER } from '@/services/api/queries';
import { FlexCol } from '@/styles/Layout';

const Container = styled.aside`
	${FlexCol}
	width: 22rem;
	min-width: 22rem;
	height: 100vh;
	background-color: ${({ theme }) => theme.colors.background.dark};
`;

const Footer = styled.footer`
	height: 71px;
	max-height: 71px;
	border-top: 1px solid ${({ theme }) => theme.colors.border.norm};
	margin-top: auto;
	background-color: ${({ theme }) => theme.colors.background.dark};
	border-radius: 4px;
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

	// @todo
	if (loading) {
		return <>Loading...</>;
	}

	if (error || !data) {
		// @todo logout user else infinite switchback
		return <Navigate replace to="/signin" />;
	}

	return (
		<Container>
			<Search />

			{body}
			<Footer>
				<FooterContainer>
					<UserStatus user={data.getCurrentUser} />
					<button data-testid="settings-btn" id="settings-btn" type="button">
						<SvgIcon color="#979bb0" name="gear" size={22} />
					</button>
				</FooterContainer>
			</Footer>
		</Container>
	);
}
