import React, { useState } from 'react';

import { SearchModal } from '../Search/Search';

export function SearchButton() {
	const [isOpen, setIsOpen] = useState(false);
	const close = () => {
		setIsOpen(false);
	};

	return (
		<div
			className="flex flex-col justify-center items-center border-b border-slate-800 bg-primary-800 w-full p-2"
			style={{ minHeight: '50px', height: '50px' }}
		>
			<button
				className="w-full flex items-center py-2 px-4 rounded-8 focus:outline-none text-primary-300 bg-primary-900 text-xs h-5"
				onClick={() => {
					setIsOpen(true);
				}}
			>
				Find or start a conversation
			</button>

			<SearchModal closeSearch={close} isOpen={isOpen} />
		</div>
	);
}
