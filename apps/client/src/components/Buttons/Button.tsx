import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import React from 'react';

const sizeClassNames = {
	lg: 'py-4 px-6 text-xl rounded-full',
	sm: 'px-2 py-1 text-sm rounded-md'
};

const colorClassNames = {};

export type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	size?: keyof typeof sizeClassNames;
	color?: keyof typeof colorClassNames;
	loading?: boolean;
	icon?: ReactNode;
	transition?: boolean;
	width?: 'regular' | 'wide';
};

export function Button({
	children,
	size = 'lg',
	disabled,
	loading,
	icon,
	className = '',
	width = 'regular',
	...props
}: ButtonProps) {
	const widthClass = width === 'wide' ? 'w-48' : '';

	return (
		<button
			className={`flex items-center justify-center outline-none font-bold active:translate-y-[1px] hover:scale-105 transition duration-700 ease-in-out text-primary-900 bg-primary-100 ${widthClass} ${sizeClassNames[size]} ${className}`}
			disabled={disabled || loading}
			type="button"
			{...props}
		>
			<span className={loading ? 'opacity-0' : 'flex items-center'}>
				{icon ? <span className="mr-2 items-center">{icon}</span> : null}

				{children}
			</span>

			{loading ? <span className="absolute">spinner</span> : null}
		</button>
	);
}

Button.displayName = 'Button';
