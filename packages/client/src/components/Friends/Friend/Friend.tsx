import React from 'react';

import * as S from './styles';

import type { SearchResult } from '@/components/Friends/FriendsContext';

import SvgIcon from '@/components/Icon';
import { UserAvatar } from '@/components/User/UserAvatar';


interface FriendProps {
	user: SearchResult;
}

export function Friend({ user }: FriendProps) {
	function navigateToChat() {
		// if thread exists, take us there; else create new thread w/ user
		console.log(user._id);
	}

	function removeFriend() {
		// display confirmation dialog, then remove friend
		console.log(user._id);
	}

	return (
		<S.ListItem data-testid={`friend-hit-${user._id}`} key={user._id}>
			<UserAvatar size="xl" u={user} />

			<S.Username>{user.username}</S.Username>
			<S.UserStatus>user status</S.UserStatus>
			<S.ActionsContainer>
				<S.ActionBubble onClick={removeFriend} title="Remove friend">
					<SvgIcon name="remove-friend" size={22} />
				</S.ActionBubble>

				<S.ActionBubble onClick={navigateToChat} title="Send a message">
					<SvgIcon name="message" size={18} />
				</S.ActionBubble>
			</S.ActionsContainer>
		</S.ListItem>
	);
}
