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
```json
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
    // Needed for CommonJS modules
    "allowSyntheticDefaultImports": true, // (C)
    // Compile d.ts
    "declaration": true,
  }
}
```

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
