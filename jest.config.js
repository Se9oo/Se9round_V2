/** @type {import('jest').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	setupFilesAfterEnv: ['./jest.setup.js'],
	moduleDirectories: ['node_modules', '<rootDir>'],
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testMatch: ['**/test/*.test.(ts|tsx)'],
};

module.exports = createJestConfig(customJestConfig);
