import { FlexCol } from '@/styles/Layout';
import type { KeyboardEvent } from 'react';

import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

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

const InnerContainer = styled.div`
	${FlexCol}
	width: 100%;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	position: absolute;
	right: 0.75rem;
	top: 0.75rem;
`;

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
			<InnerContainer>
				<ButtonContainer>
					<button
						onClick={(e) => {
							console.log({ e });
							props.onRequestClose?.(e);
						}}
						type="button"
					>
						CLOSE
					</button>
				</ButtonContainer>

				<div onKeyDown={onKeyDown} role="tab" tabIndex={-1}>
					{children}
				</div>
			</InnerContainer>
		</ReactModal>
	);
}

Modal.displayName = 'Modal';
