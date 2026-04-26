import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  clearMocks: true,
  testTimeout: 15000,
  collectCoverageFrom: ['src/**/*.ts', '!src/server.ts'],
};

export default config;
