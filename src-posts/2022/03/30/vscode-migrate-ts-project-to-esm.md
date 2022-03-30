---
title: VSCode Migrate Typescript CommonJS to ESM
cover: https://res.cloudinary.com/practicaldev/image/fetch/https://opengraph.githubassets.com/51ab140e160882668aa0f466b095b5bb634739d04b8095f768d1741def9280f2/inmanta/vscode-inmanta/issues/314
date: 2022-03-30T06:57:37+0000 
updated: 2022-03-30T06:57:37+0000 
---

## How to migrate typescript commonjs to esm with vscode

## package.json
add following key to package.json
```jsonc
{
  "type": "module"
  //...
}
```

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

## Replace non extension of imports
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
