import type { ComponentPropsWithoutRef } from 'react';

import React from 'react';

export function Hyperlink({
	children,
	className,
	...props
}: ComponentPropsWithoutRef<'button'>) {
	return (
		<button
			className={`text-primary-100 underline text-md ${className}`}
			type="button"
			{...props}
		>
			{children}
		</button>
	);
}

Hyperlink.displayName = 'Hyperlink';
