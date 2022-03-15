/* eslint-disable jest/require-top-level-describe,jest/require-hook */
require('@testing-library/jest-dom/extend-expect');

beforeEach(() => {
	jest.clearAllMocks();
	jest.clearAllTimers();
});
