# SBG (Static Blog Generator) Project
Static Blog Generator Inspired Idea From HexoJS. because of HexoJS doesn't support 1000 posts on 8GB RAM device, i creating this project.

<details>
  <summary>Walkthrough</summary>

  ## Project Walkthrough
  - I switched platforms from blogger to github page.
  ![image](https://user-images.githubusercontent.com/12471057/162500759-7bf0931e-ea5c-4925-b1cb-1653c9ba00bc.png)
  - Using HexoJS for first time, and creating my own platform converter `Blogger to HexoJS` https://github.com/dimaslanjaka/hexo-blogger-xml
  - After a few months, my posts have reached 800. hexojs is starting to become unfriendly, to the point that all my articles are corrupted (not rendered perfectly). And some posts got reduced from page rank.
  - And i got confused, then iam creating this project
</details>

## compiler information
www.webmanajemen.com compiler [![Build](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/page.yml/badge.svg)](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/page.yml)

## features
- nodejs (12.x - 17.x supported)
- typescript (pure typescript commonjs with esmodule interop project)
- ejs engine (template renderer)
- markdown engine (using markdown-it support footnotes, sup, sub, etc)
- vscode ide integrated settings (development using vscode recommended)
- cache strategies (dont process any unmodified files to save memory usages)
- github pages deployer (merged instead clean old files to syncronize with cache strategy)
- 1000+ posts supported
- cross-platform supported (linux recommended) (android termux need c++ for packages including: jsdom, node-libcurl, imagemin, etc)

## Installation
```bash
git clone --single-branch --branch compiler https://github.com/dimaslanjaka/dimaslanjaka.github.io foldername
cd foldername
git checkout compiler
mkdir tmp
npm install
```

## project structure
- `src-posts/` contains all original posts with markdown formats
- `source/` (`config.source_dir` in [_config.yml](./_config.yml)) contains all pages that should be on public directory (`config.public_dir` in [_config.yml](./_config.yml))
- database caches on `node_modules/.cache/dimaslanjaka`

## runner
before all, setup `_config.yml` first
```bash
gulp --tasks # to view all tasks
gulp clean # clean cache, generated caches, tmp folder, databases
gulp copy # copy and process all src-posts to source/_posts
gulp generate # generate all source to public directory
gulp deploy # deploy to github pages
gulp server # development, render on-fly
```
### no cache
```bash
gulp generate --nocache # generate all without reading cache instead write new cache (fresh generate)
gulp server --nocache # development without reading cache, instead write fresh cache
```
### standalone
Standalone: is useful for low device to run one by one the tasks. more information run: `gulp --tasks`.
- `copy:` copy and process from `src-posts` to `config.source_dir` in [_config.yml](./_config.yml)
- `generate:` from `config.source_dir` to generated folder `config.public_dir` in [_config.yml](./_config.yml)
```bash
gulp clean # clean all caches
gulp copy:assets # copy post assets
gulp copy:posts # copy and process posts
gulp generate:assets # copy all assets
gulp generate:template # copy and process template
gulp generate:posts # generate posts
gulp generate:sitemap # generate sitemaps
gulp generate:label # generate tags and categories
gulp generate:index # generate homepage index
gulp generate:archive # generate homepage, tags, and categories
gulp generate:feeds # generate atom, rss
```

## Github Action
important: always run `gulp clean` to prevent deleted files on origin repository **https://github.com/JamesIves/github-pages-deploy-action/discussions/1070**

## todo
- [ ] admin panel
- [ ] template
- [ ] archives generator
- [x] multiple type of sitemap (google news, sitemap text, sitemap html, sitemap xml)

## contacts
- dimaslanjaka@gmail.com
- whatsapp +6285655667573

## incoming terms
- nodejs static blog generator
- nodejs termux static blog generator
- nodejs simple static blog generator
