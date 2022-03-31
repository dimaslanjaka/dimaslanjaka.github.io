---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.wpstuffs.com/wp-content/uploads/2013/05/php-wordpress-300x197.jpg
date: 2017-08-04T08:05:00.000+07:00
lang: en
location: ""
modified: 2017-08-04T08:05:15.759+07:00
subtitle: ""
tags:
  - Wordpress
  - PHP
title: Cara mengeksekusi kode PHP di Text Widget tanpa menggunakan Plugin
type: post
uuid: a16325c4-c2d4-4888-8a05-4c7f0e2c5f0a
webtitle: WMI Gitlab
updated: 2017-08-04T08:05:15+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.wpstuffs.com/wp-content/uploads/2013/05/php-wordpress-300x197.jpg
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.wpstuffs.com/wp-content/uploads/2013/05/php-wordpress-300x197.jpg
excerpt: null
description: null
wordcount: 44
---

<p>Terkadang kita perlu mengeksekusi skrip PHP di widget teks namun secara default WordPress tidak hadir dengan fitur ini karena masalah keamanan.<br></p><div class="separator" style="clear: both; text-align: center;"><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGltYXNsYW5qYWthL2ltYWdlL2ZldGNoL2h0dHA6Ly93d3cud3BzdHVmZnMuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDEzLzA1L3BocC13b3JkcHJlc3MtMzAweDE5Ny5qcGc=" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="nofollow noopener" target="_blank"><img border="0" data-original-height="197" data-original-width="300" src="https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.wpstuffs.com/wp-content/uploads/2013/05/php-wordpress-300x197.jpg"></a></div>Anda bisa menggunakan beberapa plugin seperti PHP Text Widget dan PHP Code widget tapi mengapa ada orang yang menggunakannya saat kita bisa melakukannya dalam sepersekian detik. Anda tahu apa, Butuh waktu jauh lebih sedikit daripada memasang plugin.<br><br>Edit file functions.php dari tema Anda saat ini dan tambahkan kode berikut di bagian akhir file.<br><pre>//Run php on text widget<br>function php_execute($html){<br>if(strpos($html,“&lt;”.“?php”)!==false){ ob_start(); eval(“?”.“&gt;”.$html);<br>$html=ob_get_contents();<br>ob_end_clean();<br>}<br>return $html;<br>}<br>add_filter(‘widget_text’,‘php_execute’,100);</pre>Sekarang hapus cache jika Anda menggunakan Plugin Cache seperti cache WPSuper Cache atau W3 Total.<br><br>Untuk mengecek kerja, Tempel kode PHP berikut di widget teks<br><pre>&lt;? Php echo ‘Halo Dunia !!!’ ?&gt;</pre>Sekarang periksa tempat di mana Anda telah menempatkan widget, Anda harus melihat &quot; <b>Hello World !!!</b> &quot;<br><div class="separator" style="clear: both; text-align: center;"><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGltYXNsYW5qYWthL2ltYWdlL2ZldGNoL2h0dHA6Ly93d3cud3BzdHVmZnMuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDEzLzA1L2hlbGxvLXdvcmxkLXBocC13aWRnZXQucG5n" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="nofollow noopener" target="_blank"><img border="0" data-original-height="70" data-original-width="268" src="https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.wpstuffs.com/wp-content/uploads/2013/05/hello-world-php-widget.png"></a></div><br>Jika Anda ingin memahami kode itu kemudian kunjungi - <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly90cmFuc2xhdGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3RyYW5zbGF0ZV9jP2RlcHRoPTImbnY9MSZydXJsPXRyYW5zbGF0ZS5nb29nbGUuY29tJnNsPWVuJnNwPW5tdDQmdGw9aWQmdT1odHRwOi8vd3d3LmVtYW51ZWxlZmVyb25hdG8uY29tLzIwMTEvMDQvMTEvZXhlY3V0aW5nLXBocC1pbnNpZGUtYS13b3JkcHJlc3Mtd2lkZ2V0LXdpdGhvdXQtYW55LXBsdWdpbi8mdXNnPUFMa0pyaGgzNGF4TERMQWtGVDcza2JtaGVDWWRsVEl2Snc=" target="_blank" rel="nofollow noopener"> Emanuele Feronato - italian geek dan PROgrammer</a>.<br><br>Via - <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly90cmFuc2xhdGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3RyYW5zbGF0ZV9jP2RlcHRoPTImbnY9MSZydXJsPXRyYW5zbGF0ZS5nb29nbGUuY29tJnNsPWVuJnNwPW5tdDQmdGw9aWQmdT1odHRwOi8vd3d3Lndwc3F1YXJlLmNvbS9leGVjdXRlLXBocC13b3JkcHJlc3MtdGV4dC13aWRnZXQtd2l0aG91dC1wbHVnaW4vJnVzZz1BTGtKcmhnZVpORU8xMENvRlFmandKZ3BncGNPS0ctdUpB" target="_blank" rel="nofollow noopener"> WPSquare </a>
