import React, { useContext, useRef } from 'react';

import SvgIcon from '@/components/Icon';
import { Modal } from '@/components/Modal/Modal';

import styled from 'styled-components';
import { ConfirmModalContext } from './ConfirmModalContext';
import { Button } from '@/components/Buttons/Button';

export const Container = styled.div`
	display: flex;
	width: 450px;
	min-height: 0;
	flex-direction: column;
	margin: auto;
	background-color: ${({ theme }) => theme.colors.background.dark};
	border-radius: 0.5rem;
`;

export const Header = styled.header`
	position: relative;
	display: flex;
	flex: none;
	justify-content: flex-end;
	align-items: center;
	padding: 0.75rem 1rem;
`;

export const ModalContent = styled.div`
	/* padding: 0 1.5rem; */
	min-height: 8rem;
	display: flex;
	justify-content: center;
`;

const Footer = styled.footer`
	display: flex;
	flex: none;
	justify-content: space-between;
	padding: 0.75rem 1.25rem;
`;

export function ConfirmModal() {
	const modalRef = useRef<HTMLDivElement>(null);
	const { isOpen, close, props } = useContext(ConfirmModalContext);

	return isOpen ? (
		<Modal modalRef={modalRef} onModalClose={close}>
			<Container ref={modalRef}>
				<Header>
					<button
						data-testid="confirm-esc-btn"
						onClick={close}
						title="Close confirmation dialog"
					>
						<SvgIcon color="#fff" name="close" size={32} />
					</button>
				</Header>

				<ModalContent>{props.content}</ModalContent>

				<Footer>
					<Button size="sm" flat onClick={close}>
						<span>Cancel</span>
					</Button>
					<Button size="sm" onClick={props.onConfirm}>
						<span>{props.confirmLabel}</span>
					</Button>
				</Footer>
			</Container>
		</Modal>
	) : null;
}

ConfirmModal.displayName = 'ConfirmModal';
