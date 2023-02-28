# nodejs-package-types
Customized Package Types ([See all modules](https://github.com/dimaslanjaka/nodejs-package-types#modules)). Since it is very difficult to do a pull request to `https://github.com/DefinitelyTyped/DefinitelyTyped`, I made my own typescript file definition. This module can make it easier for you to develop a program or library.

## Installation

> Using tarball is useful for git which not installed properly

| description | link |
| :--- | :--- |
| short link | https://bit.ly/nodejs-package-types |
| full link tarball (recommended) | https://github.com/dimaslanjaka/nodejs-package-types/raw/main/release/nodejs-package-types.tgz |
| repository tarball | https://github.com/dimaslanjaka/nodejs-package-types/tarball/main |

### Modules
| package names | link | description |
| :--- | :--- | :--- |
| @types/skelljs, ~@types/rimraf,~ @types/kill-port, @types/markdown-it-abbr, @types/markdown-it-footnote, @types/markdown-it-image-figures, @types/markdown-it-mark, @types/markdown-it-sub, @types/markdown-it-sup | https://github.com/dimaslanjaka/nodejs-package-types/raw/main/release/nodejs-package-types.tgz | all sub modules automatically detected by VSCode and Typescript |
| @types/hexo | https://github.com/dimaslanjaka/nodejs-package-types/raw/hexo/release/types-hexo.tgz |
| @types/hexo-util | https://github.com/dimaslanjaka/nodejs-package-types/raw/main/hexo-util/release/types-hexo-util.tgz |
| @types/through2 | https://github.com/dimaslanjaka/nodejs-package-types/raw/through2/release/types-through2.tgz |

yarn
```bash
yarn add https://github.com/dimaslanjaka/nodejs-package-types/raw/main/release/nodejs-package-types.tgz --dev
```
npm
```bash
npm i https://github.com/dimaslanjaka/nodejs-package-types/raw/main/release/nodejs-package-types.tgz -D
```

**OR** you can visit [GitPkg](https://gitpkg.vercel.app/) and insert which branch or subfolder you want to install

## Troubleshooting

error case
```log
npm ERR! command git --no-replace-objects ls-remote ssh://git@github.com...
npm ERR! git@github.com: Permission denied (publickey).
npm ERR! fatal: Could not read from remote repository.
```

dump your ssh
```bash
ssh -vT git@github.com
```

fix by (source: https://stackoverflow.com/a/72906559)
```bash
git config --global url."https://github.com/".insteadOf ssh://git@github.com/
git config --global url."https://github.com/".insteadOf git@github.com:
git config --global url."https://".insteadOf ssh://
npm install https://github.com/dimaslanjaka/nodejs-package-types.git#main --legacy-peer-deps
```

if `git` not installed properly, try installing from repository tarball (source: https://stackoverflow.com/a/32436218)
```bash
npm i https://github.com/dimaslanjaka/nodejs-package-types/tarball/main
```

## Usages

add below codes to `tsconfig.json` for included in vscode types
```jsonc
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@types",
      "./node_modules/nodejs-package-types/typings"
    ],
    "types": ["node", "nodejs-package-types"]
  }
}
```
**OR** just include the types to `tsconfig.json`
```jsonc
{
  "compilerOptions": {
    "types": ["nodejs-package-types"]
  }
}
```

**OR** add to single file
```ts
import 'nodejs-package-types';
// or
import 'nodejs-package-types/typings/index';
```
**OR** using triple slash reference at top JS or TS files
```ts
/// <reference types="nodejs-package-types" />
```

Using at local package (development)
```shell
git submodule add https://github.com/dimaslanjaka/nodejs-package-types.git packages/@types
npm i -D ./packages/@types/hexo
npm i -D ./packages/@types/hexo-bunyan
npm i -D ./packages/@types/hexo-log
```
