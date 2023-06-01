'use strict';

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['@moxy/eslint-config-base/es2020', '@moxy/eslint-config-jest'],
    rules: {
        'jsdoc/newline-after-description': 'off',
    },
};
