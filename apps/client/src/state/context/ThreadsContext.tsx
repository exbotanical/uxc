import { useQuery } from '@apollo/client';
import React, { createContext, useCallback } from 'react';

import type { PrivateThread, ObjectID, User } from '@uxc/types';

import { GET_THREADS, GET_CURRENT_USER } from '@/services/api/queries';

interface ThreadsContext {
	threads: PrivateThread[];
	getThreadById: (threadId: ObjectID) => PrivateThread | null;
}
export const ThreadsContext = createContext({} as ThreadsContext);

export function ThreadsProvider({ children }: { children: JSX.Element }) {
	const { data: user } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const { data: threadsPayload } = useQuery<{
		getThreads: PrivateThread[];
	}>(GET_THREADS, {
		variables: {
			userId: user?.getCurrentUser._id
		}
	});

	const threads = threadsPayload?.getThreads || [];

	const getThreadById = useCallback(
		(id: ObjectID) => {
			const thread = threads.find(({ _id }) => _id === id);

			return thread!;
		},
		[threads]
	);

	const value = { threads, getThreadById };

	return (
		<ThreadsContext.Provider value={value}>{children}</ThreadsContext.Provider>
	);
}
