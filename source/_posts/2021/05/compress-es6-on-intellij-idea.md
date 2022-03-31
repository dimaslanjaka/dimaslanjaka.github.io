---
author:
  nick: Dimas Lanjaka
  link: https://www.blogger.com/profile/07981649157148639830
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://i.ibb.co/024Dzwh/Screenshot-1.png
date: 2021-05-30T16:43:00.003+07:00
lang: en
location: ""
modified: 2021-05-30T16:43:44.714+07:00
subtitle: compress es6, minify es6 in intellij idea automatically
tags:
  - JS
  - Tips & Tricks
  - IDE
title: Compress ES6 In Intellij IDEA
type: post
uuid: 0ac49882-5f5b-4888-84cf-0a0541116745
webtitle: Intellij IDEA
updated: 2021-05-30T16:43:44+07:00
thumbnail: https://i.ibb.co/024Dzwh/Screenshot-1.png
photos:
  - https://i.ibb.co/024Dzwh/Screenshot-1.png
excerpt: compress es6, minify es6 in intellij idea automatically
description: compress es6, minify es6 in intellij idea automatically
wordcount: 244
---

<ul><li>Install terser locally or globally <code>npm i terser</code></li><li>Open IDEA <strong>Settings/Preferences</strong> (<code>CTRL+ALT+S</code>)</li><li>click <strong>File Watchers</strong> under <strong>Tools</strong></li><li>Click <code>+</code> Select <code>Custom</code><img src="https://i.ibb.co/024Dzwh/Screenshot-1.png" alt="Add Custom Template"></li><li><ul><li>Program: select path <code>terser</code> bin OR type <code>terser</code> only if you installed terser globally</li></ul></li><li><ul><li>Arguments: <code>$FileDir$\$FileName$ -o $FileDir$\$FileNameWithoutExtension$.min.js -c -m --ie8</code></li></ul></li><li><ul><li><ul><li>change <code>\</code> to <code>/</code> if you using LINUX</li></ul></li></ul></li><li><ul><li><ul><li>change parameter terser from <code>-c</code> - <code>ie8</code> as you want do</li></ul></li></ul></li><li><ul><li>Output Path To Refresh: <code>$FileNameWithoutExtension$.min.js</code></li></ul></li><li>See Screenshot For Configuration <img src="https://i.ibb.co/0YRZNj7/Screenshot-2.png" alt="Configuration 1"><img src="https://i.ibb.co/TtHPZJg/Screenshot-3.png" alt="Detailed Arguments"></li></ul>
