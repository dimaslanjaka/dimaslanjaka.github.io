---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2017-07-28T22:55:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.866+07:00
subtitle: Dengan plugin komentar, orang dapat mengomentari konten di situs web
  Anda menggunakan akun Facebook mereka. Orangorang juga bisa memilih
tags:
  - JS
  - HTML
  - Social Media
title: Kode Recommend Dan Comments Facebook Based JavaScript
type: post
uuid: a53d40c3-9daa-4888-8c41-8925a20e7e8c
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Dengan plugin komentar, orang dapat mengomentari konten di situs
  web Anda menggunakan akun Facebook mereka. Orangorang juga bisa memilih
excerpt: Dengan plugin komentar, orang dapat mengomentari konten di situs web
  Anda menggunakan akun Facebook mereka. Orangorang juga bisa memilih
wordcount: 168
---

<h1 style="background-color: white; color: #20375f; font-family: &quot;helvetica neue&quot;, helvetica, arial, &quot;lucida grande&quot;, sans-serif; font-size: 24px; font-weight: normal; line-height: 32px; margin: 0px 0px 24px; padding: 0px;">Apakah fungsi plugin komentar Facebook untuk website ?</h1><h1 style="background-color: white; color: #20375f; font-family: &quot;helvetica neue&quot;, helvetica, arial, &quot;lucida grande&quot;, sans-serif; font-size: 24px; font-weight: normal; line-height: 32px; margin: 0px 0px 24px; padding: 0px;">Plugin Komentar</h1><div style="background-color: white; color: #4b4f56; font-family: &quot;helvetica neue&quot;, helvetica, arial, &quot;lucida grande&quot;, sans-serif; font-size: 14px; margin-bottom: 24px;">Dengan plugin komentar, orang dapat mengomentari konten di situs web Anda menggunakan akun Facebook mereka. Orang-orang juga bisa memilih untuk berbagi aktivitas komentarnya dengan teman-teman (dan teman dari teman mereka) di Facebook. Plugin komentar juga termasuk alat moderasi bawaan dan peringkat relevansi sosial.</div><h1 style="background-color: white; color: #20375f; font-family: &quot;helvetica neue&quot;, helvetica, arial, &quot;lucida grande&quot;, sans-serif; font-size: 24px; font-weight: normal; line-height: 32px; margin: 0px 0px 24px; padding: 0px;">Dan apakah fungsi tombol suka/recommend di Website ?.</h1><h1 style="background-color: white; color: #20375f; font-family: &quot;helvetica neue&quot;, helvetica, arial, &quot;lucida grande&quot;, sans-serif; font-size: 24px; font-weight: normal; line-height: 32px; margin: 0px 0px 24px; padding: 0px;">Tombol Suka untuk Web</h1><div style="background-color: white; color: #4b4f56; font-family: &quot;helvetica neue&quot;, helvetica, arial, &quot;lucida grande&quot;, sans-serif; font-size: 14px; margin-bottom: 24px;">Satu klik pada tombol Suka akan 'menyukai' beberapa bagian konten di web dan membagikannya di Facebook. Anda juga dapat menampilkan tombol Bagikan di samping tombol Suka untuk memungkinkan orang menambahkan pesan pribadi dan menyesuaikan dengan siapa mereka akan membagikan.</div><br>Nah berikut kode lengkap untuk website berbasis javascript:<br><br><pre>&lt;div id="fb-root"&gt;&lt;/div&gt;<br>&lt;script&gt;(function(d, s, id) {<br>  var js, fjs = d.getElementsByTagName(s)[0];<br>  if (d.getElementById(id)) {return;}<br>  js = d.createElement(s); js.id = id;<br>  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";<br>  fjs.parentNode.insertBefore(js, fjs);<br>}(document, 'script', 'facebook-jssdk'));<br>&lt;/script&gt;<br><br>&lt;script&gt;<br>  var pathURL = window.location.pathname; // Returns path only<br>var FullURL = window.location.href; // Returns full URL<br><br>  var fbjs="";<br>fbjs += '&lt;fb:comments href="' + FullURL+ ' " num_posts="5" width="500"&gt;&lt;/fb:comments&gt;';<br>  var fbjsl="";<br>  fbjsl += '&lt;div class="fb-like" data-href="' + FullURL + '" data-send="true" data-width="450" data-show-faces="true" data-action="recommend"&gt;&lt;/div&gt;';<br>  document.write(fbjsl);<br>  document.write('&lt;hr&gt;');<br>  document.write(fbjs);<br>&lt;/script&gt;</pre>Fungsi kode diatas adalah mengambil url yang sedang aktif (Current URL) untuk dijadikan object komentar dan like Facebook. Agar berfungsi optimal untuk halaman/post tertentu dan tepat.