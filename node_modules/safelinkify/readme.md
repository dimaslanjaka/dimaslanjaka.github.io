# Safelinkify

![npm version](https://img.shields.io/npm/v/safelinkify?label=safelinkify&style=flat)
![www.webmanajemen.com](https://img.shields.io/website?down_color=red&down_message=down&label=www.webmanajemen.com&logo=www.webmanajemen.com&style=flat&up_color=green&up_message=up&url=https%3A%2F%2Fwww.webmanajemen.com)
![LICENSE](https://img.shields.io/npm/l/safelinkify)
![GitHub language count](https://img.shields.io/github/languages/count/dimaslanjaka/safelink)
![Github Workflow](https://github.com/dimaslanjaka/safelink/actions/workflows/build-release.yml/badge.svg)
![GitHub forks](https://img.shields.io/github/forks/dimaslanjaka/safelink)
![GitHub stars](https://img.shields.io/github/stars/dimaslanjaka/safelink)

Customized safelink url redirector. Transform and Anonymize all hyperlinks to outbound pages. Useful for SEO external links and ADS.

- **[API DOCUMENTATION](https://www.webmanajemen.com/docs/safelinkify)**
- **[MODULES](https://www.webmanajemen.com/docs/safelinkify/modules.html)**
- **[LIVE DEMO](https://www.webmanajemen.com/docs/safelinkify/demo)**

## Our Production
| page | source |
| :--- | :--- |
| [https://www.webmanajemen.com/page/safelink.html](https://www.webmanajemen.com/page/safelink.html) | [safelink-decode.js](https://github.com/dimaslanjaka/page/blob/master/safelink/safelink-decode.js) <br />[layout](https://github.com/dimaslanjaka/page/tree/master/safelink/layout1) <br/>[template](https://github.com/dimaslanjaka/page/blob/master/_layout.njk) <br />[compiler](https://github.com/dimaslanjaka/page/blob/1601e212200eaa7e8b4534ae7511b4fb6f179a96/gulpfile.js#L222) |

## Installation

### Bundles
| registry | link | commands |
| :--- | :--- | :---
| npm | [https://www.npmjs.com/package/safelinkify](https://www.npmjs.com/package/safelinkify) | `npm i safelinkify` |
| github | [https://github.com/dimaslanjaka/safelink](https://github.com/dimaslanjaka/safelink) | `npm i https://github.com/dimaslanjaka/safelink` |
| tarball | [https://github.com/dimaslanjaka/safelink/raw/master/release/safelinkify.tgz](https://github.com/dimaslanjaka/safelink/raw/master/release/safelinkify.tgz) | `npm i https://github.com/dimaslanjaka/safelink/raw/master/release/safelinkify.tgz` |

### npm
```bash
npm install safelinkify --production
```

### yarn
```
yarn install safelinkify --production=true
```

## Development
```bash
git clone --single-branch --branch main https://github.com/dimaslanjaka/safelink foldername
cd foldername
# install dependents
yarn install
# or
npm install
```

| command      | description                       |
| ------------ | --------------------------------- |
| `yarn start`    | serve generated docs           |
| `tsc`           | build definition and js files  |
| `webpack`       | build safelink script          |
| `npm run docs`  | build docs |
| `npm run build` | build dist |
| `ts-node old-docs.ts` | (_deprecated_) watch src-docs and start server, watch src and compile tsc webpack |

## Usages
Setup options:
```js
const options = {
  // exclude patterns (dont anonymize these patterns)
  exclude: ['domain.com', /another.domain.com/, /https?:\/\/?(?:([^*]+)\.)?webmanajemen\.com/, /([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/],
  // url redirector
  redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
  // debug
  verbose: false,
  // encryption type = 'base64' | 'aes'
  type: 'base64',
  // password aes, default = root
  password: 'unique-password'
}
```
### Browser
script location: `node_modules/safelinkify/dist/bundle.min.js`.

Call Core Script:
```html
<script src="dist/bundle.min.js"></script>
<!--or using rawgit-->
<script src="https://raw.githack.com/dimaslanjaka/safelink/main/dist/bundle.min.js"></script>
<!--or using statically-->
<script src="https://cdn.statically.io/gh/dimaslanjaka/safelink/main/dist/bundle.min.js"></script>
```

Execute functions:
```html
<script>
  const sf = new safelink(options);
  // automated safelinkify all hyperlinks in body
  sf.parse(document.querySelector('body')).then((result)=>{
    console.log(result);
    // in page redirector
    sf.resolveQueryUrl(window.location.href);
  });
</script>
```

### NodeJS
#### Reference Examples:
- [full sample](https://github.com/dimaslanjaka/safelink/blob/main/src/index.test.ts)
- [https://github.com/dimaslanjaka/page/blob/master/gulpfile.js](https://github.com/dimaslanjaka/page/blob/master/gulpfile.js)

#### Import list
```js
const { safelink } = require('safelinkify');
const { default: safelink } = require('safelinkify/dist/safelink');
```
#### Usages Example
```ts
import safelinkify from 'safelinkify';
// const safelinkify = require('safelinkify')
const sf = new safelinkify.safelink(options);
const processedExternalLinks = sf.parse(`
<a href="www.example.com/page.php?id=xxxx&name=yyyy" ....>external</a>
<a href="http://www.example.com/page.php?id=xxxx&name=yyyy" ....>external</a>
<a href="https://www.example.com/page.php?id=xxxx&name=yyyy" ....>external</a>
<a href="www.example.com/page.php/404" ....></a>
<a href="http://external.domain.com">internal</a>
<a href="http://www.webmanajemen.com">internal</a>
<a href="http://webmanajemen.com">internal</a>
<a href="#http://webmanajemen.com">#internal</a>
<a href="?http://webmanajemen.com">?internal</a>
<a href="">internal</a>
`);
processedExternalLinks.then(console.log);

/*
<a href="www.example.com/page.php?id=xxxx&name=yyyy" ....>external</a>
<a href="https://www.webmanajemen.com/page/safelink.html?url=aHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYWdlLnBocD9pZD14eHh4Jm5hbWU9eXl5eQ==" ....>external</a>
<a href="https://www.webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vcGFnZS5waHA/aWQ9eHh4eCZuYW1lPXl5eXk=" ....>external</a>
<a href="www.example.com/page.php/404" ....></a>
<a href="http://external.domain.com">internal</a>
<a href="http://www.webmanajemen.com">internal</a>
<a href="http://webmanajemen.com">internal</a>
<a href="#http://webmanajemen.com">#internal</a>
<a href="?http://webmanajemen.com">?internal</a>
<a href="">internal</a>
*/
```

#### Using gulp
Reference Examples:
- [https://github.com/dimaslanjaka/page/gulpfile.js](https://github.com/dimaslanjaka/page/blob/a2f16cb5470992ac149204fdca621d1bcac1107c/gulpfile.js#L325)

Usages:
```typescript
import gulp from 'gulp'
import sf from 'safelinkify'
import { toUnix, join } from 'upath'
import through2 from 'through2'

// folder to scan
const destDir = join(__dirname, 'build')
// scan external link to safelink from dest dir
gulp.task('safelink', () => {
  const safelink = new sf.safelink({
    // exclude patterns (dont anonymize these patterns)
    exclude: [
      /https?:\/\/?(?:([^*]+)\.)?webmanajemen\.com/,
      /([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/
    ],
    // url redirector
    redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
    // debug
    verbose: false,
    // encryption type = 'base64' | 'aes'
    type: 'base64',
    // password aes, default = root
    password: 'unique-password'
  })
  return gulp
    .src(['**/*.html'], {
      cwd: destDir,
      ignore: [
        // exclude non-website and react production files
        '**/tmp/**',
        '**/node_modules/**',
        '**/monsters/**/*',
        '**/attendants/**/*',
        '**/materials/**/*',
        '**/scenic-spots/**/*',
        '**/static/**/*'
      ]
    })
    .pipe(
      through2.obj(async (file, _enc, next) => {
        // drop null
        if (file.isNull()) return next()
        // do safelinkify
        const content = String(file.contents)
        const parsed = await safelink.parse(content)
        if (parsed) {
          file.contents = Buffer.from(parsed)
          next(null, file)
        } else {
          console.log(
            'cannot parse',
            toUnix(file.path).replace(toUnix(process.cwd()), '')
          )
          next()
        }
      })
    )
    .pipe(gulp.dest(destDir))
})
```
