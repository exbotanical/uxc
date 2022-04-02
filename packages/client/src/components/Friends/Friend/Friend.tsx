import React, { useContext } from 'react';

import * as S from './styles';

import {
	FriendsContext,
	SearchResult
} from '@/components/Friends/FriendsContext';

import SvgIcon from '@/components/Icon';
import { UserAvatar } from '@/components/User/UserAvatar';
import { ConfirmModalContext } from '@/components/Modal/Confirm/ConfirmModalContext';
import { RemoveFriend } from './RemoveFriend';
import { ThreadsContext } from '@/state/context/ThreadsContext';
import { useNavigate } from 'react-router-dom';

interface FriendProps {
	user: SearchResult;
}

export function Friend({ user }: FriendProps) {
	const { open } = useContext(ConfirmModalContext);
	const { removeFriend } = useContext(FriendsContext);
	const { threads } = useContext(ThreadsContext);

	const navigate = useNavigate();

	function navigateToChat() {
		const threadId = threads.find(({ users }) => {
			return users[0]._id === user._id || users[1]._id === user._id;
		})?._id;

		if (threadId) {
			navigate(threadId);
		}

		// @todo create new thread
	}

	function removeFriendProxy() {
		open({
			content: <RemoveFriend user={user} mode="remove" />,
			confirmLabel: 'Yes, remove',
			onConfirm: () => {
				removeFriend(user._id);
			}
		});
	}

	return (
		<S.ListItem data-testid={`friend-hit-${user._id}`} key={user._id}>
			<UserAvatar size="xl" u={user} />

			<S.Username>{user.username}</S.Username>
			<S.UserStatus>user status</S.UserStatus>
			<S.ActionsContainer>
				<S.ActionBubble onClick={removeFriendProxy} title="Remove friend">
					<SvgIcon name="remove-friend" size={22} />
				</S.ActionBubble>

				<S.ActionBubble onClick={navigateToChat} title="Send a message">
					<SvgIcon name="message" size={18} />
				</S.ActionBubble>
			</S.ActionsContainer>
		</S.ListItem>
	);
}
