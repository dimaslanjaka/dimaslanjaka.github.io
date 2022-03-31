---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://imgdb.net/images/3179.png
date: 2017-09-03T15:36:00.003+07:00
lang: en
location: ""
modified: 2017-09-03T15:36:41.894+07:00
subtitle: Tutorial Cara symlink file di android
tags:
  - Android
  - Tips & Tricks
title: Tutorial Cara symlink file di android
type: post
uuid: 536882f0-d4c4-4888-8905-de103bc1475e
webtitle: WMI Gitlab
updated: 2017-09-03T15:36:41+07:00
thumbnail: https://imgdb.net/images/3179.png
photos:
  - https://imgdb.net/images/3179.png
description: Tutorial Cara symlink file di android
excerpt: Tutorial Cara symlink file di android
wordcount: 442
---

SYMLINK file di android tutorial.<br><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="https://imgdb.net/images/3179.png" imageanchor="1" style="margin-left: auto; margin-right: auto;" rel="noopener noreferer nofollow"><img alt="Symlink" border="0" data-original-height="166" data-original-width="371" height="143" src="https://imgdb.net/images/3179.png" title="Symlink" width="320"></a></td></tr><tr><td class="tr-caption" style="text-align: center;">bagaimana cara symlink/symbolic links folder atau file di android.</td></tr></tbody></table>Jika Perangkat Android Anda sudah root dan memasang terminal, Anda harus bisa memasukkan yang berikut ini: <br><pre>ln -sf /source/path/from/file /target/path/to/file<br><br>Contoh :<br> — Symlink Folder to Folder (folder baru, tidak bisa overwrite folder yang sudah ada)<br> ln -sf /sd-ext/media/audio /system/media/audio<br><br> — Symlink file to file<br><br> ln -sf /sdcard/folder/file /system/folder/file</pre><blockquote style="color: red; text-color: red;">Tidak bisa symlink dari system atau data ke sdcard. (Kecual menggunakan directory binder -Baca-&gt; <a href="http://web-manajemen.blogspot.com/p/search.html?q=directory+binder" style="color: blue; text-color: blue;">Tutorial Bind/symlink directory data to sdcard using binder</a>)</blockquote><br><h3>Symlink Folder/File Di android Menggunakan Root Explorer (Rootex)</h3><br><ol><li>Download Root Explorer -&gt;</li><li>Install dan buka root explorer</li><li>Buka folder dimana file atau folder yang akan di symlink</li><li>Klik tahan file atau folder target -&gt; klik menu disebelah icon icon diatasnya.</li><li>Nanti akan muncul box menu -&gt; pilih yang bawah sendiri "link to this file" -Cek Contoh Screenshot-&gt;&nbsp;<div class="separator" style="clear: both; text-align: center;"><a href="https://4.bp.blogspot.com/-qL_df_2RacQ/WKoeooYyN3I/AAAAAAAAFAU/mi7d1QL1JyAMaYaAgZxWUXIf0LmPI8HTgCLcB/s1600/Screenshot_2017-02-09-07-23-51-picsay.png?utm=web-manajemen.blogspot.com" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="960" data-original-width="540" height="320" src="https://4.bp.blogspot.com/-qL_df_2RacQ/WKoeooYyN3I/AAAAAAAAFAU/mi7d1QL1JyAMaYaAgZxWUXIf0LmPI8HTgCLcB/s320/Screenshot_2017-02-09-07-23-51-picsay.png?utm=web-manajemen.blogspot.com" width="180"></a></div></li><li>Setelah di "link to this file" -&gt; Buka folder dimana folder tersebut akan dijadikan tempat symlink file/folder kita (misal: /system/bin atau /system/xbin) -&gt; klik icon symlink di pojok kiri bawah (diatas icon X) -Cek Screenshot -&gt;&nbsp;<div class="separator" style="clear: both; text-align: center;"><a href="https://3.bp.blogspot.com/-TkMyPvubUss/WKofgR_YJZI/AAAAAAAAFAc/jnmWoy_Lv149VobN4CVyKrmbGKdKVCeCgCLcB/s1600/Screenshot_2017-02-09-07-24-10-picsay.png?utm=web-manajemen.blogspot.com" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="960" data-original-width="540" height="320" src="https://3.bp.blogspot.com/-TkMyPvubUss/WKofgR_YJZI/AAAAAAAAFAc/jnmWoy_Lv149VobN4CVyKrmbGKdKVCeCgCLcB/s320/Screenshot_2017-02-09-07-24-10-picsay.png?utm=web-manajemen.blogspot.com" width="180"></a></div></li><li>Selesai. Symlink berhasil</li></ol>Sekian artikel tutorial saya tentang bagaimana cara symlink/symbolic links folder atau file di android.