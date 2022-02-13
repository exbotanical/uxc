import React, { useState } from 'react';

import { SearchModal } from '@/components/Modal/SearchModal';

export function SearchButton() {
	const [isOpen, setIsOpen] = useState(false);
	const close = () => {
		setIsOpen(false);
	};

	return (
		<div
			className="flex flex-col justify-center items-center border-b-2 border-primary-1200 bg-primary-1100 w-full p-3"
			style={{ minHeight: '75px', height: '75px' }}
		>
			<button
				className="w-full flex items-center py-2 px-4 rounded-8 focus:outline-none text-primary-200 bg-primary-1300 text-lg h-9"
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
