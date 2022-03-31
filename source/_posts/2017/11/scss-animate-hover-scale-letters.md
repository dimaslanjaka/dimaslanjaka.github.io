---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2017-11-21T23:53:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:18.046+07:00
subtitle: center><h2>Demo</h2></center><iframe
  src=//rawgit.com/dimaslanjaka/Web-Manajemen/master/HTML/Text-Animate/20Scale20LetterHovers.html
tags:
  - CSS
  - JS
  - HTML
title: SCSS Animate Hover Scale Letters
type: post
uuid: b7d8930c-146d-4888-82b8-6ea697175194
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:18+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: center><h2>Demo</h2></center><iframe
  src=//rawgit.com/dimaslanjaka/Web-Manajemen/master/HTML/Text-Animate/20Scale20LetterHovers.html
excerpt: center><h2>Demo</h2></center><iframe
  src=//rawgit.com/dimaslanjaka/Web-Manajemen/master/HTML/Text-Animate/20Scale20LetterHovers.html
wordcount: 164
---

<center><h2>Demo</h2></center><iframe src="//rawgit.com/dimaslanjaka/Web-Manajemen/master/HTML/Text-Animate/%20Scale%20LetterHovers.html" width="100%" height="500" frameborder="0"></iframe><center><h2>HTML Full Page</h2></center><pre>&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt; <br>&lt;link href="https://fonts.googleapis.com/css?family=Passion+One" rel="stylesheet" /&gt; <br>&lt;style&gt;html, body {<br>  height: 100%;<br>}<br><br>body {<br>  background: #e74c3c;<br>  display: -webkit-box;<br>  display: -ms-flexbox;<br>  display: flex;<br>  -webkit-box-pack: center;<br>      -ms-flex-pack: center;<br>          justify-content: center;<br>  -webkit-box-align: center;<br>      -ms-flex-align: center;<br>          align-items: center;<br>  font-family: 'Passion One', cursive;<br>}<br><br>.scale {<br>  font-size: 10vw;<br>  text-transform: uppercase;<br>  letter-spacing: 4px;<br>  color: #fff;<br>  cursor: pointer;<br>}<br>.scale span {<br>  display: inline-block;<br>  -webkit-transition: -webkit-transform 0.1s;<br>  transition: -webkit-transform 0.1s;<br>  transition: transform 0.1s;<br>  transition: transform 0.1s, -webkit-transform 0.1s;<br>}<br>.scale span:hover {<br>  -webkit-animation: rotate-scale-up 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;<br>          animation: rotate-scale-up 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;<br>  z-index: 1;<br>}<br><br>@-webkit-keyframes rotate-scale-up {<br>  0% {<br>    -webkit-transform: scale(1) rotateZ(0);<br>            transform: scale(1) rotateZ(0);<br>  }<br>  50% {<br>    -webkit-transform: scale(5) rotateZ(0);<br>            transform: scale(5) rotateZ(0);<br>  }<br>  100% {<br>    -webkit-transform: scale(1) rotateZ(360deg);<br>            transform: scale(1) rotateZ(360deg);<br>  }<br>}<br><br>@keyframes rotate-scale-up {<br>  0% {<br>    -webkit-transform: scale(1) rotateZ(0);<br>            transform: scale(1) rotateZ(0);<br>  }<br>  50% {<br>    -webkit-transform: scale(5) rotateZ(0);<br>            transform: scale(5) rotateZ(0);<br>  }<br>  100% {<br>    -webkit-transform: scale(1) rotateZ(360deg);<br>            transform: scale(1) rotateZ(360deg);<br>  }<br>}&lt;/style&gt;<br>&lt;/head&gt;&lt;body&gt; <br>&lt;h1 class="scale"&gt;Test Click This Text&lt;/h1&gt;<br>&lt;script&gt; const heading = document.querySelector('.scale');<br>heading.innerHTML = sparanWrap(heading.textContent);<br><br>function sparanWrap(word) {<br>  return [...word].map(letter =&gt; `&lt;span&gt;${letter}&lt;/span&gt;`).join('');<br>}&lt;/script&gt;<br>&lt;/body&gt;&lt;/html&gt;</pre>