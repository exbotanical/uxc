import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

type ModalComponent = {
	(props: { children: React.ReactNode }): JSX.Element;
};

const Modal: ModalComponent = ({ children }) => {
	const elRef = useRef<HTMLDivElement | null>(null);

	if (!elRef.current) {
		elRef.current = document.createElement('div');
	}

	useEffect(() => {
		if (elRef.current) {
			modalRoot?.appendChild(elRef.current);
		}

		return () => {
			if (elRef.current) {
				modalRoot?.removeChild(elRef.current);
			}
		};
	}, []);

	// return createPortal(
	// 	<div>{children}</div>,
	// 	elRef.current
	// );
};
