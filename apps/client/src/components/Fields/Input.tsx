import type { ComponentPropsWithoutRef } from 'react';

import React, { forwardRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, error, ...props }, ref) => {
		return (
			<input
				className={`${className} rounded-lg w-full p-4 autofill:shadow-fill-rowan-700 autofill:text-fill-primary-100 bg-rowan-700 text-primary-100 placeholder-primary-200 placeholder-opacity-80 text-xl focus:outline-none `}
				ref={ref}
				{...props}
			/>
		);
	}
);

Input.displayName = 'Input';
