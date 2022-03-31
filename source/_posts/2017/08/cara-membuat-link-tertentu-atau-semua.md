---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://www.dropbox.com/s320/5w9n86434703syx/unnamed%20(4).png?dl=1
date: 2017-08-01T16:48:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.872+07:00
subtitle: Cara membuat link tertentu atau semua link menjadi adf.ly tanpa
  menggunakan full page script
tags:
  - JS
  - Tips & Tricks
title: Cara membuat link tertentu atau semua link menjadi adf.ly tanpa
  menggunakan full page script
type: post
uuid: 16df9ae4-135a-4888-8e82-af47b880aea1
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://www.dropbox.com/s320/5w9n86434703syx/unnamed%20(4).png?dl=1
photos:
  - https://www.dropbox.com/s320/5w9n86434703syx/unnamed%20(4).png?dl=1
description: Cara membuat link tertentu atau semua link menjadi adf.ly tanpa
  menggunakan full page script
excerpt: Cara membuat link tertentu atau semua link menjadi adf.ly tanpa
  menggunakan full page script
wordcount: 91
---

<div class="separator" style="clear: both; text-align: center;"><a href="https://www.dropbox.com/s/5w9n86434703syx/unnamed%20(4).png?dl=1" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="200" data-original-width="500" height="128" src="https://www.dropbox.com/s320/5w9n86434703syx/unnamed%20(4).png?dl=1" width="320"></a></div>Kali ini saya akan share untuk publisher adf.ly.<br>Cekidot tutorial nya:<br><br><blockquote>Taruh kode nya di sebelum <kbd>&lt;/body&gt;</kbd> tag</blockquote>Untuk mengubah semua link menjadi adf.ly gunakan kode dibawah ini:<br><br><pre>&lt;script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"&gt;&lt;/script&gt;<br><br>&lt;script type="text/javascript"&gt;<br><br>var adfly_id = 9999; // change to your adf.ly id<br><br>$(document).ready(function() {<br>&nbsp; &nbsp; $("a").each(function() {<br>&nbsp; &nbsp; &nbsp; &nbsp; $(this).attr("href", 'http://adf.ly/'+adfly_id+'/'+$(this).attr("href"));<br>&nbsp; &nbsp; }); &nbsp; <br>});<br><br>&lt;/script&gt;</pre><br><blockquote>Maka semua link yang ada di website anda akan di ubah menjadi adf.ly</blockquote><br>Untuk menjadikan link tertentu ke adf.ly pakai kode dibawah ini:<br><br><pre>&lt;script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"&gt;&lt;/script&gt;<br><br>&lt;script type="text/javascript"&gt;<br><br>var adfly_id = 9999; // change to your adf.ly id<br><br>$(document).ready(function() {<br>&nbsp; &nbsp; $("a.adfly").each(function() {<br>&nbsp; &nbsp; &nbsp; &nbsp; $(this).attr("href", 'http://adf.ly/'+adfly_id+'/'+$(this).attr("href"));<br>&nbsp; &nbsp; }); &nbsp; <br>});<br><br>&lt;/script&gt;</pre><br>Untuk membuat link nya tambahkan <kbd>class="adfly"</kbd> contoh sebagai berikut:<br><pre>&lt;a class="adfly" href="http://web-manajemen.blogspot.com"&gt;Web&lt;/a&gt;</pre><br><blockquote>Note: Bila template atau theme anda sudah menggunakan jQuery, hapus saja kode pemanggil jquery ini : <kbd>&lt;script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"&gt;&lt;/script&gt;</kbd></blockquote><br>Selesai. Semoga artikel kali ini bermanfaat bagi anda semua.