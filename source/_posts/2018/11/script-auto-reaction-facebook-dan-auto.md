---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://4.bp.blogspot.com/-8grw-L-Uyu0/Ulvum_9MWCI/AAAAAAAAAFE/gAP0SrSBdWE/s280/cp.png
date: 2018-11-03T20:16:00.001+07:00
lang: en
location: ""
modified: 2019-02-08T22:17:27.096+07:00
subtitle: Download Scriptauto reaction facebook
tags:
  - Script
  - Social Media
  - PHP
  - Facebook
  - Tips & Tricks
title: "[NEW] Script auto reaction facebook dan auto refresh token PHP"
type: post
uuid: 6ae454f6-561b-4888-8c9b-eb88be2a3c03
webtitle: WMI Gitlab
updated: 2019-02-08T22:17:27+07:00
thumbnail: https://4.bp.blogspot.com/-8grw-L-Uyu0/Ulvum_9MWCI/AAAAAAAAAFE/gAP0SrSBdWE/s280/cp.png
photos:
  - https://4.bp.blogspot.com/-8grw-L-Uyu0/Ulvum_9MWCI/AAAAAAAAAFE/gAP0SrSBdWE/s280/cp.png
description: Download Scriptauto reaction facebook
excerpt: Download Scriptauto reaction facebook
wordcount: 590
---

<div class="">   <center><a href="https://pastebin.com/b0Q8JkH5" class="w3-btn w3-green" rel="noopener noreferer nofollow">Download Script</a></center><iframe src="https://pastebin.com/raw/b0Q8JkH5" frameborder="0" width="100%" height="300px">auto reaction facebook</iframe>  </div>  <div>   <h3>Step by Step Install BOT reaction for <strong>cPanel</strong></h3>   <ol><li><a href="https://pastebin.com/b0Q8JkH5" class="w3-text-green" rel="noopener noreferer nofollow">Download Scriptnya</a>. simpan dengan nama bot.php</li>   <li>Kalau sudah, Save File Bot nya lalu Upload ke Hosting kalian masing-masing.. </li>   <li>Sekarang waktunya Setting Cronjob buat File Bot kalian, agar bisa berjalan dalam waktu yg udah ditentukan :) Untuk settingannya kalian bisa lihat seperti gambar dibawah ini :</li>   <div>     <img border="0" height="123" src="https://4.bp.blogspot.com/-8grw-L-Uyu0/Ulvum_9MWCI/AAAAAAAAAFE/gAP0SrSBdWE/s280/cp.png" width="280">   </div>   <div>    <em>nb. Untuk Waktu Eksekusi, itu terserah sesuai kalian masing2.. :)</em>   </div>   <li>Kalo udah mantep settingannya, Klik Add New Cron Job. dan Lihatlah Akun facebook agan bakal ngelike status temen secara otomatis sesuai waktu yang sudah ditentukan tadi.</li>   </ol>   <blockquote>Atau bila kalian bingung dengan tutorial pemasangan cronjob diatas. anda bisa menggunakan alternatif <a href="https://cse.google.com/cse?cof=FORID:0&amp;cx=partner-pub-7975270895217217:8541237564&amp;q=cronjob" class="w3-text-red" rel="noopener noreferer nofollow">Di Pencarian ini</a> atau <a href="https://web-manajemen.blogspot.com/2018/11/cara-membuat-cron-job-menggunakan.html">Cara Membuat Cron Job Menggunakan webcron.org</a></blockquote>  </div>  <div>   <h3>Cara Install Bot Auto Reaction Facebook Lewat Termux</h3>   <ol>    <li>     <a href="https://pastebin.com/b0Q8JkH5" class="w3-text-green" rel="noopener noreferer nofollow">Download Scriptnya</a>. simpan dengan nama bot.php     </li>    <li>Taruh file bot.php ke /sdcard</li>    <li>Edit bot.php. masukkan user dan password facebooknya</li>    <li>Lalu masuk ke termux. dan ketik kode dibawah ini</li>   </ol>   <pre><br>   cd $HOME<br>   apt update &amp;&amp; apt upgrade<br>   apt install vim php -y<br>   export VISUAL=vim<br>   export EDITOR=vim<br>   echo '#!/bin/sh' &gt; autoloader<br>   echo "cd /sdcard" &gt;&gt; autoloader<br>   echo "php -f bot.php" &gt;&gt; autoloader<br>   chmod 777 autoloader<br>   cat autoloader<br>   user=$(whoami)<br>   echo "*/1 * * * * sh $HOME/autoloader" &gt; cron<br>   crontab -c $user cron<br>   crontab -r<br>   crontab cron<br>   clear &amp;&amp; crontab -l &amp;&amp; cat autoloader<br>   crond stop &amp;&amp; crond start<br>   </pre>   Hasilnya akan keluar di /sdcard/results.html. seperti dibawah ini.     <div class="w3-center">    <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://imgdb.net/images/4306.jpg" class="w3-center" width="300" height="300">    </div>  </div> <iframe width="100%" height="294" src="https://www.youtube.com/embed/-ImhbXQEdPI?&amp;theme=dark&amp;autohide=2" frameborder="0"></iframe><div style="font-size: 0.8em"><a href="https://youtu.be/-ImhbXQEdPI" rel="noopener noreferer nofollow">How to Set cronjob on termux.</a></div><iframe width="100%" height="294" src="https://www.youtube.com/embed/nDKrTtemAyI?&amp;theme=dark&amp;autohide=2" frameborder="0"></iframe><div style="font-size: 0.8em"><a href="https://youtu.be/nDKrTtemAyI" rel="noopener noreferer nofollow">How to Set cronjob from cron-job.org.</a></div>