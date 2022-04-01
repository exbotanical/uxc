import React from 'react';

import * as S from './styles';

import type { SearchResult } from '@/components/Friends/FriendsContext';

import SvgIcon from '@/components/Icon';
import { UserAvatar } from '@/components/User/UserAvatar';

interface PendingFriendProps {
	user: SearchResult;
}

export function RecvPendingFriend({ user }: PendingFriendProps) {
	function approveFriendRequest() {
		// update friend request, update friend hits (via subscription)
		console.log(user._id);
	}

	function denyFriendRequest() {
		// update friend request, update friend hits (via subscription)
		console.log(user._id);
	}

	return (
		<S.ListItem data-testid={`friend-hit-recv-${user._id}`} key={user._id}>
			<UserAvatar size="xl" u={user} />

			<S.Username>{user.username}</S.Username>
			<S.UserStatus>user status</S.UserStatus>
			<S.ActionsContainer>
				<S.ActionBubble onClick={denyFriendRequest} title="Deny friend request">
					<SvgIcon name="cancel" size={22} />
				</S.ActionBubble>

				<S.ActionBubble
					onClick={approveFriendRequest}
					title="Approve friend request"
				>
					<SvgIcon name="check" size={22} />
				</S.ActionBubble>
			</S.ActionsContainer>
		</S.ListItem>
	);
}
