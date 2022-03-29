---
title: disable vscode alert File is a CommonJS module; it may be converted to an ES module
subtitle: disable vscode alert File is a CommonJS module; it may be converted to an ES module
cover: https://i.stack.imgur.com/Xo2sA.png
date: 2022-03-26T04:27:16+0000
updated: 2022-03-26T04:27:16+0000
tags:
  - TS
  - JS
  - IDE
---

# File is a CommonJS module; it may be converted to an ES module
This is a new feature added in Visual Studio Code called "Suggestion Code Actions". "Suggestion Code Actions" are enabled by default in JavaScript and TypeScript.

You can disable them by setting: `"typescript.suggestionActions.enabled": false` or `"javascript.suggestionActions.enabled": false` in your user/workspace settings. The documentation can be found [here](https://code.visualstudio.com/docs/getstarted/settings).

### open settings.json file
insert below option
```jsonc
{
    "javascript.suggestionActions.enabled": false, // disable vscode alert on javascript
    "typescript.suggestionActions.enabled": false // disable vscode alert on typescript
}
```

### [Preview Example] it should be looks like:
![Preview Setting](https://i.stack.imgur.com/2AUwp.png)

## This solution also fix vscode alerts below
- fix vscode alert This may be converted to an async function.