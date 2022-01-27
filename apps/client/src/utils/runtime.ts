export const isTestRuntime = !!import.meta.env.VITE_CY_TEST;

export const isLocalRuntime =
	isTestRuntime || process.env.NODE_ENV !== 'production';

export const isInsecureMode = !!import.meta.env.INSECURE_MODE;
