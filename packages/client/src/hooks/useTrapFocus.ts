import React from 'react';

interface UseTrapFocusProps {
	container: HTMLElement | null;
}

export function useTrapFocus({ container }: UseTrapFocusProps) {
	React.useEffect(() => {
		if (!container) {
			return undefined;
		}

		const focusableElements = container.querySelectorAll<HTMLElement>(
			'a[href]:not([disabled]), button:not([disabled]), input:not([disabled])'
		);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		function trapFocus(e: KeyboardEvent) {
			if (e.key !== 'Tab') {
				return;
			}

			if (e.shiftKey) {
				console.log('HERE');
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				}
			} else if (document.activeElement === lastElement) {
				e.preventDefault();
				firstElement.focus();
			}
		}

		container.addEventListener('keydown', trapFocus);

		return () => {
			container.removeEventListener('keydown', trapFocus);
		};
	}, [container]);
}
