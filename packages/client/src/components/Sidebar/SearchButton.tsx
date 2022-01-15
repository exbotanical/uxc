import React from 'react';
import { Input } from '@/components/Fields/Input';

export function SearchButton() {
	return (
		<div
			className="flex flex-col justify-center items-center border-b border-slate-800 bg-primary-800 w-full p-2"
			style={{ minHeight: '50px', height: '50px' }}
		>
			<Input
				autoComplete="off"
				className="text-primary-100 bg-primary-900 text-xs h-5"
				placeholder={`Find or start a conversation`}
			/>
		</div>
	);
}
