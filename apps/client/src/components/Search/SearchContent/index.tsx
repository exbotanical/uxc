import React, { useContext } from 'react';

import { SearchHit } from '@/components/Search/SearchContent/SearchHit';
import { SearchQuery } from '@/components/Search/SearchContent/SearchQuery';
import * as S from '@/components/Search/SearchContent/styles';
import { SearchContext } from '@/components/Search/SearchContext';


export function SearchContent() {
	const { history, results, query } = useContext(SearchContext);

	if (query) {
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
	} 
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

SearchContent.displayName = 'SearchContent';
