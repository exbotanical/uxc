export const isLocalRuntime = process.env.NODE_ENV !== 'production';

export const isTestRuntime = process.env.NODE_ENV === 'test';
