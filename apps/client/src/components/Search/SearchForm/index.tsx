import React, { useContext } from 'react';

import { SearchContext } from '@/components/Search/SearchContext';

import type { ChangeEvent } from 'react';
import SvgIcon from '../../Icon';

import * as S from '@/components/Search/SearchForm/styles';

export function SearchForm() {
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
		<S.Form>
			<S.SearchLabel>
				<SvgIcon name="search" size={18} />
			</S.SearchLabel>
			<S.SearchInput value={query} onChange={handleChange} />
			<button onClick={handleClick}>
				<SvgIcon name="close" size={42} />
			</button>
		</S.Form>
	);
}

SearchForm.displayName = 'SearchForm';
