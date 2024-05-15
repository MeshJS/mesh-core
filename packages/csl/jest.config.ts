import type { Config } from 'jest';

const jestConfig: Config = {
    clearMocks: true,
    maxWorkers: 1,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/src/**/*.test.ts', '**/*.test.ts', '**/**/*.test.ts'],
    moduleNameMapper: {},
};

export default jestConfig;
