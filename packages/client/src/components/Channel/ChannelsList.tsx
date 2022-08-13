import React from 'react'
import styled from 'styled-components'

import { Channel } from '@/components/Channel/Channel'

const Container = styled.div`
  display: flex;
  width: 7rem;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.border.norm};
  background-color: ${({ theme }) => theme.colors.background.dark};
  color: white;
`

export function ChannelsList() {
  return (
    <Container>
      <ul>
        <Channel />
        <hr />
        <Channel />
        <Channel />
        <Channel />
      </ul>
    </Container>
  )
}

ChannelsList.displayName = 'ChannelsList'
