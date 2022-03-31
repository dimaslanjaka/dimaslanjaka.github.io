---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://varvy.com/pagespeed/images/defer-js-block-c.png
date: 2019-07-23T02:53:00.000+07:00
lang: en
location: ""
modified: 2020-01-20T04:41:03.067+07:00
subtitle: Cara defer loading javascript atau menunda pemanggilan javascript di
  bloggerBerfungsi untuk Mempercepat loading blog website /
tags:
  - JS
  - Blogger
title: Defer loading css js
type: post
uuid: 86b04bd1-5bc5-4888-8ffa-cfcce4af9cc1
webtitle: WMI Gitlab
updated: 2020-01-20T04:41:03+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://varvy.com/pagespeed/images/defer-js-block-c.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://varvy.com/pagespeed/images/defer-js-block-c.png
description: Cara defer loading javascript atau menunda pemanggilan javascript
  di bloggerBerfungsi untuk Mempercepat loading blog website /
excerpt: Cara defer loading javascript atau menunda pemanggilan javascript di
  bloggerBerfungsi untuk Mempercepat loading blog website /
wordcount: 607
---

<div dir="ltr" style="text-align: left;" trbidi="on">Cara defer loading javascript atau menunda pemanggilan javascript di blogger<br>Berfungsi untuk :<br><br><ol style="text-align: left;"><li>Mempercepat loading blog website / meningkatkan kecepatan loading website blog.</li><li>Mengurangi ukuran halaman website.</li><li>Meningkatkan score pagespeed google.</li><li>Meningkatkan konten yang terlihat.</li><li>Mempermudah edit template di mobile phone / hape.</li></ol><br>Menunda javascript berarti benar-benar memuat atau mem-parsing javascript itu hanya dimulai setelah konten halaman dimuat (Artinya tidak akan memengaruhi kecepatan halaman atau jalur render kritis). <br>Menggunakan acara "onload", kami menyebutnya javascript eksternal Javascript eksternal tidak akan dimuat sebelum konten halaman dimuat Javascript eksternal kemudian akan berjalan dan mempengaruhi halaman <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://varvy.com/pagespeed/images/defer-js-block-c.png"><br><h4>Penjelasan</h4>Menunda javascript adalah salah satu masalah di web yang dapat membuat Anda ingin <strike>menarik rambut Anda mencoba mencari solusi</strike>. <br>Banyak orang mengatakan "gunakan saja penundaan" atau "gunakan saja async" atau yang lain mengatakan "letakkan saja javascript Anda di bagian bawah halaman" tetapi tidak ada yang memecahkan masalah yang sebenarnya memungkinkan halaman web untuk memuat penuh dan kemudian (dan hanya kemudian) memuat JS eksternal. Mereka juga tidak akan membuat Anda melewati peringatan "Tunda pemuatan javascript" yang Anda dapatkan dari alat kecepatan halaman Google. Solusi ini akan. <br>Tutorial defer loading javascript :<br><br><ol style="text-align: left;"><li>Buka template XML anda.</li><li>Cari Tag <kbd>&lt;title&gt;&lt;/title&gt;</kbd> atau bagian paling atas sebelum tag &lt;script&gt;&lt;/script&gt; pertama (Before load).</li><li>Lalu masukkan kode ini : <blockquote><ul>Options <small>(<sup>Choose 1</sup>)</small>: <li><b>title</b> tag: taruh dibawahnya</li><li><b>script</b> tag pertama: diatasnya</li></ul></blockquote></li></ol><br><blockquote>Native jika <b>EDIT HTML</b> dari <b>blogger </b>langsung.</blockquote><pre type="JS"><br>&lt;script&gt;String.prototype.CSS=function(){var e=document.createElement("link");e.rel="stylesheet",e.href=this;var t=document.getElementsByTagName("head")[0];window.addEventListener?window.addEventListener("load",function(){t.parentNode.insertBefore(e,t)},!1):window.attachEvent?window.attachEvent("onload",function(){t.parentNode.insertBefore(e,t)}):window.onload=t.parentNode.insertBefore(e,t)},core={js:function(e,t){var n=document.body||document.head,o=document.createElement("script");o.type="text/javascript",o.src=e,o.onreadystatechange=t,o.onload=t,n.appendChild(o)}};&lt;/script&gt;<br></pre><blockquote>Entities format jika <b>EDIT XML</b> manual dari <i>kode editor</i>, dsb.</blockquote><pre type="JS-ENT">&amp;lt;script&amp;gt;String.prototype.CSS=function(){var e=document.createElement(&amp;quot;link&amp;quot;);e.rel=&amp;quot;stylesheet&amp;quot;,e.href=this;var t=document.getElementsByTagName(&amp;quot;head&amp;quot;)[0];window.addEventListener?window.addEventListener(&amp;quot;load&amp;quot;,function(){t.parentNode.insertBefore(e,t)},!1):window.attachEvent?window.attachEvent(&amp;quot;onload&amp;quot;,function(){t.parentNode.insertBefore(e,t)}):window.onload=t.parentNode.insertBefore(e,t)},core={js:function(e,t){var n=document.body||document.head,o=document.createElement(&amp;quot;script&amp;quot;);o.type=&amp;quot;text/javascript&amp;quot;,o.src=e,o.onreadystatechange=t,o.onload=t,n.appendChild(o)}};&amp;lt;/script&amp;gt;</pre><blockquote>Kode diatas fungsi untuk memanggil CSS dan JS secara Dynamic Asynchronous, dan dapat membuat loading style yang perfect dan timing yang pas. karena sudah dilengkapi kode listener khusus. <br> Script diatas juga merupakan extender dari Stringclass Constructor Bawahan Browser (khususnya browser modern).</blockquote> <h2>Cara penggunaan</h2><pre type="js"><br>'LINK-CSS.css'.CSS(); //untuk memanggil CSS<br>core.js('LINK-JS.js', function(){/*callback optional*/}); //untuk memanggil JS/javascript<br></pre><b>Contoh</b><pre type="contoh javascript">core.js('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js', function(){/*callback optional*/});</pre><pre type="contoh css">'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.4/css/bootstrap.min.css'.CSS();</pre><blockquote>Tugas anda sekarang adalah memisahkan setiap css yang berada di <i>inner</i> <b>style</b> ke dalam file CSS <i>filename.css</i> lalu upload ke hosting atau cdn kalian. Coba baca <a href="https://web-manajemen.blogspot.com/p/search.html?q=github+cdn">Cara membuat repository github untuk store file css, js, dan lain" dan memiliki CDN milik sendiri</a>.</blockquote><h2>Hasil</h2> <figure>  <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://speedboostr.com/wp-content/uploads/2018/01/google-page-speed-insights-explained.png" alt="pagespeed">  <figcaption><a href="https://developers.google.com/speed/pagespeed/insights/?hl=id&amp;url=https%3A%2F%2Fweb-manajemen.blogspot.com" rel="noopener noreferer nofollow">Pagespeed Google.</a></figcaption></figure> <ul><li>defer loading css js perfectly</li></ul></div>