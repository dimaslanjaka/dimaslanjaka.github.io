---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://4.bp.blogspot.com/-w5jNzr6G-40/UMwiN9YrkUI/AAAAAAAAWtA/rYrCZ839NCU/s1600/Uninstall-Modern-UI-Apps.png
date: 2017-10-17T00:47:00.000+07:00
lang: en
location: ""
modified: 2017-10-17T00:47:03.001+07:00
subtitle: Ada pengaturan lain di GPE yang mencegah pencopotan pemasangan
  aplikasi yang terpasang. Inilah cara mengaktifkannya .. br /><img
tags:
  - Tips & Tricks
title: Mencegah Pengguna Menghapus Aplikasi UI Modern di Windows 8
type: post
uuid: 34353b6e-da96-4888-8a69-a3c34c41a53e
webtitle: WMI Gitlab
updated: 2017-10-17T00:47:03+07:00
thumbnail: https://4.bp.blogspot.com/-w5jNzr6G-40/UMwiN9YrkUI/AAAAAAAAWtA/rYrCZ839NCU/s1600/Uninstall-Modern-UI-Apps.png
photos:
  - https://4.bp.blogspot.com/-w5jNzr6G-40/UMwiN9YrkUI/AAAAAAAAWtA/rYrCZ839NCU/s1600/Uninstall-Modern-UI-Apps.png
description: Ada pengaturan lain di GPE yang mencegah pencopotan pemasangan
  aplikasi yang terpasang. Inilah cara mengaktifkannya .. br /><img
excerpt: Ada pengaturan lain di GPE yang mencegah pencopotan pemasangan aplikasi
  yang terpasang. Inilah cara mengaktifkannya .. br /><img
wordcount: 237
---

Ada pengaturan lain di GPE yang mencegah pencopotan pemasangan aplikasi     yang terpasang. Inilah cara mengaktifkannya .. <br><img alt="Uninstall Modern UI Apps" height="249" src="https://4.bp.blogspot.com/-w5jNzr6G-40/UMwiN9YrkUI/AAAAAAAAWtA/rYrCZ839NCU/s1600/Uninstall-Modern-UI-Apps.png" title="Copot pemasangan UI Modern Apps" width="700"><br><h3>    Mencegah Pencabutan Aplikasi UI Modern </h3><ol><li>        Mulai Group Policy Editor dengan mengetikkan <code>gpedit.msc</code> di         kotak Run, dan tekan Enter.     </li><li>        Navigasikan ke User Configuration&gt; Administrative Templates&gt;         Start Menu dan Taskbar.     </li><li>        Dalam daftar kebijakan di sisi kanan cari setting yang disebut "Cegah         pengguna menguninstall aplikasi dari Start", klik dua kali di dalamnya.     </li><li>        Dalam dialog properties, pilih tombol radio berlabel "Enabled", lalu         klik tombol OK.     </li></ol>Itu dia. Sekarang ketika Anda klik kanan pada ubin layar Start, opsi     uninstall tidak akan muncul lagi. <br><center>    <ins id="aswift_0_expand"><ins id="aswift_0_anchor"></ins></ins></center>Jika Anda tidak dapat segera melihat perubahannya, jalankan perintah     berikut di command prompt: <br><pre>  gpupdate / force </pre>