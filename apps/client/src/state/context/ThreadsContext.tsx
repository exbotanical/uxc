import { useQuery, useSubscription } from '@apollo/client';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import type { PrivateThread, ObjectID, User, Message } from '@uxc/types';

import {
	GET_THREADS,
	GET_CURRENT_USER,
	ON_ANY_MESSAGE_CREATED
} from '@/services/api/queries';
import { showNotification } from '../notification/actions';

export type StatefulThread = PrivateThread & {
	newMessages: number;
};

interface ThreadsContextType {
	threads: StatefulThread[];
	getThreadById: (threadId?: ObjectID) => StatefulThread | null;
	updateThread: (thread: StatefulThread) => void;
}

export const ThreadsContext = createContext({} as ThreadsContextType);

export function ThreadsProvider({ children }: { children: JSX.Element }) {
	const [threads, setThreads] = useState<StatefulThread[]>([]);

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

	useEffect(() => {
		setThreads(
			threadsPayload?.getThreads.map((thread) => ({
				...thread,
				newMessages: 0
			})) || []
		);
	}, [threadsPayload]);

	const getThreadById = useCallback(
		(threadId?: ObjectID) => {
			if (!threadId) {
				return null;
			}

			const thread = threads.find(({ _id }) => _id === threadId);

			return thread ?? null;
		},
		[threads]
	);

	const { data: newMessageAdded } = useSubscription<{
		onAnyMessageCreated: Message[];
	}>(ON_ANY_MESSAGE_CREATED);

	const newMessage = newMessageAdded?.onAnyMessageCreated;

	useEffect(() => {
		if (newMessage?.length) {
			const idx = threads.findIndex(
				({ _id }) => _id === newMessage[0].threadId
			);

			if (!idx) {
				return;
			}

			const copiedThreads = [...threads];

			copiedThreads[idx].newMessages++;

			setThreads(copiedThreads);

			showNotification({
				message: newMessage[0].body,
				type: 'success',
				duration: 'sticky'
			});
		}
	}, [newMessage]);

	function updateThread(thread: StatefulThread) {
		const idx = threads.findIndex(({ _id }) => _id === thread._id);

		if (!idx) {
			return;
		}

		const copiedThreads = [...threads];
		copiedThreads.splice(idx, 1, thread);

		setThreads(copiedThreads);
	}

	const value = {
		getThreadById,
		threads,
		updateThread
	};

	return (
		<ThreadsContext.Provider value={value}>{children}</ThreadsContext.Provider>
	);
}

// function c(fn) {
// 	fn(1, 2, 4);
// }

// function a(a) {
// 	function b(...args) {
// 		console.log({ args });
// 	}

// 	c(b);
// 	return 1;
// }
