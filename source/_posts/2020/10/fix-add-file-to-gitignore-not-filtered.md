---
author:
  nick: Kuswati
  link: https://www.blogger.com/profile/09256263851708439294
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2020-10-25T23:45:00.005+07:00
updated: 2020-10-25T23:45:36.135+07:00
subtitle: command line Fix add file to gitignore not filtered
tags:
  - GitHub
  - Tips & Tricks
title: Fix add file to gitignore not filtered
type: post
uuid: d0ce851a-9de9-4888-87cd-931b67b961b3
webtitle: CMD
excerpt: command line Fix add file to gitignore not filtered
description: command line Fix add file to gitignore not filtered
lang: en
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
wordcount: 13
---

<pre><br>git rm -r --cached .<br>git add .<br>git commit -m 'clear git cache'<br>git push<br></pre>