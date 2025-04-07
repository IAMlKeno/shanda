import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "./",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  verbose: true,
  moduleNameMapper: {
    'src/mvc/(.*)': '<rootDir>/src/mvc/$1'
  }
}

export default config;