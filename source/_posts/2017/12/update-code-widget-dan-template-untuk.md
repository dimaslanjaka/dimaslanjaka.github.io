---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: //res.cloudinary.com/dimaslanjaka/image/fetch/https://anotherorion.com/wp-content/uploads/2015/05/SafeLinkConverter1.png
date: 2017-12-12T18:41:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.929+07:00
subtitle: Untuk Cara Instal, Deskripsi, Dan Cara Penerapan Klik Disini Cara
  Membuat Simple Safelink Converter
tags:
  - Wordpress
  - JS
  - Blogger
title: Update Code Widget Dan Template Untuk Simple Safelink Converter
type: post
uuid: b597d4bb-ca15-4888-8a63-75c03cb6ba8b
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: //res.cloudinary.com/dimaslanjaka/image/fetch/https://anotherorion.com/wp-content/uploads/2015/05/SafeLinkConverter1.png
photos:
  - //res.cloudinary.com/dimaslanjaka/image/fetch/https://anotherorion.com/wp-content/uploads/2015/05/SafeLinkConverter1.png
description: Untuk Cara Instal, Deskripsi, Dan Cara Penerapan Klik Disini Cara
  Membuat Simple Safelink Converter
excerpt: Untuk Cara Instal, Deskripsi, Dan Cara Penerapan Klik Disini Cara
  Membuat Simple Safelink Converter
wordcount: 121
---

<div class="w3-panel w3-center w3-light-grey"><img height="auto" src="//res.cloudinary.com/dimaslanjaka/image/fetch/https://anotherorion.com/wp-content/uploads/2015/05/SafeLinkConverter1.png" title="safelink converted" width="100%">Untuk Cara Instal, Deskripsi, Dan Cara Penerapan <b><a href="http://web-manajemen.blogspot.com/2017/09/cara-simple-membuat-blogger-safelink.html" title="Simple Safelink Converter">Klik Disini (Cara Membuat Simple Safelink Converter)</a></b></div><center><h3>Update code Safelink Converter untuk Widget Atau Template/Theme</h3></center><blockquote>Tambahan : Protected Links</blockquote><pre>&lt;script type='text/javascript' async='async'&gt;<br>var myArray = ['https://web-manajemen.blogspot.com/p/redirect.html?u=', 'https://web-manajemen.blogspot.com/p/advertisement.html?u=', 'http://web-manajemen.blogspot.com/p/advertise.html?u='];<br>var safelink = myArray[Math.floor(Math.random() * myArray.length)];<br>var protectedLinks = /(bing.com|google|linkedin.com|facebook|manajemen|safelink|pinterest|digg.com|twitter|codepen.io|blogger.com|ask.com|DOMAINKAMU.COM)/<br>$( 'a' ).each(function() {<br>if (this.href.match( protectedLinks ) ){<br>    $(this).attr("href", $(this).attr("href")+'?success');<br>      //$(this).addClass('w3-text-green'); //Add Class On Internal Links<br>  } else {<br>    $(this).attr("href", safelink+encodeURIComponent($(this).attr("href")+'?utm=web-manajemen.blogspot.com'));<br>      //$(this).addClass('w3-text-red'); //Add Class On External Links<br>  }<br>});<br>&lt;/script&gt;</pre><blockquote>ubah <kbd>DOMAINKAMU.COM</kbd> dengan <b>domain</b> kamu. Untuk menambahkan lebih dari 1 domain, kasih separator <kbd>|</kbd>. Misal <i><kbd>domain.com|domain.me|domain.net</kbd></i></blockquote><div class="w3-light-grey">Untuk Kode Halaman Bisa menggunakan kode terupdate sebelumnya di <a href="https://web-manajemen.blogspot.com/2017/12/update-code-safelink-converter-12.html?success" rel="follow" title="Update Code Safelink Converter 12 Des 2017">Update Code Safelink Converter 12 Des 2017</a></div>