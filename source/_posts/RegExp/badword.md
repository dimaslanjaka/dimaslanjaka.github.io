---
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
category:
  - Programming
  - Regular Expression
comments: false
cover: /RegExp/RegExp/badwords.png
date: 2021-09-22T00:00:00+07:00
lang: en
location: Indonesia
subtitle: Match string not containing string, exclude badwords
tags:
  - RegExp
title: Badword
type: post
uuid: e14cbf39-1ac8-4888-8b41-9b6d9b1ad4f4
webtitle: RegExp
updated: 2021-12-19T06:33:56+07:00
thumbnail: /RegExp/RegExp/badwords.png
photos:
  - /RegExp/RegExp/badwords.png
description: Match string not containing string, exclude badwords
excerpt: Match string not containing string, exclude badwords
wordcount: 9
---

<!--toc-->

## Main Expression
```regexp {#regexp-main}
^((?!badword).)*$
```

## Try It
[Click Here](https://www.regextester.com/15)

<!-- script /RegExp/RegExp/badwords.js -->
