---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://img.icons8.com/metro/1600/php.png
date: 2018-12-25T00:58:00.000+07:00
lang: en
location: ""
modified: 2020-01-24T06:39:22.738+07:00
subtitle: PHP = 5.4.0 , PHP 7
tags:
  - PHP
title: PHP check session has started
type: post
uuid: 8b9c3c94-5fe5-4888-87f6-ace74d654923
webtitle: WMI Gitlab
updated: 2020-01-24T06:39:22+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://img.icons8.com/metro/1600/php.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://img.icons8.com/metro/1600/php.png
description: PHP = 5.4.0 , PHP 7
excerpt: PHP = 5.4.0 , PHP 7
wordcount: 41
---

<img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://img.icons8.com/metro/1600/php.png" title="php" alt="php"><p>    <strong>PHP &gt;= 5.4.0 , PHP 7</strong></p><pre><code>if (session_status() == PHP_SESSION_NONE) {<br>    session_start();<br>}</code></pre><p>    Reference:     <a href="//www.php.net/manual/en/function.session-status.php" rel="nofollow noreferrer">        http://www.php.net/manual/en/function.session-status.php     </a></p><p>    For versions of <strong>PHP &lt; 5.4.0</strong></p><pre><code>if(session_id() == '') {<br>    session_start();<br>}</code></pre> <blockquote>PHP Check if session has started or not, then session_start()</blockquote>