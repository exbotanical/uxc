import type { ChangeEvent } from 'react';

import React, { useContext } from 'react';

import SvgIcon from '../../Icon';

import { SearchContext } from '@/components/Search/SearchContext';
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
			<S.SearchInput
				onChange={handleChange}
				value={query}
				data-testid="uxc-search-input"
			/>
			<button onClick={handleClick} data-testid="uxc-search-clear-input-btn">
				<SvgIcon name="close" size={42} />
			</button>
		</S.Form>
	);
}

SearchForm.displayName = 'SearchForm';
