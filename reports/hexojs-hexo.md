<!-- NOTE:

针对简体中文用户的提示：在提交 issue 时请不要删除下面的模板，按照步骤提供相关信息将有助于我们调查你的问题。请尽量使用英语描述你的问题，这可以让更多的人帮助到你。

A good bug report should have your configuration and build environment information, which are essential for us to investigate the problem. We've provided the following steps on how to attach the necessary information.

If you find that markdown files are not rendered as expected, please go to https://marked.js.org/demo/ to see if it can be reproduced there. If it can be reproduced, please file a bug to https://github.com/markedjs/marked.

If you want help on your bug, please also send us the git repository (GitHub, GitLab, Bitbucket etc...) where your hexo code is stored. It would greatly help. If you prefer not to have your hexo code out in public, please upload to a private GitHub repository and grant read-only access to hexojs/core.

Please take extra precaution not to attach any secret environment variables (likes password or GitHub Personal Access Token).

-->

## Check List

Please check followings before submitting a new issue.

- [x] I have already read [Docs page](https://hexo.io/docs/) & [Troubleshooting page](https://hexo.io/docs/troubleshooting)
- [x] I have already searched existing issues and they are not help  to me
- [x] I examined error or warning messages and it's difficult to solve
- [x] Using [the latest](https://github.com/hexojs/hexo/releases) version of Hexo (run `hexo version` to check)
- [x] Node.js is higher than [minimum required version](https://hexo.io/docs/#Minimum-required-Node-js-version)

## Behavior
just clone from [hexojs/site](https://github.com/hexojs/site), modify config, copy post from [hexojs/hexo-theme-unit-test](https://github.com/hexojs/hexo-theme-unit-test) (source, scaffold)

## How to reproduce?

* https://github.com/dimaslanjaka/dimaslanjaka.github.io/tree/06cc377573b0f7203a740b45dfd09f829644f31e


## Is the problem still there under "Safe mode"?

<!--
https://hexo.io/docs/commands#Safe-mode

"Safe mode" will disable all the plugins and scripts.
If your problem disappear under "Safe mode" means the problem is probably at your newly installed plugins, not at hexo.
-->

**YES**

## Environment & Settings

**Node.js & npm version(`node -v && npm -v`)**

<!--
Please paste the output between two "```" provided below
-->

```
v16.13.0
8.12.1
```

**Your site `_config.yml`** (Optional)

<!--
Please paste the content of your _config.yml between two "```" provided below
-->

```yaml
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: "WMI"
subtitle: "Website Management Indonesia"
description: Website Management Indonesia is a blog about scripts, tips and tricks, games, software. Covering php, javascript, jquery, mysql, seo, e-commerce and others.
keywords: the legend of neverland, genshin impact, games, how to, tips and tricks, php, javascript, jquery, mysql, seo, e-commerce
language:
  - en
  - id
timezone: "Asia/Jakarta"

# https://github.com/wzpan/hexo-generator-search
# https://github.com/next-theme/hexo-generator-searchdb
search:
  path: search.xml
  field: post
  content: true
  format: html
  #template: ./template/search.xml

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://www.webmanajemen.com/
root: /
permalink: :title.html #:title/
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks

# Directory
source_dir: source
public_dir: docs
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
# https://hexo.io/docs/configuration.html
skip_render:
  - "**/node_modules"
  - "yandex_*"
  - "ahrefs_*"
  - "glx_*"
  - "Midi"
  - "Midi/**/*"
  - "backend"
  - "backend/**/*"
  # https://github.com/hexojs/hexo/issues/1797
  - "*.json"
  - "**/*.json"
  - "_posts/**/*.json"
  - "_posts/**/*.js"
  - "_posts/**/*.css"
  - "_posts/The Legend Of Neverland/Midi/readme.md"
  - "**/__test__/**"
  - "_posts/Chimeraland/**/*.html"

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link:
  enable: true # Open external links in new tab
  field: site # Apply to the whole site
  exclude: ""
filename_case: 0
render_drafts: false

# https://hexo.io/docs/asset-folders
post_asset_folder: true

relative_link: false
future: true
# https://github.com/hexojs/hexo-util
# https://hexo.io/docs/syntax-highlight.html
highlight:
  enable: true
  line_number: false
  auto_detect: false
  tab_replace: "  " # replace tabs with 2 spaces
  wrap: false
  hljs: false
prismjs:
  enable: false
  preprocess: true
  line_number: true
  tab_replace: ""

# Home page setting
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: ""
  per_page: 10
  order_by: -updated #updated | date

# Category & Tag

default_category: uncategorized
default_tag:
category_map:
tag_map:

# Metadata elements
## https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
meta_generator: true

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

## Use post's date for updated date unless set in front-matter
updated_option: false

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Include / Exclude file(s)
## include:/exclude: options only apply to the 'source/' folder
include:
exclude:
  - "**/.git"
  - "**/MIDI.js/**"
  - "**/{readme,README,changelog,CHANGELOG}.md"
  - "**/Test/**"
  - "**/guzzle/**"
  - "**/exclude/**"
  - "**/hexo-post-parser/**"
ignore:

# https://www.npmjs.com/package/hexo-server
server:
  port: 4000
  log: false
  ip: 0.0.0.0
  #host: adsense.webmanajemen.com
  #proxy: adsense.webmanajemen.com
  compress: false
  cache: false
  header: false
  serveStatic:
    extensions:
      - html

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/

theme: butterfly

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: https://github.com/dimaslanjaka/dimaslanjaka.github.io
  branch: master
  message: "Git Deployment: {{ now('YYYY-MM-DD HH:mm:ss') }}"

author:
  name: "Dimas Lanjaka"
  link: "https://www.webmanajemen.com/"
  image:
    url: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://imgdb.net/images/3600.jpg
    width: 1944 # <= 600
    height: 2592 # >= 60

social_links:
  github: https://github.com/dimaslanjaka
  youtube: https://youtube.com/p/L3n4r0x

# Feed Atom https://github.com/hexojs/hexo-generator-feed
feed:
  # include contents in feeds
  content: true
  # Generate both atom and rss2 feeds
  type:
    - atom
    - rss2
  path:
    - atom.xml
    - rss.xml

# Sitemap
sitemap:
  path: sitemap.xml

# https://github.com/sergeyzwezdin/hexo-related-posts#Configuration
related_posts:
  enabled: true
  enable_env_name: prod
  filter_threshold: 0.3
  related_count: 3
  weight:
    title: 0.05
    description: 0.05
    keywords: 0.01
    tags: 0.005
    categories: 0.005
    text: 1
  stemmers:
    - en
    - ru
    - id
  reserved:
    - asp.net
    - vs.net
    - ado.net
    - .net
    - games
    - js
    - ts

# https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus.git
markdown_it_plus:
  highlight: true
  html: true
  xhtmlOut: true
  breaks: true
  langPrefix:
  linkify: true
  typographer:
  #quotes: “”‘’
  pre_class: highlight
  plugins:
    - plugin:
        # https://www.npmjs.com/package/markdown-it-attrs
        name: markdown-it-attrs
        enable: true
        options:
          leftDelimiter: "{"
          rightDelimiter: "}"
          allowedAttributes: [] # empty array = all attributes are allowed
```

**Hexo and Plugin version(`npm ls --depth 0`)**

<!--
Please paste the output between two "```" provided below
-->

```
hexo-wmi@0.0.0 /media/dimaslanjaka/DATA/Repositories/gh-pages
├── eslint@8.16.0
├── gulp@4.0.2
├── hexo-generator-archive@1.0.0
├── hexo-generator-category@1.0.0
├── hexo-generator-index@2.0.0
├── hexo-generator-tag@1.0.0
├── hexo-github-card@1.0.5
├── hexo-pdf@1.1.1
├── hexo-renderer-marked@5.0.0
├── hexo-renderer-stylus@2.1.0
├── hexo-server@3.0.0
├── hexo-theme-butterfly@4.3.0-b2 -> ./themes/butterfly
├── hexo@6.2.0
├── npm-run-all@4.1.5
├── prettier@2.6.2
├── static-blog-generator@2.0.7-beta-1867bdc5a3
└── ts-node@10.8.0
```

**Your package.json `package.json`**

<!--
Please paste the content of package.json between two "```" provided below
-->

```json
{
  "name": "hexo-wmi",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "deploy": "hexo deploy",
    "server": "hexo server",
    "list": "npx syncpack list-mismatches",
    "preinstall": "node preinstall.js",
    "reinstall": "npm-run-all -s reinstall:**",
    "reinstall:hpp": "npm install git+https://github.com/dimaslanjaka/hexo-post-parser.git -D --ignore-scripts --ignore-platforms",
    "reinstall:sbg": "npm install git+https://github.com/dimaslanjaka/static-blog-generator.git#dev -D --ignore-scripts --ignore-platforms",
    "reinstall:ps": "npm install git+https://github.com/dimaslanjaka/persistent-cache.git#improve2 -D --ignore-scripts --ignore-platforms",
    "reinstall:sf": "npm install git+https://github.com/dimaslanjaka/safelink.git -D --ignore-scripts --ignore-platforms",
    "reinstall:rebuild": "npm rebuild",
    "reinstall:audit": "npm audit fix"
  },
  "hexo": {
    "version": "6.2.0"
  },
  "dependencies": {
    "hexo": "^6.2.0",
    "hexo-generator-archive": "^1.0.0",
    "hexo-generator-category": "^1.0.0",
    "hexo-generator-index": "^2.0.0",
    "hexo-generator-tag": "^1.0.0",
    "hexo-github-card": "^1.0.5",
    "hexo-pdf": "^1.1.1",
    "hexo-renderer-marked": "^5.0.0",
    "hexo-renderer-stylus": "^2.1.0",
    "hexo-server": "^3.0.0",
    "hexo-theme-butterfly": "file:./themes/butterfly"
  },
  "devDependencies": {
    "eslint": "^8.16.0",
    "gulp": "^4.0.2",
    "npm-run-all": "^4.1.5",
    "prettier": "2.6.2",
    "static-blog-generator": "https://github.com/dimaslanjaka/static-blog-generator/raw/dev/release/development.tgz",
    "ts-node": "^10.8.0"
  }
}
```

## Others

<!-- If you have other information. Please write here. -->
![image](https://user-images.githubusercontent.com/12471057/171951617-f8f64215-a4e9-4f28-b55d-f11485a18d98.png)
