import type { ComponentPropsWithoutRef } from 'react';

import React, { forwardRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	label: string;
	error?: string;
}

export const AdaptiveInput = forwardRef<HTMLInputElement, InputProps>(
	({ id, label, className, error, ...props }, ref) => {
		return (
			<div className={`${className} relative focus-within:border-blue-500`}>
				<input
					id={id}
					ref={ref}
					className={`block rounded-lg w-full p-4 autofill:shadow-fill-rowan-700 autofill:text-fill-primary-100 bg-rowan-700 text-primary-100 placeholder-primary-200 placeholder-opacity-80 text-xl focus:outline-none `}
					{...props}
				/>
				<label
					htmlFor={id}
					style={{
						transformOrigin: '-15% -75%'
					}}
					className="absolute top-0 duration-300 text-primary-200 text-opacity-80 text-xl p-4"
				>
					{label}
				</label>
			</div>
		);
	}
);
