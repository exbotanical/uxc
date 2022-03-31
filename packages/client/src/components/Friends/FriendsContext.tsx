import { useMutation, useQuery } from '@apollo/client';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import type { MutationFunction } from '@/types';
import type {
	ObjectID,
	PrivateThread,
	SearchFriendsResult,
	User
} from '@uxc/common';

import { FRIEND_SEARCH, REMOVE_FRIEND } from '@/services/api';

export type FriendsViewMode = 'all' | 'blocked' | 'online' | 'pending';

export type FriendshipStatus = 'friend' | 'recv' | 'sent';

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
	removeFriend: MutationFunction<
		{ removeFriend: ObjectID },
		{ friendId: ObjectID }
	>;
}

export const FriendsContext = createContext({} as FriendsContextType);

export function FriendsProvider({ children }: { children: JSX.Element }) {
	const [viewMode, setViewMode] = useState<FriendsViewMode>('online');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
	const [query, setQuery] = useState('');

	// @todo
	const [removeFriend] = useMutation<
		{
			removeFriend: ObjectID;
		},
		{ friendId: ObjectID }
	>(REMOVE_FRIEND, {
		update(cache, { data }) {
			cache.modify({
				fields: {
					// remove friend from cache
					searchFriends: (previous: User[]) => {
						if (!data?.removeFriend) {
							return previous;
						}

						const idx = previous.findIndex(
							({ _id }) => _id === data.removeFriend
						);

						if (idx === -1) {
							return previous;
						}

						return previous.splice(idx, 1);
					},

					// remove thread with friend from cache
					getThreads: (previous: PrivateThread[]) => {
						if (!data?.removeFriend) {
							return previous;
						}

						return previous.filter(({ users }) => {
							const ids = users.map(({ _id }) => _id);

							return !ids.includes(data.removeFriend);
						});
					}
				}
			});
		}
	});

	const { data } = useQuery<{ searchFriends: SearchFriendsResult }>(
		FRIEND_SEARCH,
		{
			variables: {
				type: 'BOTH'
			},
			onCompleted: ({ searchFriends }) => {
				const hits = [];

				if (searchFriends.friends.length) {
					hits.push(
						...searchFriends.friends.map((friend) => ({
							...friend,
							status: 'friend' as const
						}))
					);
				}

				if (searchFriends.sent.length) {
					hits.push(
						...searchFriends.sent.map((friend) => ({
							...friend,
							status: 'sent' as const
						}))
					);
				}

				if (searchFriends.received.length) {
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
		setQuery,
		removeFriend
	};

	return (
		<FriendsContext.Provider value={ctx}>{children}</FriendsContext.Provider>
	);
}

FriendsProvider.displayName = 'FriendsProvider';
