import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  clearMocks: true,
  coverageProvider: 'babel',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  preset: 'ts-jest',
  //   setupFiles: ['<rootDir>/jest/test-env-vars.js'],
  //   setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  //   testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec).[tj]s?(x)'],
};

export default createJestConfig(customJestConfig);
