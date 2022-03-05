import React, { useContext } from 'react';
import { SearchContext } from '@/components/Search/SearchContext';

import * as S from '@/components/Search/SearchContent/styles';
import { SearchQuery } from '@/components/Search/SearchContent/SearchQuery';
import { SearchHit } from '@/components/Search/SearchContent/SearchHit';

export function SearchContent() {
	const { history, results, query } = useContext(SearchContext);

	if (!!query) {
		return results.length ? (
			<S.SearchHitSection>
				<S.SearchSource>Users</S.SearchSource>

				<S.SearchHitList>
					{results.map((record) => {
						return <SearchHit key={record.id} record={record} />;
					})}
				</S.SearchHitList>
			</S.SearchHitSection>
		) : (
			<S.NoContent>No results for "{query}"</S.NoContent>
		);
	} else {
		return history.length ? (
			<section>
				<S.SearchSource>Recent</S.SearchSource>

				<S.ResultsList>
					{history.map((record) => {
						return <SearchQuery key={record.id} record={record} />;
					})}
				</S.ResultsList>
			</section>
		) : (
			<S.NoContent>No recent searches</S.NoContent>
		);
	}
}

SearchContent.displayName = 'SearchContent';
