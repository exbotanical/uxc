import React from 'react';

import { UserAvatar } from '@/components/User/UserAvatar';
import type { SearchResult } from '@/components/Friends/FriendsContext';
import SvgIcon from '@/components/Icon';

import * as S from './styles';

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
		<S.ListItem key={user._id}>
			<UserAvatar size="xl" u={user} />

			<S.Username>{user.username}</S.Username>
			<S.UserStatus>user status</S.UserStatus>
			<S.ActionsContainer>
				<S.ActionBubble title="Deny friend request" onClick={denyFriendRequest}>
					<SvgIcon name={'cancel'} size={22} />
				</S.ActionBubble>

				<S.ActionBubble
					title="Approve friend request"
					onClick={approveFriendRequest}
				>
					<SvgIcon name="check" size={22} />
				</S.ActionBubble>
			</S.ActionsContainer>
		</S.ListItem>
	);
}
