---
author:
  nick: Dimas Lanjaka
  link: https://www.blogger.com/profile/07981649157148639830
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://parzibyte.me/blog/wp-content/uploads/2018/11/Configuraci%C3%B3n-httpd-en-termux-Android.jpg
date: 2021-06-03T06:00:00.002+07:00
lang: en
location: ""
modified: 2021-06-03T06:00:00.187+07:00
subtitle: Previous Install XAMPP apache on android termux Fix error starting
  apache on android Open httpd.conf nano
tags:
  - Android
  - Tips & Tricks
title: Fix apache wont run on android
type: post
uuid: 7923e4c5-8f45-4888-8354-c98606dbd5d0
webtitle: WMI Gitlab
updated: 2021-06-03T06:00:00+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://parzibyte.me/blog/wp-content/uploads/2018/11/Configuraci%C3%B3n-httpd-en-termux-Android.jpg
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://parzibyte.me/blog/wp-content/uploads/2018/11/Configuraci%C3%B3n-httpd-en-termux-Android.jpg
description: Previous Install XAMPP apache on android termux Fix error starting
  apache on android Open httpd.conf nano
excerpt: Previous Install XAMPP apache on android termux Fix error starting
  apache on android Open httpd.conf nano
wordcount: 195
---

<div id="bootstrap-wrapper">  Previous <a href="/2021/06/install-xampp-lampp-on-android-non-root.html" rel="follow">Install XAMPP apache on android termux</a>  <h2>Fix error starting apache on android</h2>  <p>  </p><ul>    <li>Open <b>httpd.conf</b>      <pre><code class="lang-bash"><span class="hljs-keyword">nano</span> /data/data/com.termux/files/usr/etc/apache2/httpd.conf</code></pre>    </li>    <li>Find the lines that contain <b>LoadModule</b>. Comment the following line with <b>hash(#)</b>:       <pre><code class="lang-conf">LoadModule mpm_worker_module <span class="hljs-regexp">libexec/apache2/mod_mpm_worker.so</span></code></pre>      to       <pre><code class="lang-conf"><span class="hljs-regexp">#</span>LoadModule mpm_worker_module <span class="hljs-regexp">libexec/apache2/mod_mpm_worker.so</span></code></pre>    </li>    <li>Then uncomment the following line (remove hash[#]):       <pre><code class="lang-conf"><span class="hljs-regexp">#</span>LoadModule mpm_prefork_module <span class="hljs-regexp">libexec/apache2/mod_mpm_prefork.so</span></code></pre>      to       <pre><code class="lang-conf">LoadModule mpm_prefork_module <span class="hljs-regexp">libexec/apache2/mod_mpm_prefork.so</span></code></pre>    </li>    Preview:     <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://parzibyte.me/blog/wp-content/uploads/2018/11/Configuraci%C3%B3n-httpd-en-termux-Android.jpg" alt="Preview">  </ul>  <p></p></div><script>hljs.initHighlightingOnLoad();</script>