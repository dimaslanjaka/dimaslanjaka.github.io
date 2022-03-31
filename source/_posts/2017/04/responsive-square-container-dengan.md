---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://d1gug1ng40407.cloudfront.net/uploads/2017/03/allure-code-snippet.jpg
date: 2017-04-13T16:29:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:18.070+07:00
subtitle: Menggunakan vanili JavaScript dan CSS, saya akan menunjukkan cara
  untuk secara vertikal dan horizontal pusat dinamis konten berukuran dalam
tags:
  - CSS
  - JS
  - HTML
title: Responsive Square Container Dengan Vertically Or Horizontally Ditengah Content
type: post
uuid: 6198d61d-06c5-4888-874d-5827b493a2f1
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:18+07:00
thumbnail: https://d1gug1ng40407.cloudfront.net/uploads/2017/03/allure-code-snippet.jpg
photos:
  - https://d1gug1ng40407.cloudfront.net/uploads/2017/03/allure-code-snippet.jpg
description: Menggunakan vanili JavaScript dan CSS, saya akan menunjukkan cara
  untuk secara vertikal dan horizontal pusat dinamis konten berukuran dalam
excerpt: Menggunakan vanili JavaScript dan CSS, saya akan menunjukkan cara untuk
  secara vertikal dan horizontal pusat dinamis konten berukuran dalam
wordcount: 462
---

<div dir="ltr" style="text-align: left;" trbidi="on"><img alt="Allure Web Solutions Code Snippet" class="attachment-full size-full wp-post-image" sizes="(max-width: 800px) 100vw, 800px" src="https://d1gug1ng40407.cloudfront.net/uploads/2017/03/allure-code-snippet.jpg" srcset="https://d1gug1ng40407.cloudfront.net/uploads/2017/03/allure-code-snippet.jpg 800w, https://d1gug1ng40407.cloudfront.net/uploads/2017/03/allure-code-snippet-300x113.jpg 300w, https://d1gug1ng40407.cloudfront.net/uploads/2017/03/allure-code-snippet-768x288.jpg 768w" title="code snippet"><br><div>Menggunakan vanili JavaScript dan CSS, saya akan menunjukkan cara untuk secara vertikal dan horizontal pusat dinamis konten berukuran dalam wadah persegi responsif.<br><br><h4 style="text-align: left;">Kode Javascript</h4><div><pre>var contents = document.querySelectorAll('.content');<br>var parentHeight,<br>  contentHeight,<br>  topPosition;<br><br>// Set margin function<br>function setMargin(selector) {<br>  contentHeight = selector.clientHeight;<br>  parentHeight = selector.parentNode.clientHeight;<br>  topPosition = (parentHeight - contentHeight) / 2;<br><br>  selector.style.top = topPosition + 'px';<br><br>}<br><br>// On page load, center contents<br>for (var i = 0; i &lt; contents.length; i++) {<br>  setMargin(contents[i]);<br>}<br><br>// On page resize, adjust content centering<br>window.addEventListener('resize', function() {<br>  for (var i = 0; i &lt; contents.length; i++) {<br>    setMargin(contents[i]);<br>  }<br>});</pre><br></div><h4 style="text-align: left;">Kode SCSS</h4></div><div><pre>div.box {<br>  position: relative;<br>  display: block;<br>  float: left;<br>  width: 50%;<br>  height: 50%;<br>  text-align: center;<br>  <br>  &amp;:before {<br>    content: "";<br>    display: block;<br>    padding-top: 100%;<br>  }<br>  <br>  .content {<br>    position: absolute;<br>    left: 0;<br>    top: 25%;<br>    width: 100%;<br>    transition: all 1s ease 0s;<br>  }<br>}</pre><pre></pre><h4 style="text-align: left;">Kode HTML</h4><pre></pre><pre>&lt;div class="box"&gt;<br>    &lt;div class="content"&gt;content&lt;/div&gt;<br>&lt;/div&gt;</pre><br><h2>Untuk coba-coba anda bisa menggunakan -&gt; <a alt="Codepen.io demo" href="http://codepen.io/allurewebsolutions/pen/bqQgEr/" title="Codepen.io Demo" rel="noopener noreferer nofollow">Codepen.io Project </a></h2></div></div>