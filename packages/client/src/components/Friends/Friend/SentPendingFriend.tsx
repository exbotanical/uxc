import React, { useContext } from 'react'

import {
  FriendsContext,
  SearchResult,
} from '@/components/Friends/FriendsContext'
import SvgIcon from '@/components/Icon'
import { ConfirmModalContext } from '@/components/Modal/Confirm/ConfirmModalContext'
import { UserAvatar } from '@/components/User/UserAvatar'

import { RemoveFriend } from './RemoveFriend'
import * as S from './styles'

interface PendingFriendProps {
  user: SearchResult
}

export function SentPendingFriend({ user }: PendingFriendProps) {
  const { open } = useContext(ConfirmModalContext)

  const { cancelFriend } = useContext(FriendsContext)

  // @todo disallow cancel and resend over and over
  function cancelFriendRequest() {
    open({
      content: <RemoveFriend mode="cancel" user={user} />,
      confirmLabel: 'Yes, cancel',
      onConfirm: () => {
        // @todo err
        if (!user.requestId) {
          return
        }

        cancelFriend(user.requestId)
      },
    })
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
  )
}
