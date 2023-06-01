# git-command-helper
GitHub CLI Helper For NodeJS. Parse responses from github CLI to NodeJS Object Oriented Programming (OOP).

[![npm version](https://img.shields.io/npm/v/git-command-helper?style=flat)](https://www.npmjs.com/package/git-command-helper)
[![npm - Known Vulnerabilities](https://snyk.io/advisor/npm-package/git-command-helper/badge.svg)](https://snyk.io/advisor/npm-package/git-command-helper)
[![github - Known Vulnerabilities](https://snyk.io/test/github/dimaslanjaka/git-command-helper/badge.svg)](https://snyk.io/test/github/dimaslanjaka/git-command-helper)

## Features
- Submodule parser
- Asynchronous friendly
- Git Conventional Commit Helpers

## Installation
```bash
npm i git-command-helper
```
Beta Version
```bash
npm i git-command-helper@https://github.com/dimaslanjaka/git-command-helper.git
```

## CLI usages
### Conventional Commits Helper
rename `cli` to `chore`|`feat`|`refactor`|`fix`
```bash
cli "header" "commit message line 2" "commit message line 3"
cli -s scopename "header" "commit message line 2" "commit message line 3"
cli -s scopename "message \`code\` another message"
```

## Documentations
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
