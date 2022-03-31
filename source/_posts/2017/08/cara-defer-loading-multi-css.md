---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://lh3.googleusercontent.com/proxy/osOBUo2W1kAeTZxgpk8ucxEhICG8CgcH-6-x1tgh_Lxix6DZhYKY3HTQlsK63ZE9LLsWprBq83sOK4iqA9g1N_QAe53OJE0CALp9aT3CA6MYQfh_w8fpZyb_J1k6mOcngON_epxQsKM_lRE=w384-h384-nc
date: 2017-08-06T22:46:00.002+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.975+07:00
subtitle: Cara defer loading multi css
tags:
  - Wordpress
  - CSS
  - JS
  - Blogger
  - HTML
  - Blogging
title: Cara defer loading multi css
type: post
uuid: d64c1c5b-fa3f-4888-8393-6b54d3783cd5
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://lh3.googleusercontent.com/proxy/osOBUo2W1kAeTZxgpk8ucxEhICG8CgcH-6-x1tgh_Lxix6DZhYKY3HTQlsK63ZE9LLsWprBq83sOK4iqA9g1N_QAe53OJE0CALp9aT3CA6MYQfh_w8fpZyb_J1k6mOcngON_epxQsKM_lRE=w384-h384-nc
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://lh3.googleusercontent.com/proxy/osOBUo2W1kAeTZxgpk8ucxEhICG8CgcH-6-x1tgh_Lxix6DZhYKY3HTQlsK63ZE9LLsWprBq83sOK4iqA9g1N_QAe53OJE0CALp9aT3CA6MYQfh_w8fpZyb_J1k6mOcngON_epxQsKM_lRE=w384-h384-nc
description: Cara defer loading multi css
excerpt: Cara defer loading multi css
wordcount: 162
---

<div class="separator" style="clear: both; text-align: center;"><a href="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://lh3.googleusercontent.com/proxy/osOBUo2W1kAeTZxgpk8ucxEhICG8CgcH-6-x1tgh_Lxix6DZhYKY3HTQlsK63ZE9LLsWprBq83sOK4iqA9g1N_QAe53OJE0CALp9aT3CA6MYQfh_w8fpZyb_J1k6mOcngON_epxQsKM_lRE=w384-h384-nc" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="384" data-original-width="384" height="320" src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://lh3.googleusercontent.com/proxy/osOBUo2W1kAeTZxgpk8ucxEhICG8CgcH-6-x1tgh_Lxix6DZhYKY3HTQlsK63ZE9LLsWprBq83sOK4iqA9g1N_QAe53OJE0CALp9aT3CA6MYQfh_w8fpZyb_J1k6mOcngON_epxQsKM_lRE=w384-h384-nc" width="320"></a></div><h2>Definisi dan Penggunaan</h2>Atribut defer adalah atribut boolean.<br>Saat ini, ia menentukan bahwa skrip dijalankan saat halaman selesai diurai.<br><strong>Catatan:</strong> Atribut defer hanya untuk skrip eksternal (seharusnya hanya digunakan jika atribut src ada).<br><strong>Catatan:</strong> Ada beberapa cara skrip eksternal dapat dijalankan:<br><ul><li> Jika async hadir: Script dijalankan secara asynchronous dengan sisa halaman (script akan dieksekusi saat halaman melanjutkan penguraian) </li><li> Jika async tidak hadir dan menunda hadir: Script dijalankan saat halaman selesai diurai </li><li> Jika tidak ada async atau defer yang ada: Script diambil dan dijalankan segera, sebelum browser melanjutkan penguraian halaman </li></ul><div>Nah berikut kode untuk defer loading multiple css :</div><div><br></div><pre>&lt;script type="text/javascript"&gt;<br>var loadCSSFiles = function() {<br>    var links = ["//example.com/css/custom.css", "//fonts.googleapis.com/css?family=PT+Sans", "//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"],<br>        headElement = document.getElementsByTagName("head")[0],<br>        linkElement, i;<br>    for (i = 0; i &lt; links.length; i++) {<br>        linkElement = document.createElement("link");<br>        linkElement.rel = "stylesheet";<br>        linkElement.href = links[i];<br>        headElement.appendChild(linkElement);<br>    }<br>};<br>var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;<br>if (raf) {<br>    raf(loadCSSFiles);<br>} else {<br>    window.addEventListener("load", loadCSSFiles);<br>}<br>&lt;/script&gt;</pre><br>Taruh kode diatas di antara &lt;head&gt;<b>DISINI</b>&lt;/head&gt; atau diatas &lt;/body&gt; tag.