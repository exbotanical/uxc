import { useState } from 'react';
import { isBrowserRuntime } from '@/utils';
import { logger } from '@/services/logger';

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [persistedValue, setPersistedValue] = useState<T>(() => {
		if (!isBrowserRuntime) {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (ex) {
			logger.error(ex);

			return initialValue;
		}
	});

	const setValue = (value: T | ((value: T) => T)) => {
		try {
			const valueToPersist =
				value instanceof Function ? value(persistedValue) : value;

			setPersistedValue(valueToPersist);

			if (isBrowserRuntime) {
				window.localStorage.setItem(key, JSON.stringify(valueToPersist));
			}
		} catch (ex) {
			logger.error(ex);
		}
	};

	return [persistedValue, setValue] as const;
}
