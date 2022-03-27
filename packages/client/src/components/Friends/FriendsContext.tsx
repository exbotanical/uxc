import React, { createContext, useCallback, useState } from 'react';

export type FriendsViewMode = 'all' | 'blocked' | 'online' | 'pending';

interface FriendsContextType {
	viewMode: FriendsViewMode;
	setViewMode: React.Dispatch<React.SetStateAction<FriendsViewMode>>;
	isCurrentView: (key: FriendsViewMode) => boolean;
}

export const FriendsContext = createContext({} as FriendsContextType);

export function FriendsProvider({ children }: { children: JSX.Element }) {
	const [viewMode, setViewMode] = useState<FriendsViewMode>('online');

	const isCurrentView = useCallback(
		(key: FriendsViewMode) => viewMode === key,
		[viewMode]
	);

	const ctx = { viewMode, setViewMode, isCurrentView };

	return (
		<FriendsContext.Provider value={ctx}>{children}</FriendsContext.Provider>
	);
}

FriendsProvider.displayName = 'FriendsProvider';
