# SBG (Static Blog Generator)
Static Blog Generator Inspired Idea From HexoJS. because of HexoJS doesn't support 1000 posts on 8GB RAM device, i creating this project.

## Walkthrough
- I switched platforms from blogger to github page.
![image](https://user-images.githubusercontent.com/12471057/162500759-7bf0931e-ea5c-4925-b1cb-1653c9ba00bc.png)
- Using HexoJS for first time, and creating my own platform converter `Blogger to HexoJS` https://github.com/dimaslanjaka/hexo-blogger-xml
- After a few months, my posts have reached 800. hexojs is starting to become unfriendly, to the point that all my articles are corrupted (not rendered perfectly). And some posts got reduced from page rank.
- And i got confused, then iam creating this project

## compiler information
www.webmanajemen.com compiler [![Build](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/page.yml/badge.svg)](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/page.yml)

## features
- nodejs (12.x - 17.x supported)
- typescript (pure typescript commonjs with esmInterop project)
- ejs engine (ejs renderer)
- vscode ide integrated settings (development using vscode recommended)
- cache strategies (dont process any unmodified files to save memory usages)
- github pages deployer (merged instead clean old files to syncronize with cache strategy)
- 1000+ posts supported
- cross-platform supported (linux recommended) (android termux need c++ for packages including: jsdom, node-libcurl, imagemin, etc)

## project structure
- `src-posts/` contains all original posts with markdown formats
- `source/` (`config.source_dir` in `_config.yml`) contains all pages that should be on public directory (`config.public_dir` in `_config.yml`)
- database caches on `node_modules/.cache/dimaslanjaka`

## runner
before all, setup `_config.yml` first
```bash
gulp --tasks # to view all tasks
gulp copy # copy and process all src-posts to source/_posts
gulp generate # generate all source to public directory
gulp deploy # deploy to github pages
```

## todo
- [ ] admin panel
- [ ] template
- [ ] archives generator
- [x] sitemap

## contacts
- dimaslanjaka@gmail.com
- whatsapp +6285655667573

## incoming terms
- static blog generator
- termux static blog generator
- simple static blog generator
