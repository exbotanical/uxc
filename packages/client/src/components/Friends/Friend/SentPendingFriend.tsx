import React from 'react';

import * as S from './styles';

import type { SearchResult } from '@/components/Friends/FriendsContext';

import SvgIcon from '@/components/Icon';
import { UserAvatar } from '@/components/User/UserAvatar';

interface PendingFriendProps {
	user: SearchResult;
}

export function SentPendingFriend({ user }: PendingFriendProps) {
	function cancelFriendRequest() {
		// update friend request, update friend hits (via subscription)
		console.log(user._id);
	}

	return (
		<S.ListItem data-testid={`friend-hit-sent-${user._id}`} key={user._id}>
			<UserAvatar size="xl" u={user} />

			<S.Username>{user.username}</S.Username>
			<S.UserStatus>user status</S.UserStatus>
			<S.ActionsContainer>
				<S.ActionBubble
					onClick={cancelFriendRequest}
					title="Cancel friend request"
				>
					<SvgIcon name="cancel" size={22} />
				</S.ActionBubble>
			</S.ActionsContainer>
		</S.ListItem>
	);
}
