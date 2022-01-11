import type { ComponentPropsWithoutRef } from 'react';

import React, { forwardRef } from 'react';

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
	rows?: number;
	error?: string;
	transparent?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, error, transparent, ...props }, ref) => {
		const bg = transparent ? 'bg-transparent' : 'bg-primary-700';
		const ring = error ? 'ring-1 ring-secondary' : '';
		const cn = `w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none ${bg} ${ring} ${className} `;

		return <textarea className={cn} ref={ref} {...props} />;
	}
);

Textarea.displayName = 'Textarea';
