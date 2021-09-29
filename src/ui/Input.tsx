/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';

import type { ComponentPropsWithoutRef } from 'react';

interface IInputProps extends ComponentPropsWithoutRef<'input'> {
	textarea?: boolean;
	rows?: number;
	error?: string;
	transparent?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
	({ className, textarea, error, transparent, ...props }, ref) => {
		const bg = transparent ? 'bg-transparent' : 'bg-primary-700';
		const ring = error ? 'ring-1 ring-secondary' : '';
		const cn = `w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none ${bg} ${ring} ${className} `;

		return textarea ?
			(
				<textarea ref={ref as any} className={cn} {...(props as any)} />
			) :
			(
				<input ref={ref} className={cn} {...props} />
			);
	}
);

Input.displayName = 'Input';
