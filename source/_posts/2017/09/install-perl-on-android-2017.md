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
subtitle: Install perl on android 2017
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
description: Install perl on android 2017
excerpt: Install perl on android 2017
wordcount: 252
---

Tutorial Install Perl On Android:<br><div class="separator" style="clear: both; text-align: center;"><a href="https://imgdb.net/images/3178.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="321" data-original-width="458" height="224" src="https://imgdb.net/images/3178.png" width="320"></a></div><ol><li>Download BugTroid Pro Apk -&gt;&nbsp;<a alt="BugTroid Pro" href="https://www.dropbox.com/s/97g97bg14gyinaa/Bugtroid%20Pentesting%20PRO%20v5.0.1%5BBala%20Kurawa%5D%20.apk?dl=1" rel="noopener noreferer nofollow" title="BugTroid Pro">Download</a>&nbsp;<div class="separator" style="clear: both; text-align: center;"><a href="https://imgdb.net/images/3177.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="300" data-original-width="300" src="https://imgdb.net/images/3177.png"></a></div></li><li>Run the BugTroid Pro app.&nbsp;</li><li>click Icon android (Android pentest).</li><li>scroll down and select -&gt; Scripting -&gt; select Perl4android, click install then wait for the process to complete.<div class="separator" style="clear: both; text-align: center;"><a href="https://imgdb.net/images/3176.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="256" data-original-width="256" src="https://imgdb.net/images/3176.jpg"></a></div></li><li>after Perl for Android is installed, run the application, then click Install and wait until the process is complete.</li><li>Install Root Explorer (rootex).</li><li>Run the Root Explorer ( rootex ) -&gt; Click Mount r / w, then go to: /data/data/com.googlecode.perlforandroid/files/perl/</li><li>Chmod 755 file named perl.</li><li>copy the file named perl to: / system / bin / or /system/xbin/. (Symlink Is recommended for this step -&gt; Read&nbsp;<a href="https://web-manajemen.blogspot.com/p/search.html?q=symlink+file+android">How to Symlink file on android.</a>)&nbsp;then&nbsp;chmod 755.</li><li>If done -&gt; run the emulator terminal (Terminal Emulator).</li><li>&nbsp;Now just run the perl file through the android emulator terminal (Terminal Emulator) -&gt; type: <ul><li>su</li><li>perl /path/to/script.pl</li></ul></li></ol>Finish you have installed Perl on android.