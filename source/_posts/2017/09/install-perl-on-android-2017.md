---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://imgdb.net/images/3178.png
date: 2017-09-03T15:08:00.000+07:00
lang: en
location: ""
modified: 2017-09-03T15:08:04.012+07:00
subtitle: ""
tags:
  - Android
  - Tips & Tricks
title: Install perl on android 2017
type: post
uuid: 95238ea0-8128-4888-882c-295bcebb9381
webtitle: WMI Gitlab
updated: 2017-09-03T15:08:04+07:00
thumbnail: https://imgdb.net/images/3178.png
photos:
  - https://imgdb.net/images/3178.png
excerpt: null
description: null
wordcount: 252
---

<p>Tutorial Install Perl On Android:<br></p><div class="separator" style="clear: both; text-align: center;"><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9pbWdkYi5uZXQvaW1hZ2VzLzMxNzgucG5n" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="nofollow noopener" target="_blank"><img border="0" data-original-height="321" data-original-width="458" height="224" src="https://imgdb.net/images/3178.png" width="320"></a></div><ol><li>Download BugTroid Pro Apk -&gt; <a alt="BugTroid Pro" href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vcy85N2c5N2JnMTRneWluYWEvQnVndHJvaWQlMjBQZW50ZXN0aW5nJTIwUFJPJTIwdjUuMC4xJTVCQmFsYSUyMEt1cmF3YSU1RCUyMC5hcGs/ZGw9MQ==" rel="nofollow noopener" title="BugTroid Pro" target="_blank">Download</a> <div class="separator" style="clear: both; text-align: center;"><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9pbWdkYi5uZXQvaW1hZ2VzLzMxNzcucG5n" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="nofollow noopener" target="_blank"><img border="0" data-original-height="300" data-original-width="300" src="https://imgdb.net/images/3177.png"></a></div></li><li>Run the BugTroid Pro app. </li><li>click Icon android (Android pentest).</li><li>scroll down and select -&gt; Scripting -&gt; select Perl4android, click install then wait for the process to complete.<div class="separator" style="clear: both; text-align: center;"><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9pbWdkYi5uZXQvaW1hZ2VzLzMxNzYuanBn" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="nofollow noopener" target="_blank"><img border="0" data-original-height="256" data-original-width="256" src="https://imgdb.net/images/3176.jpg"></a></div></li><li>after Perl for Android is installed, run the application, then click Install and wait until the process is complete.</li><li>Install Root Explorer (rootex).</li><li>Run the Root Explorer ( rootex ) -&gt; Click Mount r / w, then go to: /data/data/com.googlecode.perlforandroid/files/perl/</li><li>Chmod 755 file named perl.</li><li>copy the file named perl to: / system / bin / or /system/xbin/. (Symlink Is recommended for this step -&gt; Read <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93ZWItbWFuYWplbWVuLmJsb2dzcG90LmNvbS9wL3NlYXJjaC5odG1sP3E9c3ltbGluaytmaWxlK2FuZHJvaWQ=" target="_blank" rel="nofollow noopener">How to Symlink file on android.</a>) then chmod 755.</li><li>If done -&gt; run the emulator terminal (Terminal Emulator).</li><li> Now just run the perl file through the android emulator terminal (Terminal Emulator) -&gt; type: <ul><li>su</li><li>perl /path/to/script.pl</li></ul></li></ol>Finish you have installed Perl on android.
