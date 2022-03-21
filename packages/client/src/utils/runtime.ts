export const isTestRuntime =
	!!import.meta.env.VITE_CY_TEST || process.env.NODE_ENV === 'test';

export const isLocalRuntime =
	isTestRuntime || process.env.NODE_ENV !== 'production';

export const isBrowserRuntime = typeof window !== 'undefined';
