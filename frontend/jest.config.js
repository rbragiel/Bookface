/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  resetMocks: true,
  globals: {
    "ts-jest": { tsconfig: "./tsconfig.jest.json" },
  },
  setupFilesAfterEnv: ["<rootDir>/src/setup-tests.ts"],
};
