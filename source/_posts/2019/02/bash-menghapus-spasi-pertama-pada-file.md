---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2019-02-02T21:59:00.000+07:00
lang: en
location: ""
modified: 2019-02-02T21:59:42.969+07:00
subtitle: pre><br />IFS=\n<br /> for f in find . -type f -name <br /> do <br />
  mv f f/\.\/ /\.\/<br /> done<br /></pre><div
tags:
  - Linux/Unix
title: "[Bash] Menghapus spasi pertama pada file"
type: post
uuid: 1c0340ff-6c07-4888-8593-53271e92f1b0
webtitle: WMI Gitlab
updated: 2019-02-02T21:59:42+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: pre><br />IFS=\n<br /> for f in find . -type f -name <br /> do <br
  /> mv f f/\.\/ /\.\/<br /> done<br /></pre><div
excerpt: pre><br />IFS=\n<br /> for f in find . -type f -name <br /> do <br />
  mv f f/\.\/ /\.\/<br /> done<br /></pre><div
wordcount: 18
---

<pre><br>IFS=$'\n'<br> for f in $(find . -type f -name ' *')<br> do <br>     mv $f ${f/\.\/ /\.\/}<br> done<br></pre>