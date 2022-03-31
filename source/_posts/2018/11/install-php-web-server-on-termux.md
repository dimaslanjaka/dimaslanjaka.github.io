---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://images.weserv.nl/?url=https://lh3.googleusercontent.com/3M76NJzxn73Dl2MOkOhrXCgBxTKtVkwkL1gAkTrRLzK5a7khSS2grnNJVU5SzgbhxOa_LKqI4OBP9dfaDz0=w1080-h1920-rw-no
date: 2018-11-13T09:19:00.001+07:00
lang: en
location: ""
modified: 2018-11-19T11:10:38.193+07:00
subtitle: Install PHP Web Server on Termux connect the previous article about
  how to install maria db in termux Install MariaDB on Termux ,
tags:
  - Tools
  - PHP
  - Android
  - Tips & Tricks
title: Install PHP Web Server on Termux
type: post
uuid: b1df07f7-07d3-4888-8c0b-66bda79c83e7
webtitle: WMI Gitlab
updated: 2018-11-19T11:10:38+07:00
thumbnail: https://images.weserv.nl/?url=https://lh3.googleusercontent.com/3M76NJzxn73Dl2MOkOhrXCgBxTKtVkwkL1gAkTrRLzK5a7khSS2grnNJVU5SzgbhxOa_LKqI4OBP9dfaDz0=w1080-h1920-rw-no
photos:
  - https://images.weserv.nl/?url=https://lh3.googleusercontent.com/3M76NJzxn73Dl2MOkOhrXCgBxTKtVkwkL1gAkTrRLzK5a7khSS2grnNJVU5SzgbhxOa_LKqI4OBP9dfaDz0=w1080-h1920-rw-no
description: Install PHP Web Server on Termux connect the previous article about
  how to install maria db in termux Install MariaDB on Termux ,
excerpt: Install PHP Web Server on Termux connect the previous article about how
  to install maria db in termux Install MariaDB on Termux ,
wordcount: 1997
---

<h1 for="title"> Install PHP Web Server on Termux</h1><div class="container-fluid container" id="wrapper"><div class="row-fluid" id="mainbody"><!--    --><br><div class="span8 content" id="content"><div class="post"><h1 class="post-3408 post type-post status-publish format-standard hentry category-android category-linux category-operating-sistem category-review tag-install-apache2-in-termux tag-install-web-server-di-android tag-install-web-server-di-termux tag-install-web-server-php-di-android tag-linux-in-android" id="post-3408"> <span class="notranslate"> </span> <a alt=" Install PHP Web Server on Termux " href="https://web-manajemen.blogspot.com/p/search.html?q=install%20server%20termux#internal_link_http://www.goblooge.com/blog/install-php-web-server-di-termux/" rel="follow, referer, index" target="_blank" title=" Install PHP Web Server on Termux "><img alt=" Install PHP Web Server on Termux " height="auto" src="https://images.weserv.nl/?url=https://lh3.googleusercontent.com/3M76NJzxn73Dl2MOkOhrXCgBxTKtVkwkL1gAkTrRLzK5a7khSS2grnNJVU5SzgbhxOa_LKqI4OBP9dfaDz0=w1080-h1920-rw-no" title=" Install PHP Web Server on Termux " width="100%"></a> <span class="notranslate"> Install PHP Web Server on Termux</span> </h1><div class="entry"><span class="notranslate"> connect the previous article about how to install maria db in termux ( <a alt=" Install PHP Web Server on Termux " href="https://web-manajemen.blogspot.com/p/search.html?q=install%20mariadb%20termux#internal_link_http://www.goblooge.com/blog/install-mariadb-di-termux/" rel="follow, referer, index" target="_blank" title=" Install PHP Web Server on Termux ">Install MariaDB on Termux</a> ), as a complement we will <em>install the apache web server</em> in <em>termux</em> .</span> <span class="notranslate"> due to the differences in termux compared to native Linux, the default ports for <em>web servers</em> like 80 etc cannot be used, so later we will use other <em>ports</em> to run the <em>web server</em> .</span> <br><div class="wp-caption aligncenter"><a alt=" Install PHP Web Server on Termux «j " href="https://lh3.googleusercontent.com/3M76NJzxn73Dl2MOkOhrXCgBxTKtVkwkL1gAkTrRLzK5a7khSS2grnNJVU5SzgbhxOa_LKqI4OBP9dfaDz0=w1080-h1920-rw-no" rel="noopener noreferer nofollow" target="_blank" title=" Install PHP Web Server on Termux "><img alt=" Install PHP Web Server on Termux " class="size-medium" height="auto" src="https://images.weserv.nl/?url=https://lh3.googleusercontent.com/3M76NJzxn73Dl2MOkOhrXCgBxTKtVkwkL1gAkTrRLzK5a7khSS2grnNJVU5SzgbhxOa_LKqI4OBP9dfaDz0=w1080-h1920-rw-no" title=" Install PHP Web Server on Termux " width="100%"></a> <br><div class="wp-caption-text"><span class="notranslate"> Install Apache WEb server</span> </div></div><span class="notranslate"> to install Apache web server is quite easy, just type</span> <br><pre class="wp-code-highlight prettyprint linenums:1"> <span class="notranslate"> #apt install Apache2</span> </pre><span class="notranslate"> wait until the process is complete, if it's already running it it's easy enough.</span> <span class="notranslate"> all we need to do is type the command.</span> <br><pre class="wp-code-highlight prettyprint linenums:1"> <span class="notranslate"> #php -S ip: port -t /path/to/web/file.php</span> </pre><span class="notranslate"> where ip is the ip address of the web that we want, the port is the port we want to use as an http port, if by chance port 80 is not used it can use port 80, and /path/to/web/file.php is the directory of the php file that we want to run.</span> <br><span class="notranslate"> suppose I have a file at /sdcard/www/html/index.php.</span> <span class="notranslate"> then the ip address of my cellphone on the WLAN network is 192.168.1.200 and I want to use port 8080 as the port just type</span> <br><pre class="wp-code-highlight prettyprint linenums:1"> <span class="notranslate"> #php -S 192.168.1.200:8080 -t / sdcard / www / html / index.php</span>  </pre><span class="notranslate"> to try it just type in the android browser localhost / index.php or if you happen to be connected to the network can use the direct ip address 192.168.1.200, and try accessing it from another cellphone or computer.</span> <span class="notranslate"> if it happens to not have a LAN / Wifi network then ip can be filled with 127.0.0.1.</span> <br><span class="notranslate"> maybe this is what I can <em>share</em> , in the next article I will discuss about ssh server in termux, so we can tamper with <em>console thermux</em> directly using the ssh <em>server</em> .</span> <span class="notranslate"> it can even be used for <em>debugging</em> when we <em>develop</em> applications on Android.</span><br><span class="notranslate">see you in the next article</span><br><!-- Facebook Comments Plugin for WordPress: http://peadig.com/wordpress-plugins/facebook-comments/ -->     </div><!--entry--> </div></div><!--content--> <!--WP Code Highlight_start--><!--WP Code Highlight_end--> </div><!--mainbody--> <!--footer --> <script src="https://s0.wp.com/wp-content/js/devicepx-jetpack.js?ver=201846" type="text/javascript"></script><script async="async" defer="" src="https://stats.wp.com/e-201846.js" type="text/javascript"></script> </div><!--wrapper-->