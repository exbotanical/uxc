import type { KeyboardEvent, ChangeEvent, FormEvent } from 'react';

export function handleSubmit(fn?: () => void) {
	return function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (typeof fn == 'function') {
			fn();
		}
	};
}

export function handleChange(fn: (v: string) => void) {
	return function handleChange(e: ChangeEvent<HTMLInputElement>) {
		fn(e.target.value);
	};
}

export function onEnterKeyPressed(fn: <T>(e: KeyboardEvent<T>) => void) {
	return function onEnterKeyPressed<T>(e: KeyboardEvent<T>) {
		if (e.key == 'Enter') {
			fn(e);
		}
	};
}

export function mitigateClickBubble<T>(fn: () => void) {
	return (e: KeyboardEvent<T> | React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();

		fn();
	};
}
