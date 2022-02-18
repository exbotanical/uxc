import React from 'react';

import { UserAvatar } from './UserAvatar';

import type { User } from '@uxc/types';
import styled from 'styled-components';
import { FontSizeBase } from '@/styles/Typography/FontSize';

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const UsernameLabel = styled.p`
	${FontSizeBase}
	font-weight: 600;
	margin-left: 0.5rem;
	color: ${({ theme }) => theme.colors.primary['100']};
`;

export function UserStatus({ user }: { user: User }) {
	return (
		<Container>
			<UserAvatar size="lg" u={user} />
			<UsernameLabel>{user.username}</UsernameLabel>
		</Container>
	);
}

UserStatus.displayName = 'UserStatus';
