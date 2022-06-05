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
[![webmanajemen.com](https://img.shields.io/website.svg?down_color=red&down_message=down&style=flat-square&up_color=green&up_message=up&label=webmanajemen.com&url=https://webmanajemen.com)](https://webmanajemen.com) [![Build](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/page.yml/badge.svg)](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/page.yml) [![Join the chat at https://gitter.im/static-blog-generator/static-blog-generator](https://badges.gitter.im/static-blog-generator/static-blog-generator.svg)](https://gitter.im/static-blog-generator/static-blog-generator?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![DeepScan grade](https://deepscan.io/api/teams/17454/projects/20813/branches/578444/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=17454&pid=20813&bid=578444)

<!--### temporarily disabled
- gulp server : because of major changes, were disabled gulp local server, use php local server instead
-->
## features
- nodejs (12.x - 17.x supported)
- typescript (pure typescript commonjs with esmodule interop project)
- ejs engine (template renderer)
- markdown engine (using markdown-it support footnotes, sup, sub, etc)
- vscode ide integrated settings (development using vscode recommended)
- cache strategies (dont process any unmodified files to save memory usages)
- github pages deployer (merged instead clean old files to syncronize with cache strategy)
- 1000+ posts supported
- cross-platform supported
- > Support required packages including: node-gyp, jsdom, node-libcurl, imagemin, etc:
- - linux recommended
- - windows need msvs [[read gist](https://gist.github.com/jtrefry/fd0ea70a89e2c3b7779c)]
- - android termux need c++

## Project Installation
Always use `npm` to install. `yarn` and `pnpm` not always compatible.
```bash
# install global packages
npm i -g npm gulp-cli typescript ts-node
# clone
git clone --branch compiler --single-branch https://github.com/dimaslanjaka/dimaslanjaka.github.io foldername
# cd
cd foldername
# fetch all submodules
git submodule update --recursive --remote
# checkout local branch
git checkout compiler
# delete posts (don't copy my articles)
rm -rf src-posts/*
# create tmp folder
mkdir tmp
# install dependencies
npm install
```

## project structure
- `src-posts/` contains all original posts with markdown formats (ejs shortcodes supported)
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
you can pass argument `--nocache` (this will automatically overriden global generator cache in [_config.yml](_config.yml))
```bash
gulp generate --nocache # generate all without reading cache, write new cache (fresh generate) instead
gulp server --nocache # development without reading cache, write fresh cache instead
```
or you can put global generator in `_config.yml`
```yaml
generator:
  cache: false # this will ignore any caching functions
```

### standalone
Standalone: is useful for low device to run one by one the tasks. more information run: `gulp --tasks`.
- `copy:` copy and process from `src-posts` to `config.source_dir` in [_config.yml](./_config.yml)
- `generate:` render all files from `config.source_dir` to generated folder `config.public_dir` in [_config.yml](./_config.yml) then ready to publish
- read more example: [page.yml#L80](https://github.com/dimaslanjaka/dimaslanjaka.github.io/blob/c9c113ed51b2a6bbe50edc0ffd3d691980776a0f/.github/workflows/page.yml#L80-L112)
```bash
gulp clean # clean all caches
gulp copy:assets # copy post assets
gulp copy:posts # copy and process posts
gulp copy:remove-inline-style # remove inline style from html source/_posts (useful for migrated from blogger)
gulp copy:blogger # <series>(copy:assets, copy:posts, copy:remove-inline-style)
gulp generate:assets # copy all assets
gulp generate:template # copy and process template
gulp generate:posts # generate posts
gulp generate:sitemap # generate sitemaps
gulp generate:tags # generate tags
gulp generate:categories # generate categories
gulp generate:label # generate tags and categories
gulp generate:index # generate homepage index
gulp generate:archive # generate homepage, tags, and categories
gulp generate:feeds # generate atom, rss
gulp generate:after # process generated posts html including anonymize external links (safelinkify), add rel nofollow external link, etc
gulp generate:minify # minify all html,css,js on public_dir in _config.yml
```

## Github Action
~important: always run `gulp clean` to prevent deleted files on origin repository **https://github.com/JamesIves/github-pages-deploy-action/discussions/1070**~

## PHP Local Server
https://askubuntu.com/questions/64095/change-xampps-htdocs-web-root-folder-to-another-one
https://stackoverflow.com/questions/7337724/how-to-check-whether-mod-rewrite-is-enable-on-server
https://stackoverflow.com/questions/10878284/virtual-hosts-xampp-linux-ubuntu-not-working

## Troubleshoot
- css and js files not found
> bypass using `.nojekyll`
> It is now possible to completely bypass Jekyll processing on GitHub Pages by creating a file named `.nojekyll` in the root of your pages repo and pushing it to GitHub. This should only be necessary if your site uses files or directories that start with underscores since Jekyll considers these to be special resources and does not copy them to the final site.

## todo
- [ ] admin panel
- [ ] download external images to local
- [ ] GUI
- [x] template
- [x] archives generator
- [x] multiple type of sitemap (google news, sitemap text, sitemap html, sitemap xml)

## contacts
- dimaslanjaka@gmail.com
- whatsapp +6285655667573

## incoming terms
- nodejs static blog generator
- nodejs termux static blog generator
- nodejs simple static blog generator
