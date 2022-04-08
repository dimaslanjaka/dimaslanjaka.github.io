# SBG (Static Blog Generator)

www.webmanajemen.com compiler [![Build](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/page.yml/badge.svg)](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/page.yml)

## features
- nodejs
- typescript
- ejs engine (ejs renderer)
- vscode ide integrated settings
- cache strategies (dont process any unmodified files to save memory usages)
- github pages deployer (merged instead clean old files to syncronize with cache strategy)
- 1000+ posts supported
- cross-platform supported (linux recommended)

## project structure
- `src-posts/` contains all original posts with markdown formats
- `source/` (`config.source_dir` in `_config.yml`) contains all pages that should be on public directory (`config.public_dir` in `_config.yml`)

## runner
before all, setup `_config.yml` first
```bash
gulp --tasks # to view all tasks
gulp copy # copy and process all src-posts to source/_posts
gulp generate # generate all source to public directory
gulp deploy # deploy to github pages
```

## todo
- admin panel
- template

## contacts
- dimaslanjaka@gmail.com
- +6285655667573
