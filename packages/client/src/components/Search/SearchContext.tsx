import React, { createContext, useMemo, useState } from 'react';

import { useSearch } from '@/components/Search/hooks';

type SearchContextType = ReturnType<typeof useSearch> & {
	activeItemId: number;
	setActiveRecordId: React.Dispatch<React.SetStateAction<number>>;
};

export const SearchContext = createContext({} as SearchContextType);

export function SearchProvider({ children }: { children: JSX.Element }) {
	const [activeItemId, setActiveRecordId] = useState(-1);

	const search = useSearch();

	// @todo refine
	const ctx = useMemo(
		() => ({ ...search, activeItemId, setActiveRecordId }),
		[search, activeItemId, setActiveRecordId]
	);

	return (
		<SearchContext.Provider value={ctx}>{children}</SearchContext.Provider>
	);
}

SearchProvider.displayName = 'SearchProvider';
