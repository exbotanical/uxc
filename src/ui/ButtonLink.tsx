import React from 'react';

import type { FC, ComponentPropsWithoutRef } from 'react';

export const ButtonLink: FC<ComponentPropsWithoutRef<'button'>> = ({
	children,
	className,
	...props
}) => {
	return (
		<button
			className={`text-primary-100 underline text-md ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};
