"use strict";

/** @type {import('jest').Config} */
const config = {
    verbose: true,
    preset: 'babel-jest',
    testMatch: [`**/__tests__/**/*.+(ts|tsx|js)`, `**/?(*.)+(spec|test).+(ts|tsx|js)`],
    modulePathIgnorePatterns: ["**/dist/**", "**/tmp/**"],
    transformIgnorePatterns: [
        "**/dist/**",
        "**/tmp/**",
        "node_modules",
        "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules",
        "<rootDir>/dist",
        "**/tmp/**",
        "**/node_modules/**",
        "**/dist/**",
    ],
    transform: {
        "\\.[jt]sx?$": "babel-jest",
    },
    moduleNameMapper: {
        //"^path-key$": require.resolve("path-key"),
    },
};

module.exports = config;
