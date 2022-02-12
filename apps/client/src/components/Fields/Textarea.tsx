import type { ComponentPropsWithoutRef } from 'react';

import React, { forwardRef } from 'react';

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
	rows?: number;
	error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, error, ...props }, ref) => {
		return <textarea ref={ref} {...props} />;
	}
);

Textarea.displayName = 'Textarea';
