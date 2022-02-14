import React from 'react';

interface DelimiterProps {
	title: string;
	className?: string;
}

export function Delimiter({ title, className = '' }: DelimiterProps) {
	return (
		<div
			className={`flex justify-between items-center text-primary-100 p-4 ${className}`}
		>
			<p className="whitespace-nowrap font-bold text-sm opacity-75 uppercase">
				{title}
			</p>
		</div>
	);
}

Delimiter.displayName = 'Delimiter';
