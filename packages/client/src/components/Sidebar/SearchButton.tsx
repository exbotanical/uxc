import React from 'react';
import { Input } from '@/components/Fields/Input';

export function SearchButton() {
	return (
		<div className="flex flex-col border-b border-slate-800 bg-primary-800 drop-shadow-2xl shadow-2xl w-full p-2 h-7">
			<Input
				autoComplete="off"
				className="text-primary-100 bg-primary-900 text-sm"
				placeholder={`Find or start a conversation`}
			/>
		</div>
	);
}
