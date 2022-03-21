import type { KeyboardEvent, ChangeEvent, FormEvent } from 'react';

export function handleSubmit(fn?: () => void) {
	return function (e: FormEvent) {
		e.preventDefault();

		if (typeof fn == 'function') {
			fn();
		}
	};
}

export function handleChange(fn: (v: string) => void) {
	return function (e: ChangeEvent<HTMLInputElement>) {
		fn(e.target.value);
	};
}

export function onEnterKeyPressed(fn: () => void) {
	return function <T>(e: KeyboardEvent<T>) {
		if (e.key == 'Enter') {
			e.preventDefault();
			fn();
		}
	};
}

export function mitigateClickBubble(fn: () => void) {
	return (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();

		fn();
	};
}
