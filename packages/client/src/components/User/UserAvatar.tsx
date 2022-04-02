import React from 'react';
import styled from 'styled-components';

import { UnreadMessagesBadge } from '../Badges/UnreadMessages';

import type { User } from '@uxc/common';

import { StatusIndicator } from '@/components/Badges/StatusIndicator';

type Size = keyof typeof SizeMap;
interface UserCardProps {
	size: Size;
	u: User;
	withIndicator?: boolean;
	newMessagesCount?: number;
}

const SizeMap = {
	'sm': '30px',
	'md': '40px',
	'lg': '50px',
	'xl': '75px',
	'2xl': '125px'
};

const defaultAvatar = new URL('../../assets/gravatar.png', import.meta.url)
	.href;

const Container = styled.div<{ size: Size }>`
	position: relative;
	width: ${({ size }) => SizeMap[size]};
	height: ${({ size }) => SizeMap[size]};
	margin-bottom: 0.25rem;
`;

const RoundedImg = styled.img`
	border-radius: 9999px;
`;

const IndicatorContainer = styled.div`
	position: absolute;
	border-color: ${({ theme }) => theme.colors.interactive.norm};
`;

export function UserAvatar({
	u,
	size = 'md',
	withIndicator = true,
	newMessagesCount = 0
}: UserCardProps) {
	return (
		<Container size={size}>
			<RoundedImg
				alt={u.username ? `${u.username}'s avatar` : 'your avatar'}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = defaultAvatar;
				}}
				src={u.userImage || defaultAvatar}
			/>

			{withIndicator ? (
				<IndicatorContainer>
					{newMessagesCount > 0 ? (
						<UnreadMessagesBadge newMessages={newMessagesCount} />
					) : (
						<StatusIndicator size={size} />
					)}
				</IndicatorContainer>
			) : null}
		</Container>
	);
}

UserAvatar.displayName = 'UserAvatar';
