hexo-theme-amp
==============

A simple [Hexo](https://hexo.io/) template on AMP ⚡ HTML.

- [Preview](https://hirofumii.github.io/hexo-theme-amp/)

<img src="https://raw.githubusercontent.com/hirofumii/hexo-theme-amp/images/screenshot_01.png" alt="hexo-theme-amp-screenshot" width="500" />


Features
--------

### AMP HTML

[Accelerated Mobile Pages Project](https://www.ampproject.org/)

AMP HTML is a way to build web pages for static content that render with reliable, fast performance. 


### Image lightbox

hexo-amp uses [amp-image-lightbox](https://ampbyexample.com/components/amp-image-lightbox/) to showcase your photos. You can use lightbox tag plugin to add your photos.

```html
{% lightbox /path/to/image width height [title] %}
```

### Languages

- en
- zh-CN
- ja-JP


Installation
------------

### Install

```bash
$ git clone https://github.com/hirofumii/hexo-theme-amp.git themes/amp
```

### Enable

Modify theme setting in _config.yml to amp.


### Update


```bash
$ cd themes/amp
$ git pull
```


Configuration
-------------

```yml
# Header
menu:
  home: /
  archive: /archives

# Content
lightbox: true

# Miscellaneous
google_analytics: 

# Article schema
# https://developers.google.com/structured-data/rich-snippets/articles#article_markup_properties
schema:
  image:
    url: /img/700.png
    height: 700 
    width: 700 # <= 696
  publisher:
    name: Yourpublisher
    logo:
      url: /img/700.png
      width: 600 # <= 600
      height: 60 # >= 60
```

- **menu** - Navigation menu
- **lightbox** - Enable [amp-image-lightbox](https://ampbyexample.com/components/amp-image-lightbox/)
- **google_analytics** - Google Analytics ID
- **schema** - Article markup properties