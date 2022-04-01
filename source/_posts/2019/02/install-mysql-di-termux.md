---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - MYSQL
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://netsolutions.net.au/wp-content/uploads/2015/07/mysql-mariadb-795x480.png
date: 2019-02-07T13:09:00.001+07:00
lang: en
location: ""
modified: 2019-02-07T13:18:15.997+07:00
subtitle: Install dan buka termuxketik pkg install mariadbmkdir
  ..usr/etc/my.cnf.dmysql_install_dbmysqldBuka tab sesi baru, lalu ketik mysql
  -u root
tags:
  - Tools
  - Tips & Tricks
  - Linux/Unix
  - MySQL
title: Install MySQL di termux
type: post
uuid: 88f4fad2-2966-4888-8741-45f35477c275
webtitle: WMI Gitlab
updated: 2022-03-26T19:01:31+0700
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://netsolutions.net.au/wp-content/uploads/2015/07/mysql-mariadb-795x480.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://netsolutions.net.au/wp-content/uploads/2015/07/mysql-mariadb-795x480.png
description: Install dan buka termuxketik pkg install mariadbmkdir
  ..usr/etc/my.cnf.dmysql_install_dbmysqldBuka tab sesi baru, lalu ketik mysql
  -u root
excerpt: Install dan buka termuxketik pkg install mariadbmkdir
  ..usr/etc/my.cnf.dmysql_install_dbmysqldBuka tab sesi baru, lalu ketik mysql
  -u root
wordcount: 207
---

<div dir="ltrx" style="text-align: left;" trbidi="on"><img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://netsolutions.net.au/wp-content/uploads/2015/07/mysql-mariadb-795x480.png"><ol style="text-align: left;"><li>Install dan buka termux</li><li>ketik <pre>pkg install mariadb<br>mkdir ../usr/etc/my.cnf.d<br>mysql_install_db<br>mysqld<br></pre></li><li>Buka tab sesi baru, lalu ketik <pre id="pre">mysql -u root -p<br></pre></li><li> buka tab sesi baru, lalu ketik  <pre id="pre">mysql_secure_installation</pre>lalu ikuti step by step nya. <b>jika ingin memberi password untuk ROOT, tinggal ketik 'y' pada saat step pemberian password terhadap root user</b></li><li>selesai.</li></ol><blockquote class="tr_bq">bila ingin menjalankan mysql, setiap pertama kali membuka termux ketik mysqld lalu buka tab sesi baru untuk melakukan open server seperti php misalnya (php -s localhost:8080)</blockquote></div>
