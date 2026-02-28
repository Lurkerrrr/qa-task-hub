import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    verbose: true,
    forceExit: true,
    clearMocks: true,
};

export default config;