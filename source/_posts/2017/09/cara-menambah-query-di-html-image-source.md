---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://imgdb.net/images/3190.jpg
date: 2017-09-12T09:00:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.946+07:00
subtitle: Cara menambah query di html image source
tags:
  - JS
  - Tips & Tricks
title: Cara menambah query di html image source
type: post
uuid: 162bdc35-73a4-4888-8972-ebb641c1dae4
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://imgdb.net/images/3190.jpg
photos:
  - https://imgdb.net/images/3190.jpg
description: Cara menambah query di html image source
excerpt: Cara menambah query di html image source
wordcount: 265
---

Cara menambahkan query di source image.<br><div class="separator" style="clear: both; text-align: center;"><a href="https://imgdb.net/images/3190.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="297" data-original-width="495" height="192" src="https://imgdb.net/images/3190.jpg" width="320"></a></div>Di World Wide Web , Query String adalah bagian dari uniform resource locator (URL) yang berisi data yang tidak sesuai dengan struktur jalur hierarkis. Query String umumnya mencakup bidang yang ditambahkan ke URL dasar oleh browser Web atau aplikasi klien lainnya, misalnya sebagai bagian dari bentuk HTML. <br><br>Server web dapat menangani permintaan Hypertext Transfer Protocol baik dengan membaca file dari sistem file berdasarkan jalur URL atau dengan menangani permintaan menggunakan logika yang spesifik untuk jenis sumber daya. Dalam kasus di mana logika khusus dipanggil, string kueri akan tersedia untuk logika tersebut untuk digunakan dalam pemrosesannya, bersama dengan komponen jalur URL.<br><br>Nah bersangkutan dengan artikel sebelumnya: <a href="https://www.webmanajemen.com/2017/09/membuat-semua-link-dan-source-html-http.html?m=1" target="_blank" rel="noopener noreferer nofollow">Membuat semua link dan source html http menjadi https</a>. Kali ini saya akan share bagaimana cara menambah Query String Atau Back Query di html source image.<br><br>Berikut kode untuk menambah Query String di html image source:<br><b>Kode untuk menambah source query pada tag image html tertentu</b><br><pre><i class="fa fa-info"> Class Selector</i> /*Memilih berdasarkan class name*/<br>$(document).ready(function() {<br>$('img.class').attr('src',$('img.class').attr('src')+"?URL=Query%20String");<br>});<br><i class="fa fa-info"> ID Selector</i> /*Memilih berdasarkan ID name*/<br>$(document).ready(function() {<br>$('img#ID').attr('src',$('img#ID').attr('src')+"?URL=Query%20String");<br>});<br><i class="fa fa-info"> Multiple Selector</i> /*Memilih berdasarkan class dan ID name*/<br>$(document).ready(function() {<br>$('img.class,img#id').attr('src',$('img.class,img#id').attr('src')+"?URL=Query%20String");<br>});<br></pre><b>Penjelasan Untuk Kode Diatas:</b><br><ol><li>img.class dan img#id merupakan sebuah selector dimana img sebagai <i>Tag</i> dan .class sebagai <i>classname</i> dan sebaliknya juga sama untuk img#id yaitu img sebagai <i>Tag</i> dan #id sebagai <i>IDname</i>. Fungsinya mengambil target target dengan nama class (classname) atau id (idname) tertentu. </li><li>attr('src') merupakan objek yang akan di ambil dari selector ( img.class atau img#id ).</li><li>Intinya jQuery sama seperti pelajaran matematika aljabar. Satu di bolak balik yang satunya sebagai patokan.</li></ol> <h3>Contoh implementasi menambah query di html image source</h3><i class="fa fa-info"> Please Use JavaScript to see the implementation</i><br><div class="w3-container container"><script>$(document).ready(function() { $('img.hello').attr('src',$('img.hello').attr('src')+"WPr3H7HI37MVsZIDgLNEcP4hXD1zRscDe3pNlL5vyNX1UagT1yn7hPGQyBGJPW3DJUyQMDupBl-86YFD4QM6VZksvtVhNdxmG8stcB62ATWU4ROkVLW2Ums_=w543-h271-nc"); });  </script><div class="w3-display-container w3-text-teal"><img class="hello" src="https://lh3.googleusercontent.com/proxy/"><div class="w3-display-topright w3-container">Example</div></div><div class="container w3-container"><b>Source Code:</b><pre>&lt;script&gt;<br>$(document).ready(function() {<br>$('img.hello').attr('src',$('img.hello').attr('src')+"WPr3H7HI37MVsZIDgLNEcP4hXD1zRscDe3pNlL5vyNX1UagT1yn7hPGQyBGJPW3DJUyQMDupBl-86YFD4QM6VZksvtVhNdxmG8stcB62ATWU4ROkVLW2Ums_=w543-h271-nc");<br>});<br><br>&lt;/script&gt;<br>&lt;img class="hello" src="https://lh3.googleusercontent.com/proxy/"/&gt;</pre></div></div><link href="https://www.w3schools.com/w3css/4/w3.css" rel="stylesheet"><div class="footer">Demikian Tutorial tips&amp;tricks saya kali ini. Jangan lupa baca <a href="https://web-manajemen.blogspot.com/p/search.html?q=Mengatasi+masalah+mixed+content">Mengatasi masalah mixed content image dengan proxy.php dan proxy.cgi</a>. <div class="w3-right right"><small>Cara menambah query di html image source</small></div></div>