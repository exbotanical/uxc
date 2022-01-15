import type { ComponentPropsWithoutRef } from 'react';

import React, { forwardRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	rows?: number;
	error?: string;
	transparent?: boolean;
}

/** @todo */
// <svg
// 	xmlns="http://www.w3.org/2000/svg"
// 	width="16"
// 	height="16"
// 	fill="currentColor"
// 	viewBox="0 0 16 16"
// >
// 	<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
// </svg>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, error, transparent, ...props }, ref) => {
		const bg = transparent ? 'bg-transparent' : 'bg-primary-700';
		const ring = error ? 'ring-1 ring-secondary' : '';
		const cn = `w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none ${bg} ${ring} ${className} `;

		return <input className={cn} ref={ref} {...props} />;
	}
);

Input.displayName = 'Input';
