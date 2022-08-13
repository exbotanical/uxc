import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 47.375rem;
  min-height: 0;
  flex-direction: column;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: 0.5rem;
`

export const Header = styled.header`
  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  padding: 0 1rem;
  border-color: ${({ theme }) => theme.colors.border.weak};
  border-bottom-width: 1px;
`

export const CloseButton = styled.button`
  padding: 0.25rem 0.375rem;
  background-color: rgb(71 85 105/1);
  border-radius: 0.375rem;
`

export const ModalContent = styled.div`
  overflow: auto;
  flex: 1 1 auto;
  padding-bottom: 1.5rem;
  scroll-behavior: smooth;
`

export const Footer = styled.footer`
  display: flex;
  flex: none;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-color: ${({ theme }) => theme.colors.border.weak};
  border-top-width: 1px;
`
