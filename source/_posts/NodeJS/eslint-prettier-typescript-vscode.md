---
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
  image: https://i.pinimg.com/564x/32/bc/65/32bc65e19220728fb290249059a7242a.jpg
category:
  - Programming
  - JS
comments: true
cover: https://i.ytimg.com/vi/lHAeK8t94as/maxresdefault.jpg
date: 2021-11-28T07:00:00+07:00
keywords:
  - nodejs
  - eslint
  - prettier
  - vscode
  - auto
  - format
  - lint
lang: en
location: Indonesia
subtitle: How to configure eslint with prettier to automated lint and format
  codes in typescript project using vscode
tags:
  - JS
  - NodeJS
title: Eslint Prettier In Typescript Project Using Vscode
type: post
uuid: 3f6ada3c-0ed8-4888-87c8-3371f8927a2c
webtitle: NodeJS
updated: 2022-03-19T19:53:25+07:00
excerpt: How to configure eslint with prettier to automated lint and format
  codes in typescript project using vscode
description: How to configure eslint with prettier to automated lint and format
  codes in typescript project using vscode
thumbnail: https://i.ytimg.com/vi/lHAeK8t94as/maxresdefault.jpg
photos:
  - https://i.ytimg.com/vi/lHAeK8t94as/maxresdefault.jpg
wordcount: 584
---

# Auto Lint And Format Typescript Using VSCode With Eslint And Prettier

Linter becomes 2 types:
- [TSLint](https://palantir.github.io/tslint/) is a linter that must be utilized for TypeScript.
- [ESLint](https://eslint.org/) is a linter supports both JavaScript and TypeScript.
**ESLint has a more performant architecture than TSLint** and that they will **only be focusing on ESLint** when providing editor linting integration for TypeScript. Now how to automated these linter in vscode without **[prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**

## Install dependencies
install using npm:
```shell
npm i -D prettier eslint-config-prettier eslint-plugin-prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
install using yarn:
```shell
yarn add prettier eslint-config-prettier eslint-plugin-prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

## install and activate VSCode ESLint extension for auto Linter And Formatter
[Download Here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Create .eslintrc.js
```js
module.exports = {
  root: true, // Specifies your current project has own eslint rules without extends parent folder eslint rules
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  env: {
    browser: true, // add support for browser js (window,document,location,etc)
    amd: true, // add amd support
    node: true, // add node support (module.export,etc)
  },
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'eslint:recommended', // uses eslint default recommended
    'plugin:@typescript-eslint/eslint-recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  // override rules for js files
  "overrides": [
    {
      "files": [
        "*.js"
      ],
      "rules": {
        "@typescript-eslint/no-var-requires": "off" // disable require warning on js files
      }
    }
  ],
  // specify your desired rules for eslint
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off', // disable function without return type
    "no-unused-vars": "off", // disable original eslint unused-vars
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // enable typescript-eslint unused-vars and allow unused vars start with underscore (_)
    "@typescript-eslint/no-explicit-any": "off", // allow any types
    "@typescript-eslint/no-this-alias": [ // rules for this binding
      "error",
      {
        allowDestructuring: false, // Disallow `const { props, state } = this`; true by default
        allowedNames: ["self"], // Allow `const self = this`; `[]` by default
      },
    ],
    // "arrow-body-style" and "prefer-arrow-callback" are two ESLint core rules that can cause issues with prettier/prettier plugin, so turn them off.
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
};
```

## Create Prettier Config
specify your desired config for prettier
### Using .prettierrc.js
```js
module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2
};
```
### Using .prettierc
```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": true,
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "none",
  "tabWidth": 2
}
```

## Create .vscode/settings.json
this will automate lint and format your codes when saving.
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // let ESLint take formating and linting
  },
  "[json]": {
    "editor.formatOnSave": true // enable json formating with default vscode formatter
  },
  "editor.formatOnSave": false, // disable default vscode formatter
}
```

# create tsconfig.json (if not created yet)
for example tsconfig.json for node 12
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Node 12",
  "extends": "@tsconfig/node12/tsconfig.json",
  "compilerOptions": {
    "preserveConstEnums": true,
    "allowJs": true,
    "outDir": "./dist"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "**/node_modules/**",
    "**/*.spec.ts",
    "**/*.test.ts",
    "**/__tests__/**"
  ]
}
```

## Finish
now your vscode format and lint your codes automatically.

