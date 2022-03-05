import React, { useContext } from 'react';

import { SearchContext } from '@/components/Search/SearchContext';
import * as S from '@/components/Search/styles';

import type { ChangeEvent } from 'react';

export function SearchInput() {
	const { query, setQuery } = useContext(SearchContext);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;

		setQuery(value);
	}

	return <S.SearchInput value={query} onChange={handleChange} />;
}

SearchInput.displayName = 'SearchInput';
