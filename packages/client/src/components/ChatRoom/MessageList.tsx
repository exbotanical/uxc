import { useQuery } from '@apollo/client'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { ChatMessage } from '@/components/ChatRoom/ChatMessage'
import {
  GET_MESSAGES,
  GET_CURRENT_USER,
  ON_THREAD_MESSAGE_CREATED,
} from '@/services/api/queries'

import { filterMessagesToSender } from './utils'

import type { MessageWithSender, ObjectID, User } from '@uxc/common'

interface MessageListProps {
  threadId: ObjectID
}

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`

export function MessageList({ threadId }: MessageListProps) {
  const location = useLocation()

  const bottomRef = useRef<HTMLDivElement | null>(null)
  const [isScrolledToTop] = useState(false)

  const { data: user } = useQuery<{
    getCurrentUser: User
  }>(GET_CURRENT_USER)

  const { loading, data, error, subscribeToMore } = useQuery<{
    getMessages: MessageWithSender[]
  }>(GET_MESSAGES, {
    variables: {
      threadId,
    },
    fetchPolicy: 'network-only',
  })

  // @todo prevent scroll on edit
  useEffect(() => {
    // if there's a hash, the user was redirected from a search; we don't want the
    // scroll effect to be invoked here
    if (location.hash) {
      window.history.replaceState('', location.hash, location.pathname)
      return
    }

    isScrolledToTop ||
      bottomRef.current?.scrollIntoView({
        block: 'nearest',
        inline: 'start',
      })
  }, [bottomRef, threadId, data?.getMessages, isScrolledToTop, location.hash])

  useEffect(
    () =>
      subscribeToMore<{ onThreadMessageCreated: MessageWithSender[] }>({
        document: ON_THREAD_MESSAGE_CREATED,
        updateQuery: (prev, { subscriptionData }) => {
          if (Object.keys(prev).length === 0) {
            return { getMessages: [] }
          }

          const newMessage = subscriptionData.data.onThreadMessageCreated[0]

          const ret = {
            ...prev,
            getMessages: [
              ...prev.getMessages,
              {
                ...newMessage,
                sender: user?.getCurrentUser || newMessage.sender,
              },
            ],
          }

          return ret
        },
        variables: { threadId },
      }),
    [threadId, subscribeToMore, user?.getCurrentUser],
  )

  // @todo
  if (loading) {
    return null
  }

  // @todo
  if (error) {
    return null
  }

  const messages = filterMessagesToSender(
    data?.getMessages,
    user?.getCurrentUser,
  )

  return (
    <Container data-testid="messages-container">
      {messages.map(message => (
        <ChatMessage key={message._id} {...message} />
      ))}

      <div ref={bottomRef} />
    </Container>
  )
}
