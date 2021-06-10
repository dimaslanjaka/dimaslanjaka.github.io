## Theme Configuration

### Set Support Language
To edit the root `_config.yml` file:
```yml
language: en
```
Now, Web-Nary support only one kinds of language:

| language|  code  |
| ------- | ----- |
| English | en |

### Configure the Menu

To edit the root `_config.yml` file and set the `menu` item：
``` yml
menu:
  home: / 
  archive: /archives
  about: /about
```

**Default menu Items**：

| key | value | display text|
| --- | ----- | ---------------- |
| home | home: / | home |
| archive | archive: /archives | archives |
| about | about: /about | about |
| search | search: /search | search | 

Then, you need create `about`,`search` and `404` page manually:

create the about page:
```shell
hexo new page about
```
edit the `index.md` file in the root `source/about` folder:

``` md
---
title: about
date: 2020-07-29 00:50:51
type: about
layout: about
---

...(the below content will be redenered in the about page)
```

create the search page:
``` shell
hexo new page search
```
edit the `index.md` file in the root `source/search` folder:
``` md
---
title: search
date: 2020-07-29 00:50:51
type: search
layout: search
---
```

To create the 404 page, create the `404.md` file in the source directory and edit this file:
``` md
---
title: 404 Page Not Found
date: 2020-07-29 23:36:59
type: error
layout: error
---
```

####  Blog Content Configuration

to edit the root `_config.yml` file：
``` yml
# Site
# blog's title
title: "Web Nary"

# subtitle in the banner header
subtitle: "WebNary Blog"

# introduction  in the banner header
subtitle_desc: "An Initiative by Community"

# seo keyword
keywords: dfcommunity, community blog, web-nary, open-source, library, node.js, javascript

# blog description（for seo）
description: A Hexo Flat Modular Theme

# self introduction
introduction: Hello World!

# your blog favicon icon, support two ways: local and online. the local way need you to put the icon under  themes/hexo-theme-Web-Nary/source/img directory
favicon_ico: "Set Your Favicon Logo"

# blog logo icon in the upper left corner. support the local way and online way. 
logo: "Set your Your Logo here"

# avatar
avatar: "Set your Your Avatar here"
# qrcode: http://oo12ugek5.bkt.clouddn.com/images/qrcode.png

# page default cover
default_cover: "Set your Your Default Page Cover here"

# header background picture
header_cover: "Set your Header Cover Here"

# 404 page background picture
error_page_bg: "Set your Your Error Logo here"

# page loading icon
loader_img: "Set your Your Preloader image/gif here"

# author information
author:
  name: Barvo 68 Web
  link: https://github.com/Bravo 68 Web

# footer information
about:
  info: A Community Theme Made by Delta Force Community
  address: <your address here>
  email: admin@example.com
```


#### Contact Information Configuration

create `contact.yml` under the `/source/_data` (This configuration will create links in the page footer):

![contact-img](https://blog.static.minfive.com/other/17-09-17/hexo-theme-Web-Nary-contact.png)

``` yml
- title: github
  icon: icon-github
  link: https://github.com/Mrminfive
- title: email
  icon: icon-email
  link: mailto:chenxiaowu1994@outlook.com
- title: rss
  icon: icon-rss
  link: /atom.xml
```
`icon` only support these values：
* `icon-email`: email
* `icon-rss`: rss
* `icon-in`: linkedin
* `icon-twitter`: twitter
* `icon-facebook`: facebook
* `icon-github`: github
* `icon-zhihu`: zhihu
* `icon-douban`: douban
* `icon-weibo`: weibo
* `icon-telegram`: telegram

#### External Link Configuration
create `footer_link.yml` under the `source/_data` directory(This configuration will create links in the page footer):
![footer-link](https://blog.static.minfive.com/other/17-09-17/hexo-theme-Web-Nary-footer.png)

``` yml
friend_links:
  - name: hexo-webnary-theme
    desc: hexo-webnary-theme
    link: https://github.com/Bravo68web/hexo-webnary-theme

build_tools:
  - name: Hexo
    desc: Blog Framework
    link: https://hexo.io/
```
`name` means the link value, `desc` means the link `title` attribute value.
Each array in this file represents a list of link(e.g. `friend_links`). Web-Nary support multi-column links(you just need to edit your language configuration in the `hexo-theme-Web-Nary/languages`).

#### Personalized Configuration
Web-Nary uses `sass` precompiled style and packages all the baisc styles in the `_theme.scss` file under the `hexo-theme-Web-Nary/source/scss` directory:


### Blog Basic Usage Template
To configure basic info in your markdown blog file:
```
title: Hello World 
cover: http://oxnuwmm3w.bkt.clouddn.com/hello-world.jpeg
# author information, multiple authors are set to array
# single author
author: 
  nick: Barvo68web
  link: https://www.github.com/Barvo68web
# multiple authors
author:
  - nick: Bravo68web
    link: https://www.github.com/Bravo68web
  - nick: KaliDFDev
    link: https://www.github.com/KaliDFDev

# If the article is reproduced, you need to increase the article source
editor:
  name: Bravo68Web
  link: https://www.github.com/Bravo68web

# post subtitle in your index page
subtitle: post introduction
```
`title` attribute is the blog's title. `cover` attribute is the blog's first picture and thumbnail. `author` attribute is the blog's author information and link.

#### Third-Party Services

##### Statistics

###### Google Statistics (Analytics)
Web-Nary has integrated google statistics. You need to get the id and edit the root `_config.yml` file:
``` yml
# Google statistic
google_statistic: ***
```

##### Global Search
Web-Nary uses `lunr` to search in site and don't support configuration.

##### RSS
to edit the root `_config.yml` file:
``` yml
# Feed Atom
feed:
  type: atom
  path: atom.xml
  limit: 20

# Sitemap
sitemap:
  path: sitemap.xml
```

##### Comment system
###### Gitalk 
Web-Nary has integrated [gitalk](https://github.com/gitalk/gitalk).
If you want to use this comment function, you need to register the Github Application(follow the [gitalk document](https://github.com/gitalk/gitalk#usage)).
Then to edit the `_config.yml` configuration:

``` yml
# Gitalk
gitTalk:
  clientId: ***
  clientSecret: ***
  repo: ***
  owner: ***
  admin: 
    - ***
```

###### Disqus

Web-Nary has integrated[disqus](https://disqus.com/). If you want to use this comment function, you need to register Disqus(follow the official instruction).
Then to edit the `_config.yml` configuration:

``` yml
# Disqus

disqus_shortname: ***
```

#### Math Equations Render Support

Web-Nary uses [hexo-math][math] to render math formulas and it's closes by default. Configure the `_config.yml` under the theme folder to use this feature: 

```yml
# Math Equations Render Support
math:
  enable: true

  # Default(true) will load mathjax/katex script on demand
  # That is it only render those page who has 'mathjax: true' in Front Matter.
  # If you set it to false, it will load mathjax/katex srcipt EVERY PAGE.
  per_page: false

  engine: mathjax
  #engine: katex

  # hexo-rendering-pandoc (or hexo-renderer-kramed) needed to full MathJax support.
  mathjax:
    # Use 2.7.1 as default, jsdelivr as default CDN, works everywhere even in China
    cdn: //cdn.jsdelivr.net/npm/mathjax@2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML
    # For newMathJax CDN (cdnjs.cloudflare.com) with fallback to oldMathJax (cdn.mathjax.org).
    #cdn: //cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML
    # For direct link to MathJax.js with CloudFlare CDN (cdnjs.cloudflare.com).
    #cdn: //cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML
    # For automatic detect latest version link to MathJax.js and get from Bootcss.
    #cdn: //cdn.bootcss.com/mathjax/2.7.1/latest.js?config=TeX-AMS-MML_HTMLorMML

  # hexo-renderer-markdown-it-plus (or hexo-renderer-markdown-it with markdown-it-katex plugin)
  # needed to full Katex support.
  katex:
    # Use 0.7.1 as default, jsdelivr as default CDN, works everywhere even in China
    cdn: //cdn.jsdelivr.net/npm/katex@0.7.1/dist/katex.min.css
    # CDNJS, provided by cloudflare, maybe the best CDN, but not works in China
    #cdn: //cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css
    # Bootcss, works great in China, but not so well in other region
    #cdn: //cdn.bootcss.com/KaTeX/0.7.1/katex.min.css
```

[math]: https://github.com/hexojs/hexo-math
