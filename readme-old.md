## www.webmanajemen.com compiler
```yaml
tested on:
- [node] 12.22.6 & 14.8.1
```

# NodeJS Blogging System
todo:
- [ ] Admin Panel
- [x] Blogger XML Import `packages/hexo-blogger-xml`
- [x] External to local images `gulp article:img`
- [x] SEO improvement `packages/hexo-seo`

# Project Structure
- Source posts
  - ./src-posts write all source posts here
- Compiler
```shell
npm install
# Process articles from ./src-posts into ./source/_posts
npx gulp article:copy # safely using npx
# Generate blog
npx hexo generate
```

<!--<div hidden>
<img src="https://img.shields.io/website-up-down-green-red/https/webmanajemen.com.svg?style=flat-square&label=webmanajemen.com" hidden/>
<img src="https://img.shields.io/website.svg?down_color=red&down_message=down&style=flat-square&up_color=green&up_message=up&label=webmanajemen.com&url=http%3A%2F%2Fwebmanajemen.com" hidden />
<img src="https://img.shields.io/badge/webmanajemen.com-up-down-green-red" hidden/>
</div>-->

# Website using Hexo NodeJS Blogging System

[![Build And Tests](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/page.yml/badge.svg?branch=compiler)](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/page.yml)
[![GitHub](https://badgen.net/badge/icon/github?icon=github&label&style=flat-square)](https://github.com/dimaslanjaka/dimaslanjaka.github.io/tree/compiler)
[![webmanajemen.com](https://img.shields.io/website.svg?down_color=red&down_message=down&style=flat-square&up_color=green&up_message=up&label=webmanajemen.com&url=https://webmanajemen.com)](https://webmanajemen.com)

## hexo-adsense
[![npm version](https://badge.fury.io/js/hexo-adsense.svg?style=flat-square)](https://badge.fury.io/js/hexo-adsense)
[![Npm package yearly downloads](https://badgen.net/npm/dy/hexo-adsense?style=flat-square)](https://npmjs.com/package/hexo-adsense)
[![Minimum node.js version](https://badgen.net/npm/node/hexo-adsense?style=flat-square)](https://npmjs.com/package/hexo-adsense)
![GitHub repo size](https://img.shields.io/github/repo-size/dimaslanjaka/hexo-adsense?label=Repository%20Size&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/dimaslanjaka/hexo-adsense?color=blue&label=Last%20Commit&style=flat-square)

## hexo-seo
[![npm version](https://badge.fury.io/js/hexo-seo.svg?style=flat-square)](https://badge.fury.io/js/hexo-seo)
[![Npm package yearly downloads](https://badgen.net/npm/dy/hexo-seo?style=flat-square)](https://npmjs.com/package/hexo-seo)
[![Minimum node.js version](https://badgen.net/npm/node/hexo-seo?style=flat-square)](https://npmjs.com/package/hexo-seo)
![GitHub repo size](https://img.shields.io/github/repo-size/dimaslanjaka/hexo-seo?label=Repository%20Size&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/dimaslanjaka/hexo-seo?color=blue&label=Last%20Commit&style=flat-square)

## hexo-blogger-xml
[![npm version](https://badge.fury.io/js/hexo-blogger-xml.svg?style=flat-square)](https://badge.fury.io/js/hexo-blogger-xml)
[![Npm package yearly downloads](https://badgen.net/npm/dy/hexo-blogger-xml?style=flat-square)](https://npmjs.com/package/hexo-blogger-xml)
[![Minimum node.js version](https://badgen.net/npm/node/hexo-blogger-xml?style=flat-square)](https://npmjs.com/package/hexo-blogger-xml)
![GitHub repo size](https://img.shields.io/github/repo-size/dimaslanjaka/hexo-blogger-xml?label=Repository%20Size&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/dimaslanjaka/hexo-blogger-xml?color=blue&label=Last%20Commit&style=flat-square)
