import React from 'react';

import { Button } from '@/components/Buttons/Button';
import { Input } from '@/components/Fields/Input';
import { Modal } from '@/components/Modal/Modal';

export function SearchModal({
	isOpen,
	closeSearch
}: {
	isOpen: boolean;
	closeSearch: () => void;
}) {
	return (
		<Modal isOpen={isOpen} onRequestClose={closeSearch}>
			<form className="grid grid-cols-3 gap-4 focus:outline-none w-full">
				<div className="col-span-3 block">
					<h4 className="mb-2 text-primary-100">Search for channels or DMs</h4>
				</div>

				<div className="flex h-full w-full col-span-2">
					<Input
						autoComplete="off"
						className="rounded-8 bg-primary-700 h-6"
						maxLength={60}
						name="name"
					/>
				</div>

				<div className="flex pt-2 space-x-3 col-span-full items-center">
					<Button color="primary-300" onClick={closeSearch} type="button">
						Cancel
					</Button>

					<Button className="mr-3" type="submit">
						Search
					</Button>
				</div>
			</form>
		</Modal>
	);
}

SearchModal.displayName = 'SearchModal';
