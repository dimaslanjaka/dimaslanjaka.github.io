"use strict";

/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testMatch: [
        `**/__tests__/**/*.+(ts|tsx|js)`,
        `**/?(*.)+(spec|test).+(ts|tsx|js)`,
    ],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules",
        "<rootDir>/dist",
        "<rootDir>/tmp",
    ],
    transform: {
        "\\.[jt]sx?$": "babel-jest",
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            // required due to custom location of tsconfig.json configuration file
            // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
            { tsconfig: "./tsconfig.json" },
        ],
    },
    collectCoverageFrom: [
        "src/**/*.{js,ts}",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!**/test/**",
        "!**/*.test.{js,ts}",
    ],
    moduleNameMapper: {
        //"^path-key$": require.resolve("path-key"),
    },
};

module.exports = config;
