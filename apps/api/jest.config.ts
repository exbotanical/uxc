import type { Config } from '@jest/types';

// eslint-disable-next-line @typescript-eslint/require-await
export default async (): Promise<Config.InitialOptions> => {
	return {
		errorOnDeprecated: true,
		moduleNameMapper: {
			'^@/(.*)': '<rootDir>/src/$1',
			'^@@/(.*)': '<rootDir>/test/$1'
		},
		preset: 'ts-jest',
		setupFilesAfterEnv: ['./test/setup.ts'],
		testEnvironment: 'node',
		testMatch: ['<rootDir>/src/**/__tests__/*.test.ts'],
		verbose: true
	};
};
