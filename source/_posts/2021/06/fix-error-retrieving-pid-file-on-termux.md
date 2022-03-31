---
author:
  nick: Dimas Lanjaka
  link: https://www.blogger.com/profile/07981649157148639830
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://lh3.googleusercontent.com/-bzDMCW2l14w/XuSyYUMCT-I/AAAAAAAAA_k/s6h8qlxl7joZyle2_ZVRQrN5tAQLu43JQCLcBGAsYHQ/s1600/1592046171170163-1.png
date: 2021-06-04T01:00:00.002+07:00
lang: en
location: ""
modified: 2021-06-04T01:00:00.192+07:00
subtitle: "Solution to error retrieving pid file Termux and apache Apache errors
  overview: 20014 Internal error specific"
tags:
  - Android
  - Tips & Tricks
title: Fix error retrieving pid file on termux apache
type: post
uuid: 95fc0792-3544-4888-8662-4579d3e71eeb
webtitle: WMI Gitlab
updated: 2021-06-04T01:00:00+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://lh3.googleusercontent.com/-bzDMCW2l14w/XuSyYUMCT-I/AAAAAAAAA_k/s6h8qlxl7joZyle2_ZVRQrN5tAQLu43JQCLcBGAsYHQ/s1600/1592046171170163-1.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://lh3.googleusercontent.com/-bzDMCW2l14w/XuSyYUMCT-I/AAAAAAAAA_k/s6h8qlxl7joZyle2_ZVRQrN5tAQLu43JQCLcBGAsYHQ/s1600/1592046171170163-1.png
description: "Solution to error retrieving pid file Termux and apache Apache
  errors overview: 20014 Internal error specific"
excerpt: "Solution to error retrieving pid file Termux and apache Apache errors
  overview: 20014 Internal error specific"
wordcount: 536
---

<div id="bootstrap-wrapper">	<h2>Solution to "error retrieving pid file" - Termux and apache</h2>  <p>    Apache errors overview:     </p><pre><code><br>      (20014) Internal error (specific information not available):<br><br>      AH00058: Error retrieving pid file var / run / apache2 / httpd.pid<br><br>      AH00059: Remove it before continuing if it is corrupted.<br>    </code></pre>    This mistake seems while summoning <b>apachectl</b> either with <b>start</b> or with <b>stop</b> and here and there happens when running on Previous <a href="/2021/06/install-xampp-lampp-on-android-non-root.html" rel="follow">Install XAMPP apache on android termux</a>.     <h5>Solution</h5>    <ul>      <li>Stop apache first         <pre><code class="lang-bash">apachectl stop</code></pre>      </li>      <li>        Change dir:         <pre><code class="lang-bash">cd /data/data/com.termux/files/usr/var/run/apache2</code></pre>      </li>      <li>Then delete the <b>httpd.pid</b> file:       <pre><code class="lang-bash">rm httpd.pid</code></pre>      </li>      <li>Or using this script:         <pre><code class="lang-bash"><br>          #<br>          # This script is part of the video,<br>          # Cómo instalar Apache Web Server en Android: https://youtu.be/cwp63pJMy_A and<br>          # it's intended to be used on Termux Android 32 bits in order to fix the issue,<br>          # https://github.com/termux/termux-packages/issues/1727<br>          # Before executing this script you must install termux-chroot see de video,<br>          # Cómo hacer chroot en Termux: https://youtu.be/gdy12S94BBk<br>          #<br>          #!/usr/bin/env bash<br>          aps=$(pidof httpd)<br>          pidf=/var/run/apache2/httpd.pid<br>          [[ -f $pidf ]] &amp;&amp; rm -f $pidf<br>          [[ "$aps" != "" ]] &amp;&amp; kill -9 $aps<br>        </code></pre>      </li>    </ul>  <p></p>   <p>    Github issues:     </p><ul>      <li><a href="https://github.com/termux/termux-packages/issues/1727" target="_blank" rel="noopener noreferer nofollow">https://github.com/termux/termux-packages/issues/1727</a></li>      <li><a href="https://stackoverflow.com/questions/27862664/13permission-denied-error-retrieving-pid-file-run-httpd-pid" target="_blank" rel="noopener noreferer nofollow">https://stackoverflow.com/questions/27862664/13permission-denied-error-retrieving-pid-file-run-httpd-pid</a></li>    </ul>  <p></p>   <p>    <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://lh3.googleusercontent.com/-bzDMCW2l14w/XuSyYUMCT-I/AAAAAAAAA_k/s6h8qlxl7joZyle2_ZVRQrN5tAQLu43JQCLcBGAsYHQ/s1600/1592046171170163-1.png" alt="apache error termux">  </p></div><script>hljs.initHighlightingOnLoad();</script>