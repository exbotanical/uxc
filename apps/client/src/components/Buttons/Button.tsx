import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import React from 'react';

const sizeClassNames = {
	large: 'py-2 px-6 text-sm rounded-lg',
	small: 'px-2 py-1 text-sm rounded-md',
	tiny: 'px-1 text-sm rounded-5'
};

const colorClassNames = {
	'accent-secondary':
		'text-button bg-secondary hover:bg-secondary-washed-out disabled:text-secondary-washed-out',
	'primary':
		'text-button bg-accent transition duration-200 ease-in-out hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-accent-hover',
	'primary-300':
		'text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300',
	'secondary':
		'text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300',
	'secondary-dark':
		'text-button bg-primary-800 hover:bg-primary-600 disabled:text-primary-300',
	'transparent': 'text-button bg-transparent'
};

export type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	size?: keyof typeof sizeClassNames;
	color?: keyof typeof colorClassNames;
	loading?: boolean;
	icon?: ReactNode;
	transition?: boolean;
};

export function Button({
	children,
	size = 'large',
	color = 'primary',
	disabled,
	loading,
	icon,
	className = '',
	...props
}: ButtonProps) {
	return (
		<button
			className={`flex items-center justify-center outline-none font-bold active:translate-y-[2px] ${sizeClassNames[size]} ${colorClassNames[color]} ${className}`}
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
