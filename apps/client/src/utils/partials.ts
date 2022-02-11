import type { KeyboardEvent , ChangeEvent, FormEvent } from 'react';


export const handleSubmit = (fn?: () => void) => (event: FormEvent) => {
	event.preventDefault();

	if (typeof fn == 'function') {
		fn();
	}
};

export const handleChange =
	(fn: (v: string) => void) => (event: ChangeEvent<HTMLInputElement>) => {
		fn(event.target.value);
	};

export const onEnterKeyPressed =
	(fn: () => void) =>
	<T>(event: KeyboardEvent<T>) => {
		if (event.key == 'Enter') {
			event.preventDefault();
			fn();
		}
	};
