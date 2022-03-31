---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTrPydJSDJ0qsdxmme5yXnxWiCKL71LNDgDbdXJxGC31KXn6aG-PyQdmuOFvQ
date: 2017-04-17T03:18:00.000+07:00
lang: en
location: ""
modified: 2017-04-17T03:18:07.651+07:00
subtitle: Cara Menambah Contact Form Di AMP Blogger Tanpa Menggunakan amp-iframe
tags:
  - CSS
  - Blogger
  - HTML
  - AMP
title: Cara Menambah Contact Form Di AMP Blogger Tanpa Menggunakan amp-iframe
type: post
uuid: 7e5d42f5-c6dc-4888-806e-39a5ef2899d2
webtitle: WMI Gitlab
updated: 2017-04-17T03:18:07+07:00
thumbnail: https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTrPydJSDJ0qsdxmme5yXnxWiCKL71LNDgDbdXJxGC31KXn6aG-PyQdmuOFvQ
photos:
  - https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTrPydJSDJ0qsdxmme5yXnxWiCKL71LNDgDbdXJxGC31KXn6aG-PyQdmuOFvQ
description: Cara Menambah Contact Form Di AMP Blogger Tanpa Menggunakan amp-iframe
excerpt: Cara Menambah Contact Form Di AMP Blogger Tanpa Menggunakan amp-iframe
wordcount: 394
---

<h2>Cara Menambah Contact Form Di AMP Blogger Tanpa Menggunakan amp-iframe | Valid Contact Form For AMP | Valid AMP contact form for blog</h2><div><img height="398" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTrPydJSDJ0qsdxmme5yXnxWiCKL71LNDgDbdXJxGC31KXn6aG-PyQdmuOFvQ" width="640"></div><div><br>Banyak yang bertanya tanya kenapa saat memakai template amp di blogger widget mauput halaman contact form tidak berfungsi.<br>Jawabannya: ya karena amp template menghapus semua fungsi javascript di mobile section untuk validasi AMP.<br>Nah bagaimana cara mengatasi hal tersebut ?. Berikut tutorialnya<br><br></div><div><pre class="tr_bq">&lt;form method="post"<br>&nbsp; name="contactform"<br>&nbsp; class="p2"<br>&nbsp; action-xhr="https://source.l3n4r0x.cf/html/submit.php?admin=YOUREMAIL"<br>&nbsp; target="_top"&gt;<br>&nbsp; &lt;div class="ampstart-input inline-block relative m0 p0 mb3"&gt;<br>&nbsp; &nbsp; &lt;input type="text"<br>&nbsp; &nbsp; &nbsp; class="block border-none p0 m0"<br>&nbsp; &nbsp; &nbsp; name="name"<br>&nbsp; &nbsp; &nbsp; id="name"<br>&nbsp; &nbsp; &nbsp; placeholder="Your Name..."<br>&nbsp; &nbsp; &nbsp; required&gt;<br>&nbsp; &nbsp; &lt;input type="text"<br>&nbsp; &nbsp; &nbsp; class="block border-none p0 m0"<br>&nbsp; &nbsp; &nbsp; name="subject"<br>&nbsp; &nbsp; &nbsp; id="subject"<br>&nbsp; &nbsp; &nbsp; placeholder="Subject Messages..."<br>&nbsp; &nbsp; &nbsp; required&gt;<br>&nbsp; &nbsp; &lt;input type="email"<br>&nbsp; &nbsp; &nbsp; class="block border-none p0 m0"<br>&nbsp; &nbsp; &nbsp; name="email"<br>&nbsp; &nbsp; &nbsp; id="email"<br>&nbsp; &nbsp; &nbsp; placeholder="Email..."<br>&nbsp; &nbsp; &nbsp; required&gt;<br>&nbsp; &nbsp; &lt;input type="text"<br>&nbsp; &nbsp; &nbsp; class="block border-none p0 m0"<br>&nbsp; &nbsp; &nbsp; name="messages"<br>&nbsp; &nbsp; &nbsp; id="messages"<br>&nbsp; &nbsp; &nbsp; placeholder="Messages..."<br>&nbsp; &nbsp; &nbsp; required&gt;<br>&nbsp; &lt;/div&gt;<br>&nbsp; &lt;input type="submit"<br>&nbsp; &nbsp; name="submit"<br>&nbsp; &nbsp; value="send"<br>&nbsp; &nbsp; class="ampstart-btn caps"&gt;<br>&nbsp; &lt;div submit-success&gt;<br>&nbsp; &nbsp; &lt;template type="amp-mustache"&gt;<br>&nbsp; &nbsp; Success thank you {{name}} for send messages<br>&nbsp; &nbsp; &lt;/template&gt;<br>&nbsp; &lt;/div&gt;<br>&nbsp; &lt;div submit-error&gt;<br>&nbsp; &nbsp; &lt;template type="amp-mustache"&gt;<br>&nbsp; &nbsp; &nbsp; Success thank you {{name}} for send messages<br>&nbsp; &nbsp; &lt;/template&gt;<br>&nbsp; &lt;/div&gt;<br>&lt;/form&gt;</pre></div><div><br></div><div>Kode di atas tidak mempunyai kostumisasi css, anda harus mengkostumisasi kode tersebut dengan mengubah 'class' nya dengan 'class dari template anda sendiri'. Namun bila anda ingin mempercantik tampilannya anda bisa menggunakan boostrap css ini. -&gt;&nbsp;<a href="http://www.webmanajemen.com/2017/04/html5-boostrap-for-amp.html" rel="noopener noreferer nofollow">http://www.webmanajemen.com/2017/04/html5-boostrap-for-amp.html</a></div><style amp-custom="">.thumb-post{text-align:center;margin:0;padding:0;width:100%} .thumb-post amp-img{width:100%;max-width:100%;height:auto;min-height:450px;max-height:600px;margin:0} </style> <div class="thumb-post"><noscript><img src="https://scontent.fsub2-1.fna.fbcdn.net/v/t1.0-9/fr/cp0/e15/q65/17796846_1773189839677671_6977008867135609966_n.png.jpg?efg=eyJpIjoidCJ9&amp;oh=292c21d1c58e8e185a8d6c63dec60c5a&amp;oe=5957C4B8" width="650" height="350" alt="NoScript Default Fallback" title="default fallback"></noscript></div>