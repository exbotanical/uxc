import styled from 'styled-components'

export const ListItem = styled.li<{ isActiveItem: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: ${({ theme, isActiveItem }) =>
    isActiveItem && theme.colors.background.hover};
  border-radius: 0.125rem;
  color: ${({ theme, isActiveItem }) =>
    isActiveItem ? theme.colors.accent.norm : theme.colors.font.strong};
  transition: color 0.3s, background-color 0.4s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.hover};
  }
`

export const ActiveItemIndicator = styled.div`
  position: absolute;
  z-index: 1;
  left: 0px;
  width: 4px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.interactive.norm};
`
