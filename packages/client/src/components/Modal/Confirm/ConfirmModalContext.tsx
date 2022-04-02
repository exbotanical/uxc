import React, { createContext, useCallback, useState } from 'react';

interface ConfirmModalContextType {
	isOpen: boolean;
	props: ConfirmModalProps;
	open: (props: ConfirmModalProps) => void;
	close: () => void;
}

interface ConfirmModalProps {
	content: JSX.Element;
	onConfirm: () => void;
	confirmLabel: string;
}

const defaultProps = {
	content: (
		<div>
			<p>Are you sure?</p>
		</div>
	),
	onConfirm: () => {},
	confirmLabel: 'Ok'
};

export const ConfirmModalContext = createContext({} as ConfirmModalContextType);

export function ConfirmModalProvider({ children }: { children: JSX.Element }) {
	const [isOpen, setIsOpen] = useState(false);
	const [props, setProps] = useState<ConfirmModalProps>(defaultProps);

	const open = useCallback(
		(props: ConfirmModalProps) => {
			setProps(props);
			setIsOpen(true);
		},
		[isOpen, setIsOpen, props, setProps]
	);

	const close = useCallback(() => {
		setIsOpen(false);
		setProps(defaultProps);
	}, [isOpen, setIsOpen, props, setProps]);

	const ctx = {
		open,
		close,
		isOpen,
		props
	};

	return (
		<ConfirmModalContext.Provider value={ctx}>
			{children}
		</ConfirmModalContext.Provider>
	);
}

ConfirmModalProvider.displayName = 'ConfirmModalProvider';
