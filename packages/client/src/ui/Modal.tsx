import type { KeyboardEvent } from 'react';

import React from 'react';
import ReactModal from 'react-modal';

import { CloseIconButton } from './CloseIconButton';

const modalStyles = {
	default: {
		content: {
			backgroundColor: '#171926',
			border: 'none',
			borderRadius: 8,
			bottom: 'auto',
			left: '50%',
			marginRight: '-50%',
			maxHeight: '80vh',
			maxWidth: 530,
			padding: '40px 40px 40px 40px',
			right: 'auto',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			width: '90%'
		},
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.8)',
			zIndex: 1000
		}
	},
	userPreview: {
		content: {
			backgroundColor: "theme('color.primary.900')",
			border: 'none',
			borderRadius: 8,
			bottom: 'auto',
			left: '50%',
			marginRight: '-50%',
			maxHeight: '80vh',
			maxWidth: 435,
			padding: 0,
			right: 'auto',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			width: '90%'
		},
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.8)',
			zIndex: 1000
		}
	}
};

export function Modal({
	children,
	variant = 'default',
	...props
}: ReactModal['props'] & { variant?: keyof typeof modalStyles }) {
	const onKeyDown = (event: KeyboardEvent) => {
		const currentActive = document.activeElement;

		if (event.key === 'ArrowLeft') {
			(currentActive?.previousElementSibling as HTMLElement).focus();
		} else if (event.key === 'ArrowRight') {
			(currentActive?.nextElementSibling as HTMLElement).focus();
		}
	};

	return (
		<ReactModal
			shouldCloseOnEsc
			shouldFocusAfterRender
			style={modalStyles[variant]}
			{...props}
		>
			<div className="flex flex-col w-full">
				<div className="flex justify-end absolute right-3 top-3">
					<button
						className="p-1 text-primary-100"
						data-testid="close-modal"
						onClick={(e) => props.onRequestClose?.(e)}
						type="button"
					>
						<CloseIconButton className="transform rotate-45" />
					</button>
				</div>

				<div
					className="focus:outline-none"
					onKeyDown={onKeyDown}
					role="tab"
					tabIndex={-1}
				>
					{children}
				</div>
			</div>
		</ReactModal>
	);
}

Modal.displayName = 'Modal';
