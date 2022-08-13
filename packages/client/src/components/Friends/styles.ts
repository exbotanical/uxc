import styled from 'styled-components'

import { FlexCol } from '@/styles/Layout'

export const Container = styled.div`
  ${FlexCol}
  flex-shrink: 1;
`

export const Form = styled.form`
  align-self: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
`

export const ListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`
