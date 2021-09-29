import { ChangeEvent, FormEvent } from 'react';

import type { KeyboardEvent } from 'react';

export const handleSubmit = (fn?: Function) => (event: FormEvent) => {
	event.preventDefault();

	if (typeof fn == 'function') {
		fn();
	}
};

export const handleChange =
	(fn: Function) => (event: ChangeEvent<HTMLInputElement>) => {
		fn(event.target.value);
	};

export const handleKeypressWith =
	(callback: Function) => (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key == 'Enter') {
			event.preventDefault();
			callback();
		}
	};
