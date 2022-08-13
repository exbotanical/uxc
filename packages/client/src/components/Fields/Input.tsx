/* eslint-disable react/no-array-index-key */
import type { ComponentPropsWithoutRef } from 'react'

import React, { forwardRef } from 'react'
import styled from 'styled-components'

import SvgIcon from '@/components/Icon'
import { ScreenReaderOnly } from '@/styles/Layout'
import { FontSizeXl } from '@/styles/Typography/FontSize'

interface OptionConfig {
  iconName: string
  title?: string
  handleClick?: () => void
}

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string
  options?: OptionConfig[]
}

const Container = styled.div`
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: 0.5rem;

  &:hover {
    box-shadow: 0 0 3px ${({ theme }) => theme.colors.font.weak};
    outline: none !important;
  }
`

const StyledInput = styled.input`
  ${FontSizeXl}
  width: 100%;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.font.strong};

  &::placeholder {
    color: ${({ theme }) => theme.colors.font.weak};
    opacity: 0.8;
  }
`

const Label = styled.label`
  ${ScreenReaderOnly}
`

const ButtonContainer = styled.div`
  display: flex;
  margin-right: 0.75rem;
`

const Button = styled.button`
  color: ${({ theme }) => theme.colors.font.strong};
`

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, options, ...props }, ref) => (
    <Container>
      <StyledInput ref={ref} {...props} />
      <Label>{label}</Label>

      <ButtonContainer>
        {options?.map(({ iconName, handleClick, title }, idx) =>
          handleClick ? (
            <Button key={idx} onClick={handleClick} title={title}>
              <SvgIcon name={iconName} size={22} />
            </Button>
          ) : (
            <SvgIcon key={idx} name={iconName} size={22} />
          ),
        )}
      </ButtonContainer>
    </Container>
  ),
)

Input.displayName = 'Input'
