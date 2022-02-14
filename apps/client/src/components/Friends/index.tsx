import type { ChangeEvent } from 'react';

import React, { useState } from 'react';

import { Input } from '@/components/Fields/Input';

export function Friends() {
	const [searchText, setSearchText] = useState('');

	const searchOptions = [
		{
			iconName: 'search'
		}
	];

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		setSearchText(value);
	};

	const rawFriends = [
		'Jane Doe',
		'John Doe',
		'Marco Inaros',
		'Naomi Nagata',
		'Amos Burton'
	];

	/** @todo robust impl */
	function naiveSearch(friend: string) {
		const cleanSearchText = searchText.trim().toLowerCase();
		const cleanFriendText = friend.toLowerCase();

		return cleanFriendText.includes(cleanSearchText);
	}

	const filteredFriends = rawFriends.filter(naiveSearch);

	return (
		<div className="flex flex-col flex-shrink">
			<form className="my-12 self-center">
				<Input
					autoComplete="off"
					className="text-primary-200 bg-primary-1300 text-lg"
					label="Search friends"
					maxLength={512}
					onChange={handleChange}
					options={searchOptions}
					placeholder="Search friends"
					value={searchText}
				/>
			</form>

			<ul className="grid grid-cols-4">
				{filteredFriends.map((i, idx) => {
					return (
						<li
							className="flex flex-col justify-center items-center m-8"
							key={idx}
						>
							<div className="rounded-full bg-blue-100 h-20 w-20 mb-2" />
							<h4 className="text-md font-bold text-primary-100">
								{i === 'Jane Doe' ? 'Daedric Court Jester' : 'Daedra'}
							</h4>
							<p className="text-xs font-bold text-primary-200">user status</p>
							<div className="flex justify-evenly my-2 gap-1">
								<div className="rounded-full bg-primary-1200 h-8 w-8" />
								<div className="rounded-full bg-primary-1200 h-8 w-8" />
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
