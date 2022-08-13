import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/Buttons/Button'
import { FlexCol, RowCenter } from '@/styles/Layout'
import { FontSizeBase, FontSizeXl } from '@/styles/Typography/FontSize'

export const Container = styled.div`
  ${FlexCol}
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const InnerCard = styled.div<{ size: 'lg' | 'sm' }>`
  ${FlexCol}
  position: relative;
  width: 100%;
  max-width: 32rem;
  min-height: ${({ size }) => (size === 'sm' ? 32 : 36)}rem;
  background-color: ${({ theme }) => theme.colors.background.strong};
  border-radius: 0.5rem;
`

export const Form = styled.form`
  ${FlexCol}
  height: 100%;
  padding: 0 1.75rem;
  padding-top: 5rem;
  padding-bottom: 1.5rem;
`

export const FieldCaptionLink = styled.p`
  ${FontSizeBase}
  margin: 0.5rem;

  &:hover {
    text-decoration-line: underline;
  }
`

export const Footer = styled(RowCenter)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.norm};
`

export const CTAButton = styled(Button)`
  margin-top: auto;
  background-color: ${({ theme }) => theme.colors.font.strong};
`

export const SwapModeLink = styled(Link).attrs({
  'data-testid': 'swapmode-button',
})`
  ${FontSizeXl}
  font-weight: 700;
  text-decoration-line: underline;
`
