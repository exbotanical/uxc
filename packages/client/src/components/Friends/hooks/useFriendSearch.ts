import { useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';

import { FriendsContext } from '../FriendsContext';

import type { User } from '@uxc/common';

import { FRIEND_SEARCH } from '@/services/api';

/**
 * @todo Throttle type-along search.
 * @todo Paginate results.
 * @todo Blocked.
 * @todo Online.
 */
export function useFriendSearch() {
	const { viewMode } = useContext(FriendsContext);

	const [query, setQuery] = useState('');
	const [results, setResults] = useState<User[]>([]);

	const { data: friends } = useQuery<{ searchFriends: User[] }>(FRIEND_SEARCH, {
		variables: {
			query
		},
		skip: query.length < 2 || viewMode === 'pending',
		fetchPolicy: 'no-cache'
	});

	// const { data: friendRequests } = useQuery<{ getFriendRequests: User[] }>(
	// 	GET_FRIEND_REQUESTS,
	// 	{
	// 		variables: {
	// 			query
	// 		},
	// 		skip: query.length < 2 || viewMode === 'pending',
	// 		fetchPolicy: 'no-cache'
	// 	}
	// );

	useEffect(() => {
		if (!query) {
			return;
		}

		const hits = friends?.searchFriends;

		if (viewMode === 'blocked') {
			setResults([]);
		}

		if (viewMode === 'online') {
			setResults([]);
		}

		setResults(hits || []);
	}, [friends, query]);

	return {
		results,
		setResults,
		query,
		setQuery
	};
}
