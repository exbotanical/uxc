import { useEffect, useState } from 'react';

function isSupported() {
	return typeof navigator !== 'undefined' &&
		typeof navigator.onLine === 'boolean'
		? navigator.onLine
		: true;
}

export function useOnline() {
	const [isOnline, setIsOnline] = useState(isSupported());
	const [offlineAt, setOfflineAt] = useState<number | null>(null);

	const setOnline = () => {
		setIsOnline(true);
		setOfflineAt(null);
	};

	const setOffline = () => {
		setIsOnline(false);
		setOfflineAt(Date.now());
	};

	useEffect(() => {
		window.addEventListener('offline', setOffline);
		window.addEventListener('online', setOnline);

		return function cleanup() {
			window.removeEventListener('offline', setOffline);
			window.removeEventListener('online', setOnline);
		};
	}, []);

	return {
		isOnline,
		offlineAt
	};
}
