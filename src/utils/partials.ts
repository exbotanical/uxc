import { ChangeEvent, FormEvent } from 'react';

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
