import type { ComponentPropsWithoutRef } from 'react';

import React, { forwardRef } from 'react';
import SvgIcon from '../Icon';

interface OptionConfig {
	iconName: string;
	handleClick?: () => void;
}

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	label: string;
	error?: string;
	options?: OptionConfig[];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, className, error, options, ...props }, ref) => {
		return (
			<div className="bg-primary-1300 flex flex-1 items-center rounded-lg">
				<input
					className={`${className} w-full p-3 bg-primary-1300 rounded-lg text-primary-100 placeholder-primary-200 placeholder-opacity-80 text-xl focus:outline-none `}
					ref={ref}
					{...props}
				/>
				<label className="sr-only">{label}</label>
				<div className="right-12 flex flex-row-reverse fill-current text-primary-100 mr-3">
					{options?.map(({ iconName, handleClick }, idx) => {
						return handleClick ? (
							<button
								className="btn-hover cursor-pointer"
								onClick={handleClick}
								key={idx}
							>
								<SvgIcon name={iconName} dimensions={22} />
							</button>
						) : (
							<SvgIcon name={iconName} dimensions={22} key={idx} />
						);
					})}
				</div>
			</div>
		);
	}
);

Input.displayName = 'Input';
