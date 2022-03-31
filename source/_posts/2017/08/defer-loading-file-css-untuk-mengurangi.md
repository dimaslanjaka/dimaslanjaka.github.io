---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRkn6QekHv4y1EKpYAOy9FD3qAngAFoLYAB9faenCIkJi44YFLGAmFBWDa5
date: 2017-08-07T19:11:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:18.074+07:00
subtitle: ""
tags:
  - Wordpress
  - JS
  - Blogger
  - HTML
  - Blogging
title: Defer Loading File CSS untuk Mengurangi Waktu Pemuatan Halaman
type: post
uuid: 7c12cdd4-eeee-4888-8529-a5ff0af2ed6e
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:18+07:00
thumbnail: https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRkn6QekHv4y1EKpYAOy9FD3qAngAFoLYAB9faenCIkJi44YFLGAmFBWDa5
photos:
  - https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRkn6QekHv4y1EKpYAOy9FD3qAngAFoLYAB9faenCIkJi44YFLGAmFBWDa5
excerpt: null
description: null
wordcount: 94
---

<div class="separator" style="clear: both; text-align: center;"><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9lbmNyeXB0ZWQtdGJuMy5nc3RhdGljLmNvbS9pbWFnZXM/cT10Ym46QU5kOUdjUmtuNlFla0h2NHkxRUtwWUFPeTlGRDNxQW5nQUZvTFlBQjlmYWVuQ0lrSmk0NFlGTEdBbUZCV0RhNQ==" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="nofollow noopener" target="_blank"><img alt="defer css asynchronous css" border="0" data-original-height="275" data-original-width="535" height="164" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRkn6QekHv4y1EKpYAOy9FD3qAngAFoLYAB9faenCIkJi44YFLGAmFBWDa5" title="defer css asynchronous css" width="320"></a></div><br>Waktu buka halaman adalah salah satu hal penting bagi pengunjung Anda, dan sama pentingnya bagi mesin telusur. Saat menyertakan beberapa file JavaScript dan <abbr title="Cascading Style Sheets">CSS</abbr> , browser harus menunggu sampai semua file tersebut telah diunduh untuk merender halaman.<br>Bergantung pada kecepatan koneksi, diperlukan beberapa detik untuk memuat semua sumber dan pengunjung harus menganggur sampai saat itu.<br>Teknik yang kita bahas di sini akan memungkinkan browser untuk menampilkan halaman <abbr title="Hyper Text Markup Language">HTML</abbr> awalnya tanpa gaya apapun, sehingga pengunjung setidaknya bisa mulai membaca isinya. Begitu halaman di-load, style sheet akan dimuat dan diterapkan tanpa memblokir thread utama. Ini mirip dengan <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly90cmFuc2xhdGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3RyYW5zbGF0ZV9jP2RlcHRoPTImbnY9MSZydXJsPXRyYW5zbGF0ZS5nb29nbGUuY29tJnNsPWVuJnNwPW5tdDQmdGw9aWQmdT1odHRwOi8vd3d3LnRlY2h2aWdpbC5jb20vdGlwcy10cmlja3MvMzAzL2RlZmVyLWphdmFzY3JpcHQtZGVjcmVhc2UtcGFnZWxvYWQtdGltZS8mdXNnPUFMa0pyaGpPajVUTmdxSHNMaF9vWHJjZEsyRTA5RFlWQ1E=" title="Tangguhkan pemuatan tombol media sosial untuk memperbaiki waktu buka halaman" rel="nofollow noopener" target="_blank"> menunda pemuatan tombol media sosial </a> .<br>Anda mungkin berpikir mengapa seseorang harus mengekspos tampilan halaman yang jelek tanpa memuat gaya! Itu benar, meski itu akan membuat kesan buruk. Jadi, pendekatan terbaik bisa termasuk kode CSS kritis yang diperlukan untuk memberi gaya pada konten paruh atas di halaman HTML itu sendiri (di bawah bagian kepala halaman web), dan memuat file non-kritis atau besar dengan menggunakan metode di bawah ini.<br><br><blockquote>Taruh kode kode (pilih salah satu) diatas <kbd>&lt;/body&gt;</kbd> tag</blockquote><h2>Async CSS Loading</h2>Kami dapat menggunakan fungsi JavaScript sederhana untuk menyelesaikan tujuan kami.Berikut adalah contoh untuk memuat satu lembar gaya setelah halaman dimuat.<br><pre>&lt;script&gt;<br>//define function to load css<br>var loadCss = function(){<br>    var cssLink = document.createElement('link');<br>    cssLink.rel = 'stylesheet';<br>    cssLink.href = 'myawesomestyle.css';<br>    var head = document.getElementsByTagName('head')[0];<br>    head.parentNode.insertBefore(cssLink, head);<br>};<br> <br>//call function on window load<br>window.addEventListener('load', loadCss);<br>&lt;/script&gt;</pre><h2>    Memuat Beberapa Stylesheets<br></h2>Untuk memudahkan, kita akan parameterize fungsi loadCss untuk menerima path<br>file. Dan kemudian, kita akan menentukan fungsi induk kita yang akan<br>memanggil fungsi di atas secara berulang untuk setiap file tunggal.<br><pre>&lt;script&gt;<br>var loadMultipleCss = function(){<br>    //load local stylesheet<br>    loadCss('myawesomestyle.css');<br>     <br>    //load Bootstrap from CDN<br>    loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');<br>     <br>    //load Bootstrap theme from CDN<br>    loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css');<br>}<br> <br>var loadCss = function(cssPath){<br>    var cssLink = document.createElement('link');<br>    cssLink.rel = 'stylesheet';<br>    cssLink.href = cssPath;<br>    var head = document.getElementsByTagName('head')[0];<br>    head.parentNode.insertBefore(cssLink, head);<br>};<br> <br>//call function on window load<br>window.addEventListener('load', loadMultipleCss);<br>&lt;/script&gt;</pre>Sebelum dan sesudah menerapkan tweak ini, bandingkan skor kecepatan halaman Anda. Jika Anda menghadapi masalah dalam menerapkan ini, lakukan posting di komentar. Saya akan mencoba membalas