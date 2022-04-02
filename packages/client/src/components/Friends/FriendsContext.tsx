import { useMutation, useQuery } from '@apollo/client';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import type {
	FriendRequestStatus,
	ObjectID,
	PrivateThread,
	SearchFriendsResult,
	User
} from '@uxc/common';

import {
	CANCEL_FRIEND_REQUEST,
	FRIEND_SEARCH,
	REMOVE_FRIEND,
	UPDATE_FRIEND_REQUEST
} from '@/services/api';

export type FriendsViewMode = 'all' | 'blocked' | 'online' | 'pending';

export type FriendshipStatus = 'friend' | 'recv' | 'sent';

export type SearchResult = User & {
	status: FriendshipStatus;
	requestId?: ObjectID;
};

interface FriendsContextType {
	viewMode: FriendsViewMode;
	setViewMode: React.Dispatch<React.SetStateAction<FriendsViewMode>>;
	isCurrentView: (key: FriendsViewMode) => boolean;
	results: SearchResult[];
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	removeFriend: (friendId: ObjectID) => void;
	acceptFriend: (requestId: ObjectID) => void;
	rejectFriend: (requestId: ObjectID) => void;
	cancelFriend: (requestId: ObjectID) => void;
}

export const FriendsContext = createContext({} as FriendsContextType);

export function FriendsProvider({ children }: { children: JSX.Element }) {
	const [viewMode, setViewMode] = useState<FriendsViewMode>('online');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
	const [query, setQuery] = useState('');

	const [removeFriendFn] = useMutation<
		{
			removeFriend: ObjectID;
		},
		{ friendId: ObjectID }
	>(REMOVE_FRIEND, {
		update(cache, { data }) {
			cache.modify({
				fields: {
					// remove friend from cache
					searchFriends: (previous: SearchFriendsResult) => {
						if (!data?.removeFriend) {
							return previous;
						}

						const idx = previous.friends.findIndex(
							({ _id }) => _id === data.removeFriend
						);
						if (idx === -1) {
							return previous;
						}

						const friends = previous.friends.slice(0);
						friends.splice(idx, 1);

						return {
							...previous,
							friends
						};
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

	const [acceptFriendRequest] = useMutation<
		{ updateFriendRequest: ObjectID },
		{ requestId: ObjectID; status: FriendRequestStatus }
	>(UPDATE_FRIEND_REQUEST, {
		update(cache, { data }) {
			cache.modify({
				fields: {
					// remove friend from cache
					searchFriends: (previous: SearchFriendsResult) => {
						if (!data?.updateFriendRequest) {
							return previous;
						}

						const idx = previous.received.findIndex(
							({ _id }) => _id === data.updateFriendRequest
						);
						if (idx === -1) {
							return previous;
						}

						const accepted = { ...previous.received[idx] };
						const friends = previous.friends.slice(0);
						const received = previous.friends.slice(0);

						received.splice(idx, 1);
						friends.push(accepted);

						return {
							...previous,
							friends,
							received
						};
					}
				}
			});
		}
	});

	const [rejectFriendRequest] = useMutation<
		{ updateFriendRequest: ObjectID },
		{ requestId: ObjectID; status: FriendRequestStatus }
	>(UPDATE_FRIEND_REQUEST, {
		update(cache, { data }) {
			cache.modify({
				fields: {
					// remove friend from cache
					searchFriends: (previous: SearchFriendsResult) => {
						if (!data?.updateFriendRequest) {
							return previous;
						}

						const idx = previous.received.findIndex(
							({ _id }) => _id === data.updateFriendRequest
						);
						if (idx === -1) {
							return previous;
						}

						const received = previous.friends.slice(0);

						received.splice(idx, 1);

						return {
							...previous,
							received
						};
					}
				}
			});
		}
	});

	const [cancelFriendRequest] = useMutation<
		{ cancelFriendRequest: ObjectID },
		{ requestId: ObjectID }
	>(CANCEL_FRIEND_REQUEST, {
		update(cache, { data }) {
			cache.modify({
				fields: {
					// remove friend from cache
					searchFriends: (previous: SearchFriendsResult) => {
						if (!data?.cancelFriendRequest) {
							return previous;
						}

						const idx = previous.sent.findIndex(
							({ _id }) => _id === data.cancelFriendRequest
						);
						if (idx === -1) {
							return previous;
						}

						const sent = previous.friends.slice(0);

						sent.splice(idx, 1);

						return {
							...previous,
							sent
						};
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
		removeFriend: (friendId: ObjectID) =>
			removeFriendFn({ variables: { friendId } }),
		acceptFriend: (requestId: ObjectID) =>
			acceptFriendRequest({
				variables: {
					requestId,
					status: 'ACCEPTED'
				}
			}),

		rejectFriend: (requestId: ObjectID) =>
			rejectFriendRequest({
				variables: {
					requestId,
					status: 'REJECTED'
				}
			}),

		cancelFriend: (requestId: ObjectID) => {
			cancelFriendRequest({
				variables: {
					requestId
				}
			});
		}
	};

	return (
		<FriendsContext.Provider value={ctx}>{children}</FriendsContext.Provider>
	);
}

FriendsProvider.displayName = 'FriendsProvider';
