import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default  {
  testEnvironment: "node",

  preset: 'ts-jest', // Use ts-jest for TypeScript files
  roots: ['<rootDir>/src'], // Look for tests in the 'src' directory
  testMatch: [
    '**/__tests__/**/*.test.ts', // Files ending with .test.ts in __tests__ folders
    '**/?(*.)+(spec|test).ts', // Files ending with .spec.ts or .test.ts
  ],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true, // Enable code coverage collection
  coverageDirectory: 'coverage', // Directory for coverage reports
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/__tests__/',
  ],
  // If you use path aliases in tsconfig.json, configure them here:
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Example for `@/` alias
  },
};