const { join } = require('path');

module.exports = {
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	moduleNameMapper: {
		'.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
		'.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			join(__dirname, '../mocks/assets.js'),
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	setupFiles: [join(__dirname, './loader.shim.js')],
	setupFilesAfterEnv: [join(__dirname, './setupTests.js')],
	testEnvironment: 'jsdom',
	testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],
	testPathIgnorePatterns: [
		'node_modules',
		'\\.cache',
		'<rootDir>/public',
		'<rootDir>/cypress'
	],
	testURL: 'http://localhost',
	transform: {
		'^.+\\.jsx?$': join(__dirname, './preprocess.js'),
		'^.+\\.tsx?$': 'ts-jest'
	}
};
