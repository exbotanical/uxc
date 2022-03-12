import { useEffect, useState } from 'react';

import mockData from '@/components/Search/hooks/data.json';

export interface SearchRecord {
	category: 'thread' | 'user';
	content: string | null;
	label: string;
	id: number;
}

export function useSearch() {
	const [query, setQuery] = useState('');
	const [history, setHistory] = useState<SearchRecord[]>([]);
	const [results, setResults] = useState<SearchRecord[]>([]);

	function appendToHistory(record: SearchRecord) {
		setHistory((prev) => [...prev, record]);
	}

	function removeFromHistory(record: SearchRecord) {
		setHistory((prev) => prev.filter(({ id }) => id !== record.id));
	}

	useEffect(() => {
		if (!query) return;

		const rawHits = mockData.filter((record) =>
			record.username.includes(query)
		);

		const hits = rawHits.map((record, idx) => ({
			category: 'user' as const,
			content: record.type === 'user' ? null : 'Chat thread open',
			label: record.username,
			id: idx
		}));

		setResults(hits);
	}, [query, setQuery]);

	return {
		history,
		appendToHistory,
		removeFromHistory,
		results,
		setResults,
		query,
		setQuery
	};
}
