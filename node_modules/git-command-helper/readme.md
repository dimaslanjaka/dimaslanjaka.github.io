# git-command-helper
GitHub CLI Helper For NodeJS. Parse responses from github CLI to NodeJS Object Oriented Programming (OOP).

[![npm version](https://img.shields.io/npm/v/git-command-helper?style=flat)](https://www.npmjs.com/package/git-command-helper)
[![git-command-helper](https://snyk.io/advisor/npm-package/git-command-helper/badge.svg)](https://snyk.io/advisor/npm-package/git-command-helper)

## Features
- Submodule parser
- Asynchronous friendly

## Installation
Beta Version
```bash
npm i https://github.com/dimaslanjaka/git-command-helper.git
```
### to update beta version
```bash
npm update git-command-helper
```
Production Version
```bash
npm i git-command-helper
```

## Documentation
- [API documentation](https://www.webmanajemen.com/docs/git-command-helper/)
- [modules](https://www.webmanajemen.com/docs/git-command-helper/modules.html)
- [main class](https://github.com/dimaslanjaka/git-command-helper/blob/master/src/index.ts)

## Usages

Example
```js
import git from 'git-command-helper' // const git = require('git-command-helper').default
// start current dir
const github = new git(__dirname)
// get current status
git.status().then(console.log)
// get submodule informations
if (git.submodule.hasSubmodule()) console.log(git.submodule.get());
```

## Custom Command
```js
github.spawn('git', ['fetch'], { stdio: 'pipe' }).then(console.log)
```

## Another Examples
- [Usage Example With Gulp v4](https://github.com/dimaslanjaka/static-blog-generator-hexo/blob/master/gulpfile.js)

## Links
- [My Blog](https://www.webmanajemen.com)
- [About Me](https://www.webmanajemen.com/about)
- [Git Explorer](https://gitexplorer.com/)
