import styled from 'styled-components'

import { FlexCol } from '@/styles/Layout'
import { FontSizeBase, FontSizeXs } from '@/styles/Typography/FontSize'

export const ListItem = styled.li`
  ${FlexCol}
  align-items: center;
  justify-content: center;
  margin: 2rem;
`

export const Username = styled.h4`
  ${FontSizeBase}
  font-weight: 700;
  margin-top: 0.5rem;
`

export const UserStatus = styled.h5`
  ${FontSizeXs}
  color: ${({ theme }) => theme.colors.font.weak};
  font-weight: 700;
`

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`

export const ActionBubble = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25rem 0.25rem;
  padding: 0.75rem;
  border-radius: 9999px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.hover};
  }
`
