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
				data-testid="uxc-search-input"
				onChange={handleChange}
				value={query}
			/>
			<button
				data-testid="uxc-search-clear-input-btn"
				onClick={handleClick}
				type="button"
				title="Clear search text"
			>
				<SvgIcon name="close" size={42} />
			</button>
		</S.Form>
	);
}

SearchForm.displayName = 'SearchForm';
