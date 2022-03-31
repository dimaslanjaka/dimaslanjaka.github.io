---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://camo.githubusercontent.com/30c7758f9ac63488d3c2814ed2dcd9dbb7e967f3/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6865726f6b752d312e737667
date: 2018-11-17T14:08:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:18.037+07:00
subtitle: "Klik huruf i di keyboard tanpa tanda petikUbah kode di line pertama
  /usr/bin/env bash ke "
tags:
  - Tools
  - Script
  - JS
  - Software
  - PHP
  - Android
  - Tips & Tricks
title: Cara install heroku CLI di Termux
type: post
uuid: a48833a6-c005-4888-81b2-d030b4dc8f2a
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:18+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://camo.githubusercontent.com/30c7758f9ac63488d3c2814ed2dcd9dbb7e967f3/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6865726f6b752d312e737667
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://camo.githubusercontent.com/30c7758f9ac63488d3c2814ed2dcd9dbb7e967f3/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6865726f6b752d312e737667
description: "Klik huruf i di keyboard tanpa tanda petikUbah kode di line
  pertama /usr/bin/env bash ke "
excerpt: "Klik huruf i di keyboard tanpa tanda petikUbah kode di line pertama
  /usr/bin/env bash ke "
wordcount: 341
---

Heroku adalah platform cloud sebagai layanan (PaaS) yang mendukung beberapa bahasa pemrograman. Heroku, salah satu platform cloud pertama, telah dikembangkan sejak Juni 2007, ketika hanya mendukung bahasa pemrograman Ruby, tetapi sekarang mendukung Java, Node.js, Scala, Clojure, Python, PHP, dan Go. Untuk alasan ini, Heroku dikatakan sebagai platform polyglot karena memungkinkan pengembang membangun, menjalankan, dan menskala aplikasi dengan cara yang sama di semua bahasa. Heroku diakuisisi oleh Salesforce.com pada 2010 sebesar $ 212 juta. <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://camo.githubusercontent.com/30c7758f9ac63488d3c2814ed2dcd9dbb7e967f3/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6865726f6b752d312e737667">Berikut tutorial untuk install Heroku App dan pre-requirements nya:<br><ul><li>Instalasi PHP di Termux</li><li>Instalasi Composer di Termux</li><li>Instalasi Node.js di Termux</li><li>Instalasi Heroku App CLI di Termux</li></ul><h3>Tahap 1: update &amp; upgrade apt</h3><pre><br>cd $HOME<br>apt update -y<br>apt upgrade -y<br></pre><h3>Tahap 2: install <a href="https://web-manajemen.blogspot.com/2017/04/instal-php-cli-pada-android-instalasi.html">PHP</a> dan Composer</h3><pre><br>cd $HOME<br>apt install <a href="https://web-manajemen.blogspot.com/2017/04/instal-php-cli-pada-android-instalasi.html">php</a> -y<br>php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"<br>php -r "if (hash_file('sha384', 'composer-setup.php') === '93b54496392c062774670ac18b134c3b3a95e5a5e5c8f1a9f115f203b75bf9a129d5daa8ba6a13e2cc8a1da0806388a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"<br><a href="https://web-manajemen.blogspot.com/2017/04/instal-php-cli-pada-android-instalasi.html">php</a> composer-setup.php<br>php -r "unlink('composer-setup.php');"<br>mv composer.phar ../usr/bin/composer<br></pre><h3>Tahap 3: Install Node.Js</h3><pre><br>cd $HOME<br>apt install nodejs -y<br></pre><h3>Tahap 4: install Heroku CLI Library</h3><pre><br>cd $HOME<br>wget http://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-linux-x64.tar.gz -O heroku.tar.gz<br>mkdir heroku<br>tar -xvzf heroku.tar.gz -C heroku<br>cd heroku/heroku*<br>mv * ../<br>cd $HOME<br>mv heroku /data/data/com.termux/files/usr/lib/heroku<br>ln -s /data/data/com.termux/files/usr/lib/heroku/bin/heroku /data/data/com.termux/files/usr/bin/heroku<br></pre><h3>Tahap Configurasi Heroku CLI</h3><b>Akses Binary File:</b><pre><br>cd /data/data/com.termux/files/usr/lib/heroku/bin/<br>vim heroku<br></pre><b>Cara Edit:</b><div>Klik huruf "i" di keyboard (tanpa tanda petik)<br>Ubah kode di line pertama ( <kbd>#!/usr/bin/env bash</kbd> ) ke ( <kbd>#!/data/data/com.termux/files/usr/bin/env bash</kbd> ), tanpa tanda kurung loh ya... </div><b>Lalu save:</b> <br>Klik <b>ESC</b> <br>lalu ketik <b>:wq</b> <br>Lalu klik <b>Enter 2x</b><div>Selesai. </div><h3>Tahap 5: Test Command Line</h3><pre><br>heroku --version<br></pre><small> output: heroku-cli/x.xx.xx-xxxxxxx (android-xxxxx) node-vx.xx.xx </small>