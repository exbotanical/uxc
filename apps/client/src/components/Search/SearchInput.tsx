import React, { useContext } from 'react';

import { SearchContext } from '@/components/Search/SearchContext';
import * as S from '@/components/Search/styles';

import type { ChangeEvent } from 'react';
import SvgIcon from '../Icon';

export function SearchInput() {
	const { query, setQuery } = useContext(SearchContext);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;

		setQuery(value);
	}

	function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		setQuery('');
	}

	return (
		<>
			<S.SearchInput value={query} onChange={handleChange} />
			<button onClick={handleClick}>
				<SvgIcon name="close" size={42} />
			</button>
		</>
	);
}

SearchInput.displayName = 'SearchInput';
