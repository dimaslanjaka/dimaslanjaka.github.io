---
cover: https://res.cloudinary.com/practicaldev/image/fetch/https://opengraph.githubassets.com/51ab140e160882668aa0f466b095b5bb634739d04b8095f768d1741def9280f2/inmanta/vscode-inmanta/issues/314
date: 2022-03-30T06:57:37+0000
title: VSCode Migrate Typescript CommonJS to ESM
updated: 2022-03-30T06:57:37+0000
uuid: 0d62f3d2-19c9-4888-8674-ddff779112e4
category:
  - Uncategorized
tags: []
lang: en
description: VSCode Migrate Typescript CommonJS to ESM
subtitle: VSCode Migrate Typescript CommonJS to ESM
excerpt: VSCode Migrate Typescript CommonJS to ESM
thumbnail: https://res.cloudinary.com/practicaldev/image/fetch/https://opengraph.githubassets.com/51ab140e160882668aa0f466b095b5bb634739d04b8095f768d1741def9280f2/inmanta/vscode-inmanta/issues/314
photos:
  - https://res.cloudinary.com/practicaldev/image/fetch/https://opengraph.githubassets.com/51ab140e160882668aa0f466b095b5bb634739d04b8095f768d1741def9280f2/inmanta/vscode-inmanta/issues/314
wordcount: 420
---

## How to migrate typescript commonjs to esm with vscode

## package.json
add following key to package.json
```jsonc
{
  "type": "module",
  "main": "./dist/src/main.js",
  "exports": {
    ".": "./dist/src/main.js"
  },
  "typesVersions": {
    "*": {
      "main.d.ts": ["dist/src/main.d.ts"]
    }
  }
}
```
Nicer module specifiers for a subtree:
```jsonc
{
  "type": "module",
  "main": "./dist/src/main.js",
  "exports": {
    "./*": "./dist/src/*"
  },
  "typesVersions": {
    "*": {
      "*": ["dist/src/*"]
    }
  }
}
```
Default [typescript documentation](https://www.typescriptlang.org/docs/handbook/esm-node.html)
```jsonc
{
    "name": "my-package",
    "type": "module",
    "exports": {
        ".": {
            // Entry-point for `import "my-package"` in ESM
            "import": "./esm/index.js",
            // Entry-point for `require("my-package") in CJS
            "require": "./commonjs/index.cjs",
        },
    },
    // CJS fall-back for older versions of Node.js
    "main": "./commonjs/index.cjs",
}
```
- [`"typesVersions"`](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#version-selection-with-typesversions) performs the same mapping as `"exports"`, but for TypeScript's type definitions.

## tsconfig.json
match your configuration (points A, B, C)
```jsonc
{
  "compilerOptions": {
    "rootDir": "./",
    "outDir": "./dist",
    "target": "ES2020",
    "lib": [
      "ES2020", "DOM"
    ],
    "module": "ES2020", // (A)
    "moduleResolution": "Node", // (B)
    "strict": true,
    "sourceMap": true,
    // Needed for importing CommonJS modules
    "allowSyntheticDefaultImports": true, // (C)
    // Compile d.ts
    "declaration": true,
  }
}
```
-   Line A ([`"module"`](https://www.typescriptlang.org/tsconfig#module)): We are telling TypeScript to generate ECMAScript modules.
    -   `"ES6"`, `"ES2015"`: support for basic ESM features
    -   `"2020"`: additionally, support for dynamic imports and `import.meta`.
-   Line B ([`"moduleResolution"`](https://www.typescriptlang.org/tsconfig#moduleResolution)): This value is needed for Node.js.
-   Line C ([`"allowSyntheticDefaultImports"`](https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports)): I needed this setting in order to import a legacy CommonJS module. The `module.exports` were the default export in that case.

## VSCode settings.json
open your `settings.json` or `.vscode/settings.json`, add following keys
```jsonc
{
  //...
  "javascript.preferences.importModuleSpecifierEnding": "js",
  "typescript.preferences.importModuleSpecifierEnding": "js"
  //...
}
```

## Replace non extension of imports
add filename extensions to existing local imports (within a package):
### Method 1
- Open Search And Replace VSCode
- Insert below pattern to search input and check Regex Search Flag
```regexp
(^import.*\/((?!.js).)*)(['"];)$
```
- Insert below replacement pattern to replacement input
```regexp
$1.js$3
```
- Insert folder to `files to input` bar for example `src/`
- Replace all
![image](https://user-images.githubusercontent.com/12471057/160769725-41b16e7d-ef33-4886-8113-d59a30a63482.png)
### Method 2
-   Search: `^(import [^';]* from '(\./|(\.\./)+)[^';.]*)';`
-   Replace: `$1.js';`
