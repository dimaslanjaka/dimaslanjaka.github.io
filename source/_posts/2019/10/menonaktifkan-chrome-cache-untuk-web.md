---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://i.stack.imgur.com/Grwsc.png
date: 2019-10-14T22:15:00.000+07:00
lang: en
location: ""
modified: 2019-10-14T22:18:48.610+07:00
subtitle: Bagaimana cara menonaktifkan disable chrome cache untuk website
  development ?JawabannyaThe Chrome DevToolsTutorial :Buka development
tags:
  - Blogger
  - Blogging
  - Tips & Tricks
title: Menonaktifkan Chrome Cache Untuk Web Development
type: post
uuid: 7ed934db-24ac-4888-8f72-b8ab7782b3aa
webtitle: WMI Gitlab
updated: 2019-10-14T22:18:48+07:00
thumbnail: https://i.stack.imgur.com/Grwsc.png
photos:
  - https://i.stack.imgur.com/Grwsc.png
description: Bagaimana cara menonaktifkan disable chrome cache untuk website
  development ?JawabannyaThe Chrome DevToolsTutorial :Buka development
excerpt: Bagaimana cara menonaktifkan disable chrome cache untuk website
  development ?JawabannyaThe Chrome DevToolsTutorial :Buka development
wordcount: 267
---

<div dir="ltr" style="text-align: left;" trbidi="on"><b>Bagaimana cara menonaktifkan (disable) chrome cache untuk website development ?</b><br>Jawabannya&nbsp;<span style="background-color: white; color: #242729; font-family: &quot;arial&quot; , &quot;helvetica neue&quot; , &quot;helvetica&quot; , sans-serif; font-size: 15px;">The Chrome DevTools</span><br><span style="background-color: white; color: #242729; font-family: &quot;arial&quot; , &quot;helvetica neue&quot; , &quot;helvetica&quot; , sans-serif; font-size: 15px;"><br></span><span style="background-color: white; color: #242729; font-family: &quot;arial&quot; , &quot;helvetica neue&quot; , &quot;helvetica&quot; , sans-serif; font-size: 15px;">Tutorial :</span><br><br><ol style="text-align: left;"><li><span style="background-color: white; color: #242729; font-family: &quot;arial&quot; , &quot;helvetica neue&quot; , &quot;helvetica&quot; , sans-serif; font-size: 15px;">Buka development tools (devtools) dengan cara</span><ul><li>Click <kbd>F12</kbd></li><li>      <kbd>Command</kbd>+      <kbd>Option</kbd>+      <kbd>i</kbd> on Mac    </li><li>      <kbd>Control</kbd>+      <kbd>Shift</kbd>+      <kbd>i</kbd> on Windows or Linux    </li></ul></li><li>Click <kbd><b>Network</b></kbd> Tab</li><li><strong>Check</strong>&nbsp;the&nbsp;   <code>Disable cache</code> </li></ol><a href="https://i.stack.imgur.com/Grwsc.png" imageanchor="1" rel="noopener noreferer nofollow"><img border="0" data-original-height="137" data-original-width="800" src="https://i.stack.imgur.com/Grwsc.png"></a><br><blockquote>Settingan ini hanya akan berfungsi <b>Hanya bila DevTools Terbuka Saja</b></blockquote><h4>Alternatif DevTools (Hard Reload &amp;&amp; Empty Cache and Reload)</h4>Tutorial: <br><ul><li>    <kbd>Command</kbd>+     <kbd>Option</kbd>+     <kbd>R</kbd> on Mac   </li><li>    <kbd>Control</kbd>+     <kbd>Shift</kbd>+     <kbd>R</kbd> on Windows/Linux </li></ul><a href="https://i.stack.imgur.com/QAtRy.jpg" imageanchor="1" rel="noopener noreferer nofollow"><img border="0" data-original-height="109" data-original-width="360" src="https://i.stack.imgur.com/QAtRy.jpg"></a> <h4>Opsional lain (Menggunakan .htaccess)</h4><pre><br>&lt;filesMatch "\.(html|htm|js|css)$"&gt;<br>  FileETag None<br>  &lt;ifModule mod_headers.c&gt;<br>     Header unset ETag<br>     Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"<br>     Header set Pragma "no-cache"<br>     Header set Expires "Wed, 11 Jan 1984 05:00:00 GMT"<br>  &lt;/ifModule&gt;<br>&lt;/filesMatch&gt;<br></pre></div>