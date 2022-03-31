---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSD3Z65uK5mWj1kFiaYKxcVJ8w0XiysZTz3V3ak8FIwpkFiTpnc
date: 2017-04-25T21:29:00.001+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:18.034+07:00
subtitle: Cara defer multiple external file js
tags:
  - Wordpress
  - JS
  - Blogger
  - Blogging
title: Cara defer multiple external file js
type: post
uuid: b6936b14-68e4-4888-8cf4-3aaee554136a
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:18+07:00
thumbnail: https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSD3Z65uK5mWj1kFiaYKxcVJ8w0XiysZTz3V3ak8FIwpkFiTpnc
photos:
  - https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSD3Z65uK5mWj1kFiaYKxcVJ8w0XiysZTz3V3ak8FIwpkFiTpnc
description: Cara defer multiple external file js
excerpt: Cara defer multiple external file js
wordcount: 54
---

<h2>Teknik Defer loading multiple external javascript untuk mengurangi loading website secara dramatis.</h2><div><img height="320" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSD3Z65uK5mWj1kFiaYKxcVJ8w0XiysZTz3V3ak8FIwpkFiTpnc" width="320"></div>Nah kali ini saya akan share bagaimana cara mengurangi loading website meskipun mempunyai banyak eksternal javascript.<br><br>Langkah:<br>1. Backup dulu template anda bila memakai CMS Blogger, Yang lainnya backup file asli yang akan di terapkan teknik defer ini.<br><br>2. Cut semua eksternal javascript (kecuali pemanggil jquery misal:&nbsp;<a href="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" rel="noopener noreferer nofollow">https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js</a> bila theme atau template anda menggunakan framework yang menggantungkan jquery, misal blogger template EVO MAGZ buatan Mas Sugeng.). Lalu paste di notepad. Lalu buat kode berikut ini :<br><br><pre><code class="css">&lt;script type="text/javascript"&gt;<br>function downloadJSAtOnload() {<br>&nbsp;(function(scripts) {<br>&nbsp; &nbsp;var i = 0,<br>&nbsp; &nbsp; l = scripts.length;<br>&nbsp; for (; i&lt;l; ++i ){<br>&nbsp; &nbsp;var element = document.createElement("script");<br>&nbsp; &nbsp;element.src = scripts[i];<br>&nbsp; &nbsp;document.body.appendChild(element);<br>&nbsp; }<br>&nbsp;})([<span style="background-color: #b45f06;">'http://yourjavascript.com/16724112645/root93.js','https://source.l3n4r0x.cf/js/highlight/highlight.pack.js'</span>]);<br>}<br>if (window.addEventListener)<br>&nbsp; &nbsp; &nbsp; &nbsp; window.addEventListener("load", downloadJSAtOnload, false);<br>else if (window.attachEvent)<br>&nbsp;window.attachEvent("onload", downloadJSAtOnload);<br>else window.onload = downloadJSAtOnload;<br>&lt;/script&gt;</code></pre><b><br></b> <b>Deskripsi:</b><br><br>Ubah URL eksternal javascript dengan URL eksternal yang kalian punya. Untuk menambah source eksternalnya hanya dikasih koma (,) dan tanda petik (') untuk meload beberapa eksternal javascript/js file (tidak ada batasan).<br><br>Kemudian taruh script diatas yang sudah kalian edit di atas <i>&lt;/body&gt;</i>.<br><br>Fungsi script diatas adalah mengeksekusi javascript pada saat web telah di load 100%.<br><br><i>NOTE</i>: Namun kode diatas tidak bisa untuk meload jquery framework dari ajax.googleapis.com bila theme atau template anda menggunakan framework atau desain yang sangat memerlukan jquery disaat perenderan website. Bisa-bisa nanti malah theme atau template anda tidak sempurna dengan kata lain rusak dibeberapa bagian yang membutuhkan jquery di saat perenderan awal website.<br><br>Nah selesai.<br><br>Apakah artikel ini membantu anda ??.. Jangan lupa share yah...