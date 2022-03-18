import React from 'react';
import styled from 'styled-components';

import { UserAvatar } from './UserAvatar';

import type { User } from '@uxc/common';

import { FontSizeBase } from '@/styles/Typography/FontSize';

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const UsernameLabel = styled.p`
	${FontSizeBase}
	margin-left: 0.5rem;
	color: ${({ theme }) => theme.colors.font.strong};
	font-weight: 600;
`;

export function UserStatus({ user }: { user: User }) {
	return (
		<Container>
			<UserAvatar size="md" u={user} />
			<UsernameLabel>{user.username}</UsernameLabel>
		</Container>
	);
}

UserStatus.displayName = 'UserStatus';
