import { nullNoop, once } from '@/utils/atomic';
import { useEffect, useRef, useState } from 'react';

export interface Validator {
	(input: string): string | null;
}

interface UseValidationOptions {
	lazy?: boolean;
}

export function useValidation(
	validateImpl: Validator,
	options?: UseValidationOptions
) {
	const lazy = options?.lazy ?? true;

	const [input, setInput] = useState('');
	const [isDirty, setIsDirty] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const validate = useRef(lazy ? nullNoop : validateImpl);

	const setDirty = once(() => {
		setIsDirty(true);
	});

	const setInputProxy = (newInput: string) => {
		setInput(newInput);

		setError(validate.current(newInput));
	};

	useEffect(() => {
		if (isDirty && lazy) {
			validate.current = validateImpl;
			setError(validate.current(input));
		}
	}, [isDirty, setIsDirty]);

	return {
		input,
		error,
		setInput: setInputProxy,
		setDirty
	};
}
