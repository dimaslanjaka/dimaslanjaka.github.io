---
author:
  nick: Dimas Lanjaka 2
  link: https://www.blogger.com/profile/08197822797622284515
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://2.bp.blogspot.com/-gUVjKXD8MMM/WWHz7oK-SxI/AAAAAAAACVc/3uL5_0HdMNkvWyjyIAUcSYpVJIQxmIvnQCLcBGAs/s400/syntax%2Bhighlighting%2Bcode%2Bformatting.png
date: 2017-08-21T10:55:00.003+07:00
lang: en
location: ""
modified: 2021-05-25T22:47:46.743+07:00
subtitle: Jumpa lagi dengan topik JavaScript Dan jQuery. Sebelumnya saya sudah
  share Cara menambah syntax highlighter dengan prettyprint di
tags:
  - Wordpress
  - JS
  - Blogger
  - Blogging
  - Tips & Tricks
title: Update Code Auto Syntax Highlighter Prettyprint js
type: post
uuid: 24f3608e-6910-4888-8eda-7e438600e3a4
webtitle: WMI Gitlab
updated: 2021-05-25T22:47:46+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://2.bp.blogspot.com/-gUVjKXD8MMM/WWHz7oK-SxI/AAAAAAAACVc/3uL5_0HdMNkvWyjyIAUcSYpVJIQxmIvnQCLcBGAs/s400/syntax%2Bhighlighting%2Bcode%2Bformatting.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://2.bp.blogspot.com/-gUVjKXD8MMM/WWHz7oK-SxI/AAAAAAAACVc/3uL5_0HdMNkvWyjyIAUcSYpVJIQxmIvnQCLcBGAs/s400/syntax%2Bhighlighting%2Bcode%2Bformatting.png
description: Jumpa lagi dengan topik JavaScript Dan jQuery. Sebelumnya saya
  sudah share Cara menambah syntax highlighter dengan prettyprint di
excerpt: Jumpa lagi dengan topik JavaScript Dan jQuery. Sebelumnya saya sudah
  share Cara menambah syntax highlighter dengan prettyprint di
wordcount: 147
---

<div class="">  <div>    <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://2.bp.blogspot.com/-gUVjKXD8MMM/WWHz7oK-SxI/AAAAAAAACVc/3uL5_0HdMNkvWyjyIAUcSYpVJIQxmIvnQCLcBGAs/s400/syntax%2Bhighlighting%2Bcode%2Bformatting.png" width="80%" height="250px" title="syntax Highlighter" alt="syntax Highlighter">  </div>  Jumpa lagi dengan topik JavaScript Dan jQuery. Sebelumnya saya sudah share <a alt="Cara menambah syntax highlighter dengan prettyprint di blog tanpa mengurangi kecepatan loading website 100% Work Tested" href="https://web-manajemen.blogspot.sg/2017/04/cara-menambah-syntax-highlighter-dengan.html" rel="follow" title="Cara menambah syntax highlighter dengan prettyprint di blog tanpa mengurangi kecepatan loading website 100% Work Tested">Cara menambah syntax highlighter dengan prettyprint di blog tanpa mengurangi kecepatan loading website 100% Work Tested</a>, namun kali ini saya improvisasi codenya jadi lebih ringan dan simpel. </div><blockquote>  <b>Note:</b> Taruh kode dibawah ini diatas <kbd>&lt;/body&gt;&lt;/html&gt;</kbd></blockquote><br><pre style="white-space: pre-wrap; word-wrap: break-word;">//Defer Syntax Higlighter<br>function downloadJSAtOnload() {<br> (function(scripts) {<br>   var i = 0,<br>    l = scripts.length;<br>  for (; i&lt;l; ++i ){<br>   var element = document.createElement("script");<br>   element.src = scripts[i];<br>   document.body.appendChild(element);<br>  }<br> })(['https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=css&amp;skin=sunburst']);<br>}<br>if (window.addEventListener)<br>        window.addEventListener("load", downloadJSAtOnload, false);<br>else if (window.attachEvent)<br> window.attachEvent("onload", downloadJSAtOnload);<br>else window.onload = downloadJSAtOnload;<br><br>$("pre").addClass("prettyprint");</pre>Cara penggunaannya sama dengan artikel sebelumnya »&nbsp;<a alt="Cara menambah syntax highlighter dengan prettyprint di blog tanpa mengurangi kecepatan loading website 100% Work Tested" href="/2017/04/cara-menambah-syntax-highlighter-dengan.html" rel="follow" title="Cara menambah syntax highlighter dengan prettyprint di blog tanpa mengurangi kecepatan loading website 100% Work Tested">Cara menambah syntax highlighter dengan prettyprint di blog tanpa mengurangi kecepatan loading website 100% Work Tested</a>&nbsp;« yang membedakan hanya kode pemanggil Syntax Highlighter nya lebih simple dan ringan.<br><b>Deskripsi Fungsi Kode Diatas:</b><br><kbd>['https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=css&amp;skin=sunburst']</kbd>: Berfungsi memanggil prettyprint sekaligus style sunburst.css.<br><kbd>['https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=css&amp;skin=<u><b>sunburst</b></u>']</kbd>: Kode tebal bergaris bawah (<b><u>sunburst</u></b>) bisa diganti dengan: <br><blockquote>  <center> Pilih salah satu</center>  <li>desert</li>  <li>doxy</li>  <li>sons-of-obsidian</li>  <li>sunburst</li>  <center>    <a alt="github" href="https://cdn.rawgit.com/google/code-prettify/master/styles/index.html" rel="noopener noreferer nofollow" title="github">Cek Disini Untuk Melihat Efek Style</a>  </center></blockquote>