import React, { useContext } from 'react'

import { SearchHistoryHit } from '@/components/Search/SearchContent/SearchHistoryHit'
import { SearchHit } from '@/components/Search/SearchContent/SearchHit'
import * as S from '@/components/Search/SearchContent/styles'
import { SearchContext } from '@/components/Search/SearchContext'

export function SearchContent() {
  const ref = React.useRef<HTMLDivElement | null>(null)

  const { favorites, history, results, query } = useContext(SearchContext)

  function History() {
    return history.length ? (
      <section>
        <S.SearchSource data-testid="search-content-src">Recent</S.SearchSource>

        <S.SearchHistoryHitList>
          {history.map(record => (
            <SearchHistoryHit key={record.id} record={record} />
          ))}
        </S.SearchHistoryHitList>
      </section>
    ) : (
      <S.NoContent data-testid="search-content-src">
        No recent searches
      </S.NoContent>
    )
  }

  function Favorites() {
    return favorites.length ? (
      <section>
        <S.SearchSource data-testid="search-content-src">
          Favorites
        </S.SearchSource>

        <S.SearchHistoryHitList>
          {favorites.map(record => (
            <SearchHistoryHit isFavorite key={record.id} record={record} />
          ))}
        </S.SearchHistoryHitList>
      </section>
    ) : null
  }

  if (query) {
    if (!results.threads.length && !results.messages.length) {
      return (
        <S.NoContent data-testid="search-content-src">
          No results for &quot;{query}&quot;
        </S.NoContent>
      )
    }

    return (
      <div ref={ref}>
        {results.threads.length ? (
          <S.SearchHitSection>
            <S.SearchSource data-testid="search-content-src">
              Chat Threads
            </S.SearchSource>

            <S.SearchHitList>
              {results.threads.map(record => (
                <SearchHit key={record.id} record={record} />
              ))}
            </S.SearchHitList>
          </S.SearchHitSection>
        ) : null}

        {results.messages.length ? (
          <S.SearchHitSection>
            <S.SearchSource data-testid="search-content-src">
              Messages
            </S.SearchSource>

            <S.SearchHitList>
              {results.messages.map(record => (
                <SearchHit key={record.id} record={record} />
              ))}
            </S.SearchHitList>
          </S.SearchHitSection>
        ) : null}
      </div>
    )
  }

  return (
    <div ref={ref}>
      <History />
      <Favorites />
    </div>
  )
}

SearchContent.displayName = 'SearchContent'
