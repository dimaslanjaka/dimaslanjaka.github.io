---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2019-07-28T06:38:00.002+07:00
lang: en
location: ""
modified: 2019-07-28T06:38:50.642+07:00
subtitle: Instalasipkg update ypkg upgrade -ypkg install php curl wget git
  -yContoh Penggunaan PHP CLI pada termuxbuat file
tags:
  - PHP
title: Menggunakan PHP di termux
type: post
uuid: a4f02ff8-a09a-4888-8a03-b5e5921347e6
webtitle: WMI Gitlab
updated: 2019-07-28T06:38:50+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Instalasipkg update ypkg upgrade -ypkg install php curl wget git
  -yContoh Penggunaan PHP CLI pada termuxbuat file
excerpt: Instalasipkg update ypkg upgrade -ypkg install php curl wget git
  -yContoh Penggunaan PHP CLI pada termuxbuat file
wordcount: 97
---

<div dir="ltr" style="text-align: left;" trbidi="on"><b>Instalasi</b><br><br><pre>pkg update -y<br>pkg upgrade -y<br>pkg install php curl wget git -y<br></pre><b>Contoh Penggunaan PHP (CLI) pada termux</b><br><br><i>buat file php</i><pre><code><span class="html"><span class="default">&lt;?php<br><br>parse_str</span><span class="keyword">(</span><span class="default">implode</span><span class="keyword">(</span><span class="string">'&amp;'</span><span class="keyword">, </span><span class="default">array_slice</span><span class="keyword">(</span><span class="default">$argv</span><span class="keyword">, </span><span class="default">1</span><span class="keyword">)), </span><span class="default">$_GET</span><span class="keyword">);<br></span><span class="default">?&gt;</span></span></code><br></pre><i>Usage/penggunaan</i><pre><br>php -f namafile.php a=1 b[]=2 b[]=3<br><br>//output<br>//$_GET['a'] to '1' and $_GET['b'] to array('2', '3').<br></pre></div>