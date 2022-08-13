import type { ChangeEvent, FormEvent } from 'react'

import React, { useState } from 'react'
import styled from 'styled-components'

import type { SendMessage } from '@/components/ChatRoom'
import { Input } from '@/components/Fields/Input'
import { FlexCol } from '@/styles/Layout'

interface ChatMessageInputProps {
  sendMessage: SendMessage
  name: string
}

const Form = styled.form`
  ${FlexCol}
  width: auto;
`

export function ChatMessageInput({ sendMessage, name }: ChatMessageInputProps) {
  const [message, setMessage] = useState('')

  const chatOptions = {
    options: [
      {
        handleClick: console.log,
        iconName: 'smiley',
        title: 'Search emoji',
      },
    ],
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!message) return

    sendMessage(message)
    setMessage('')
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    setMessage(value)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        autoComplete="off"
        label="Send message"
        maxLength={512}
        onChange={handleChange}
        placeholder={`Send a message to ${name}`}
        value={message}
        {...chatOptions}
      />
    </Form>
  )
}

ChatMessageInput.displayName = 'ChatMessageInput'
