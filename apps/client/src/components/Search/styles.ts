import styled from 'styled-components';

export const Container = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 47.375rem;
	display: flex;
	flex-direction: column;
	min-height: 0;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.colors.background.dark};
`;

export const Header = styled.header`
	padding: 0 1rem;
	position: relative;
	display: flex;
	flex: none;
	align-items: center;
	border-bottom-width: 1px;
	border-color: ${({ theme }) => theme.colors.border.weak};
`;

export const CloseButton = styled.button`
	background-color: rgb(71 85 105/1);
	padding: 0.25rem 0.375rem;
	border-radius: 0.375rem;
`;

export const ModalContent = styled.div`
	flex: 1 1 auto;
	overflow: auto;
`;

export const Footer = styled.footer`
	display: flex;
	flex: none;
	justify-content: flex-end;
	border-top-width: 1px;
	border-color: ${({ theme }) => theme.colors.border.weak};
	padding: 1rem 1.5rem;
`;
