import React from 'react';

import { SearchResult } from '@/components/Friends/FriendsContext';

import { UserAvatar } from '@/components/User/UserAvatar';
import styled from 'styled-components';
import { FontSizeXl } from '@/styles/Typography/FontSize';

interface FriendProps {
	user: SearchResult;
	mode: 'cancel' | 'remove';
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const DialogContainer = styled.div`
	display: flex;
	color: white;
	height: 10rem;
	align-items: center;
`;

const Dialog = styled.p`
	${FontSizeXl};
	text-align: center;
	color: ${({ theme }) => theme.colors.font.strong};
`;

export function RemoveFriend({ user, mode }: FriendProps) {
	return (
		<Container>
			<UserAvatar size="2xl" u={user} />
			<DialogContainer>
				{mode === 'remove' ? (
					<Dialog>
						Are you sure you want to remove <mark>{user.username}</mark> from
						your friends?
					</Dialog>
				) : (
					<Dialog>
						Are you sure you want to cancel your friend request to{' '}
						<mark>{user.username}</mark>?
					</Dialog>
				)}
			</DialogContainer>
		</Container>
	);
}
