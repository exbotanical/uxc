import React from 'react'

import bg from '@/assets/splash.png'

import * as S from './styles'

export function Wrapper({ content }: { content: React.ReactNode }) {
  return (
    <S.Container
      style={{ backgroundImage: `url(${bg})`, position: 'relative' }}
    >
      <h1>uxc</h1>
      {content}
    </S.Container>
  )
}
