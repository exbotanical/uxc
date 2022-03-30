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

	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setQuery('');
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<S.Form onSubmit={handleSubmit}>
			<S.SearchLabel>
				<SvgIcon name="search" size={18} />
			</S.SearchLabel>
			<S.SearchInput
				data-testid="search-input"
				onChange={handleChange}
				value={query}
			/>
			<button
				data-testid="search-clear-input-btn"
				onClick={handleClick}
				title="Clear search text"
				type="button"
			>
				<SvgIcon name="close" size={42} />
			</button>
		</S.Form>
	);
}

SearchForm.displayName = 'SearchForm';
