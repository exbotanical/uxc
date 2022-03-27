import { FRIEND_SEARCH } from '@/services/api';
import { useQuery } from '@apollo/client';
import type { SearchFriendsResult, User } from '@uxc/common';
import React, { createContext, useCallback, useEffect, useState } from 'react';

export type FriendsViewMode = 'all' | 'blocked' | 'online' | 'pending';

export type FriendshipStatus = 'friend' | 'sent' | 'recv';

export type SearchResult = User & {
	status: FriendshipStatus;
};

interface FriendsContextType {
	viewMode: FriendsViewMode;
	setViewMode: React.Dispatch<React.SetStateAction<FriendsViewMode>>;
	isCurrentView: (key: FriendsViewMode) => boolean;
	results: SearchResult[];
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const FriendsContext = createContext({} as FriendsContextType);

export function FriendsProvider({ children }: { children: JSX.Element }) {
	const [viewMode, setViewMode] = useState<FriendsViewMode>('online');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
	const [query, setQuery] = useState('');

	const { data } = useQuery<{ searchFriends: SearchFriendsResult }>(
		FRIEND_SEARCH,
		{
			variables: {
				type: 'BOTH'
			},
			onCompleted: ({ searchFriends }) => {
				const hits = [];

				if (searchFriends?.friends?.length) {
					hits.push(
						...searchFriends.friends.map((friend) => ({
							...friend,
							status: 'friend' as const
						}))
					);
				}

				if (searchFriends?.sent?.length) {
					hits.push(
						...searchFriends.sent.map((friend) => ({
							...friend,
							status: 'sent' as const
						}))
					);
				}

				if (searchFriends?.received?.length) {
					hits.push(
						...searchFriends.received.map((friend) => ({
							...friend,
							status: 'recv' as const
						}))
					);
				}

				setResults(hits);
			}
		}
	);

	useEffect(() => {
		const filteredByQuery = results.filter(({ username }) =>
			username.toLowerCase().includes(query.toLowerCase())
		);

		switch (viewMode) {
			case 'blocked':
				setFilteredResults([]);
				break;
			case 'online':
				setFilteredResults(filteredByQuery);
				break;
			case 'pending':
				setFilteredResults(
					filteredByQuery.filter(({ status }) => status !== 'friend')
				);
				break;

			default:
				setFilteredResults(filteredByQuery);
				break;
		}
	}, [setResults, data, results, viewMode, query]);

	const isCurrentView = useCallback(
		(key: FriendsViewMode) => viewMode === key,
		[viewMode]
	);

	const ctx = {
		viewMode,
		setViewMode,
		isCurrentView,
		results: filteredResults,
		query,
		setQuery
	};

	return (
		<FriendsContext.Provider value={ctx}>{children}</FriendsContext.Provider>
	);
}

FriendsProvider.displayName = 'FriendsProvider';
