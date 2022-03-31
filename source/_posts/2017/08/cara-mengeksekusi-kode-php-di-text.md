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
subtitle: Cara mengeksekusi kode PHP di Text Widget tanpa menggunakan Plugin
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
description: Cara mengeksekusi kode PHP di Text Widget tanpa menggunakan Plugin
excerpt: Cara mengeksekusi kode PHP di Text Widget tanpa menggunakan Plugin
wordcount: 44
---

Terkadang kita perlu mengeksekusi skrip PHP di widget teks namun secara default WordPress tidak hadir dengan fitur ini karena masalah keamanan.<br><div class="separator" style="clear: both; text-align: center;"><a href="https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.wpstuffs.com/wp-content/uploads/2013/05/php-wordpress-300x197.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="197" data-original-width="300" src="https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.wpstuffs.com/wp-content/uploads/2013/05/php-wordpress-300x197.jpg"></a></div>Anda bisa menggunakan beberapa plugin seperti PHP Text Widget dan PHP Code widget tapi mengapa ada orang yang menggunakannya saat kita bisa melakukannya dalam sepersekian detik. Anda tahu apa, Butuh waktu jauh lebih sedikit daripada memasang plugin.<br><br>Edit file functions.php dari tema Anda saat ini dan tambahkan kode berikut di bagian akhir file.<br><pre>//Run php on text widget<br>function php_execute($html){<br>if(strpos($html,"&lt;"."?php")!==false){ ob_start(); eval("?"."&gt;".$html);<br>$html=ob_get_contents();<br>ob_end_clean();<br>}<br>return $html;<br>}<br>add_filter('widget_text','php_execute',100);</pre>Sekarang hapus cache jika Anda menggunakan Plugin Cache seperti cache WPSuper Cache atau W3 Total.<br><br>Untuk mengecek kerja, Tempel kode PHP berikut di widget teks<br><pre>&lt;? Php echo 'Halo Dunia !!!' ?&gt;</pre>Sekarang periksa tempat di mana Anda telah menempatkan widget, Anda harus melihat " <b>Hello World !!!</b> "<br><div class="separator" style="clear: both; text-align: center;"><a href="https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.wpstuffs.com/wp-content/uploads/2013/05/hello-world-php-widget.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="70" data-original-width="268" src="https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.wpstuffs.com/wp-content/uploads/2013/05/hello-world-php-widget.png"></a></div><br>Jika Anda ingin memahami kode itu kemudian kunjungi - <a href="https://translate.googleusercontent.com/translate_c?depth=2&amp;nv=1&amp;rurl=translate.google.com&amp;sl=en&amp;sp=nmt4&amp;tl=id&amp;u=http://www.emanueleferonato.com/2011/04/11/executing-php-inside-a-wordpress-widget-without-any-plugin/&amp;usg=ALkJrhh34axLDLAkFT73kbmheCYdlTIvJw" target="_blank" rel="noopener noreferer nofollow"> Emanuele Feronato - italian geek dan PROgrammer</a>.<br><br>Via - <a href="https://translate.googleusercontent.com/translate_c?depth=2&amp;nv=1&amp;rurl=translate.google.com&amp;sl=en&amp;sp=nmt4&amp;tl=id&amp;u=http://www.wpsquare.com/execute-php-wordpress-text-widget-without-plugin/&amp;usg=ALkJrhgeZNEO10CoFQfjwJgpgpcOKG-uJA" target="_blank" rel="noopener noreferer nofollow"> WPSquare </a>