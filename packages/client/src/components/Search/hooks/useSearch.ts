
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';

import type { PrivateThread, Message, User } from '@uxc/common';

import { useLocalStorage } from '@/hooks';
import { GET_CURRENT_USER, TEXT_SEARCH } from '@/services/api';

type PopulatedMessage = Message & { threadId: PrivateThread };

type DeterminedResult =
	| (PopulatedMessage & {
			__typename: 'Message';
	  })
	| (PrivateThread & {
			__typename: 'PrivateThread';
	  });

export interface SearchResults {
	threads: (SearchRecord & { category: 'thread' })[];
	messages: (SearchRecord & { category: 'message' })[];
}

export interface SearchRecord {
	category: 'message' | 'thread';
	content: string | null;
	label: string;
	id: string;
	link: string;
}

/**
 * @todo Update favorites cache if the resource itself changes. This won't be easy.
 * @todo Update `mark` in favorites if changed. Requires allow favorite replacement if diffed.
 * @todo Throttle type-along search.
 */
export function useSearch() {
	const [query, setQuery] = useState('');
	const [favorites, setFavorites] = useLocalStorage<SearchRecord[]>(
		'__uxc_search_fav',
		[]
	);
	const [history, setHistory] = useState<SearchRecord[]>([]);
	const [results, setResults] = useState<SearchResults>({
		messages: [],
		threads: []
	});

	const { data: currentUser } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const { data } = useQuery<{ search: DeterminedResult[] }>(TEXT_SEARCH, {
		variables: {
			query
		},
		// @todo make robust. naive impl for now
		skip: query.length < 2,
		fetchPolicy: 'no-cache'
	});

	function appendToHistory(record: SearchRecord) {
		if (favorites.findIndex(({ id }) => id === record.id) !== -1) {
			return;
		}

		setHistory((prev) => [...prev, record]);
	}

	function removeFromHistory(record: SearchRecord) {
		setHistory((prev) => prev.filter(({ id }) => id !== record.id));
	}

	function removeFromFavorites(record: SearchRecord) {
		setFavorites((prev) => prev.filter(({ id }) => id !== record.id));
	}

	function appendToFavorites(record: SearchRecord) {
		removeFromHistory(record);
		setFavorites((prev) => [...prev, record]);
	}

	console.log('render');
	useEffect(() => {
		if (!query) {
			return;
		}

		const messageMatcher = new RegExp(query, 'gi');

		const hits = data?.search?.reduce(
			(acc, record) => {
				if (record.__typename === 'Message') {
					acc.messages.push({
						category: 'message' as const,
						content: `Message by ${(record.sender as User).username}`,
						label: record.body.replace(
							messageMatcher,
							(match) => `<mark>${match}</mark>`
						),
						id: record._id,
						link: `${record.threadId._id}#message-${record._id}`
					});
				} else {
					acc.threads.push({
						category: 'thread' as const,
						content: 'Chat Thread',
						label: record.users.find(
							({ _id }) => _id !== currentUser?.getCurrentUser._id
						)!.username,
						id: record._id,
						link: record._id
					});
				}

				return acc;
			},
			{ messages: [], threads: [] } as unknown as SearchResults
		) || { messages: [], threads: [] };

		setResults(hits);
	}, [data, query]);

	return {
		history,
		appendToHistory: useCallback(appendToHistory, [setHistory]),
		removeFromHistory: useCallback(removeFromHistory, [setHistory]),
		results,
		setResults,
		favorites,
		appendToFavorites: useCallback(appendToFavorites, [setFavorites]),
		removeFromFavorites: useCallback(removeFromFavorites, [setFavorites]),
		query,
		setQuery
	};
}
