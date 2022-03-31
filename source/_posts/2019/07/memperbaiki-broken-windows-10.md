---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://1.bp.blogspot.com/-uIxGKxlwpuU/XTIpx8O5NDI/AAAAAAAAAbA/qVaaGh3genIYBE0rl0PDNTnt6RznLulJQCLcBGAs/s1600/2513807.jpg
date: 2019-07-20T04:30:00.000+07:00
lang: en
location: ""
modified: 2019-07-20T04:30:07.664+07:00
subtitle: Tutorial mengatasi windows 0 tanpa kehilangan data settings, aplikasi,
  file GPT MBR both supported Permasalahan /
tags:
  - Tips & Tricks
title: Memperbaiki Broken Windows 10 Installation
type: post
uuid: ba38e1a4-1f2c-4888-8289-3ccfcf4407ab
webtitle: WMI Gitlab
updated: 2019-07-20T04:30:07+07:00
thumbnail: https://1.bp.blogspot.com/-uIxGKxlwpuU/XTIpx8O5NDI/AAAAAAAAAbA/qVaaGh3genIYBE0rl0PDNTnt6RznLulJQCLcBGAs/s1600/2513807.jpg
photos:
  - https://1.bp.blogspot.com/-uIxGKxlwpuU/XTIpx8O5NDI/AAAAAAAAAbA/qVaaGh3genIYBE0rl0PDNTnt6RznLulJQCLcBGAs/s1600/2513807.jpg
description: Tutorial mengatasi windows 0 tanpa kehilangan data settings,
  aplikasi, file GPT MBR both supported Permasalahan /
excerpt: Tutorial mengatasi windows 0 tanpa kehilangan data settings, aplikasi,
  file GPT MBR both supported Permasalahan /
wordcount: 1456
---

<div dir="ltr" style="text-align: left;" trbidi="on">  <div>    Tutorial mengatasi windows 10 tanpa kehilangan data (settings, aplikasi, file) GPT MBR both supported   </div>  <div>    <br>  </div>  <b>Permasalahan / Kendala :</b>  <div>    <ol style="text-align: left;">      <li>Windows 10 tidak bisa booting setelah install dual boot dengan windows versi lama (vista, xp, 7, 8)</li>      <li>bootrec /fixboot : access denied</li>      <li>bcdedit rebuildbcd the requested system device cannot be found</li>      <li>windows 10 wont start code 0xc00000e</li>      <li>windows installation but drive letter is changed after update windows 10 or older windows</li>    </ol>    <div>      <b>Requirements :</b>    </div>  </div>  <div>    <ol style="text-align: left;">      <li>Free Disk Min 100GB (untuk jaga-jaga bila ada file dump di windows sebelumnya yang belum terinstall)</li>      <li>Bootable Windows 10 (usb/dvd)</li>      <li>Internet (untuk update feature, dll *optional)</li>    </ol>    <div>      <b>Tata cara:</b>    </div>  </div>  <div>    <ol style="text-align: left;">      <li>Matikan PC/Laptop, lalu masuk ke BIOS</li>      <li>Cari boot settings, <b>disable secure boot</b>, <b>enable legacy boot</b></li>      <li>Set <b>USB/Removable Disk atau DVD/CD</b>&nbsp;urutan paling atas pada boot list (pastikan setting <b>USB boot</b>&nbsp;enabled jika memakai Bootable USB namun jika tidak ada settingan USB Boot, abaikan saja).&nbsp;</li>      <div class="inline-img"><a href="https://1.bp.blogspot.com/-uIxGKxlwpuU/XTIpx8O5NDI/AAAAAAAAAbA/qVaaGh3genIYBE0rl0PDNTnt6RznLulJQCLcBGAs/s1600/2513807.jpg" imageanchor="1" rel="noopener noreferer nofollow"><img border="0" src="https://1.bp.blogspot.com/-uIxGKxlwpuU/XTIpx8O5NDI/AAAAAAAAAbA/qVaaGh3genIYBE0rl0PDNTnt6RznLulJQCLcBGAs/s1600/2513807.jpg" data-original-width="573" data-original-height="431" class="img"></a>      <li>Pada tampilan install windows, anda pilih <b>Repair This Computer</b>&nbsp;-&gt; advanced options -&gt; command shell (CMD)</li>      <a href="https://4.bp.blogspot.com/-u9vl66eZ9Xo/XTIqfNjziuI/AAAAAAAAAbI/4PoSYOvj354y2L3aPCkMw0Z7PcBIVGuQwCLcBGAs/s1600/repair-link.png" imageanchor="1" rel="noopener noreferer nofollow"><img class="img" border="0" src="https://4.bp.blogspot.com/-u9vl66eZ9Xo/XTIqfNjziuI/AAAAAAAAAbI/4PoSYOvj354y2L3aPCkMw0Z7PcBIVGuQwCLcBGAs/s1600/repair-link.png" data-original-width="1024" data-original-height="768"></a>      <a href="https://1.bp.blogspot.com/-ev36eYgiXnE/XTIsGfQIKxI/AAAAAAAAAbU/oGJzahVYyecyTNCwCJm0VZXDpjYsud0TACLcBGAs/s1600/aHR0cDovL3d3dy5sYXB0b3BtYWcuY29tL2ltYWdlcy93cC9wdXJjaC1hcGkvaW5jb250ZW50LzIwMTcvMDIvMTQ4NjE1MTEwNV80NzguNDE5NjU5NzM1MzU0MDMucG5n.png" imageanchor="1" rel="noopener noreferer nofollow"><img class="img" border="0" src="https://1.bp.blogspot.com/-ev36eYgiXnE/XTIsGfQIKxI/AAAAAAAAAbU/oGJzahVYyecyTNCwCJm0VZXDpjYsud0TACLcBGAs/s1600/aHR0cDovL3d3dy5sYXB0b3BtYWcuY29tL2ltYWdlcy93cC9wdXJjaC1hcGkvaW5jb250ZW50LzIwMTcvMDIvMTQ4NjE1MTEwNV80NzguNDE5NjU5NzM1MzU0MDMucG5n.png" data-original-width="478" data-original-height="403"></a>      <a href="https://2.bp.blogspot.com/-7xw1Ry_7fLE/XTItiRuAI5I/AAAAAAAAAbg/q5xnwwkrEloBB-Qvu6NuvUlQ0s0CKKwsgCLcBGAs/s1600/images.png" imageanchor="1" rel="noopener noreferer nofollow"><img border="0" src="https://2.bp.blogspot.com/-7xw1Ry_7fLE/XTItiRuAI5I/AAAAAAAAAbg/q5xnwwkrEloBB-Qvu6NuvUlQ0s0CKKwsgCLcBGAs/s1600/images.png" data-original-width="277" data-original-height="182"></a></div>      <ul>        <li>lalu masukkan perintah berikut :</li>        <pre>diskpart<br>lis vol</pre>        <li>Disini kita akan melihat disk volume berapa yang paling besar FREE UP space nya, <i>misal `<b>N</b>`</i></li>        <pre>sel vol n</pre>        <li>Memilih volume <b>N</b></li>        <pre>shrink desire=100000</pre>        <li>Shrink/membagi partisi 100000 MB (100 GB)</li>        <pre>list vol</pre>        <li>Melihat daftar volume, cari volume baru berukuran 100 GB yang belum terASSIGN ke Driver Letter <strike>(C, D, E, etc)</strike>, Misal ada pada <i>Volume <i>8</i></i></li>        <pre>sel vol 8<br>assign letter=U</pre>        <li>Memilih volume 8 dan memberikannya letter U, dimana U tidak sedang dipakai oleh volume disk lain</li><li></li><li>Reboot komputer, <b>tanpa mencabut USB/DVD bootable</b></li><li>Lalu pada tampilan, Instalasi windows klik <b>INSTALL</b>, nanti disuruh memilih di install pada driver tertentu, nah pilihlah DISK U:\ yang tadi sudah di set</li><li>Auto restart pertama, anda harus mencabut USB/DVD anda agar windows langsung masuk ke tahap instalasi lanjutan. <i>Jika tidak dicabut, maka anda akan dibawa ke repair setup yang tadi lagi.</i></li><li>Tunggu Hingga selesai secara sempurna.</li><hr><blockquote>Jika nanti disuruh memilih OS (jangan memilih OS lama anda dulu, agar semua requirement System terpenuhi dahulu dengan windows update)</blockquote><hr>      </ul>      <li>---Lanjut Cara Menghapus Dual boot Windows 10---</li>    </ol>  </div></div>