import React, { createContext, createRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { cycleRange } from '@/utils/computed';

const ModalOverlay = styled.div.attrs({
	role: 'dialog',
	ariaModal: true
})`
	position: fixed;
	z-index: 9999;
	top: 0;
	left: 0;
	display: flex;
	width: 100vw;
	height: 100vh;
	flex-direction: column;
	backdrop-filter: blur(4px);

	background-color: rgba(0, 0, 0, 0.8);

	@media (min-width: 640px) {
		padding: 1.5rem;
	}

	@media (min-width: 768px) {
		padding: 10vh;
	}

	@media (min-width: 1024px) {
		padding: 12vh;
	}
`;

interface ModalProps {
	onModalClose: () => void;
	modalRef: React.RefObject<HTMLElement>;
	children: JSX.Element;
}

interface ModalContextType {
	onModalClose: () => void;
}

export const ModalContext = createContext({} as ModalContextType);

/**
 * @todo Disable parent content
 * @todo Cleanup
 */
export function Modal({ onModalClose, modalRef, children }: ModalProps) {
	const overlayRef = createRef<HTMLDivElement>();

	useEffect(() => {
		function listener(e: KeyboardEvent) {
			const fn = keyListenersMap.get(e.key);

			fn?.(e);
		}

		document.addEventListener('keydown', listener);

		return () => {
			document.removeEventListener('keydown', listener);
		};
	});

	function handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (e.target === overlayRef.current) {
			onModalClose();
		}
	}

	function handleTabKey(e: KeyboardEvent) {
		// @todo hoist this up
		const focusableModalElements = Array.from(
			modalRef.current?.querySelectorAll<HTMLElement>(
				'li, button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="search"], select'
			) || []
		);

		if (!focusableModalElements.length) {
			return;
		}
		const currentActive = document.activeElement;
		const currentIdx = focusableModalElements.findIndex(
			(el) => el === currentActive
		);

		const next = cycleRange(
			e.shiftKey ? -1 : 1,
			currentIdx,
			focusableModalElements.length
		);

		const nextEl = focusableModalElements[next];

		nextEl.focus();

		e.preventDefault();
	}

	const keyListenersMap = new Map([
		['Escape', onModalClose],
		['Tab', handleTabKey]
	]);

	useEffect(() => {
		const focusableModalElements =
			modalRef.current?.querySelectorAll<HTMLElement>(
				'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="search"], select'
			);

		if (!focusableModalElements) {
			return;
		}

		const firstElement = focusableModalElements[0];

		firstElement.focus();
	}, [modalRef]);

	// @todo wrap parent prop in useCallback
	const ctx = useMemo(() => ({ onModalClose }), [onModalClose]);

	return createPortal(
		<ModalOverlay
			data-testid="modal-overlay"
			onClick={handleClick}
			ref={overlayRef}
		>
			<ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>
		</ModalOverlay>,
		document.body
	);
}

Modal.displayName = 'Modal';
