---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://1.bp.blogspot.com/-X8tdy9N2l8w/UJT2gcqpvLI/AAAAAAAAWUk/VPPxUYEMDPs/s1600/Windows-Store-Disable.png
date: 2017-10-18T00:51:00.000+07:00
lang: en
location: ""
modified: 2017-10-18T00:51:17.164+07:00
subtitle: Windows Store adalah tempat yang tepat untuk menemukan dan menginstal
  aplikasi, namun dalam situasi tertentu Anda sebagai orang tua
tags:
  - Tips & Tricks
title: Mencegah Pengguna Menginstal Aplikasi UI Modern
type: post
uuid: 5fc580eb-27e8-4888-85f1-43738818e6e4
webtitle: WMI Gitlab
updated: 2017-10-18T00:51:17+07:00
thumbnail: https://1.bp.blogspot.com/-X8tdy9N2l8w/UJT2gcqpvLI/AAAAAAAAWUk/VPPxUYEMDPs/s1600/Windows-Store-Disable.png
photos:
  - https://1.bp.blogspot.com/-X8tdy9N2l8w/UJT2gcqpvLI/AAAAAAAAWUk/VPPxUYEMDPs/s1600/Windows-Store-Disable.png
description: Windows Store adalah tempat yang tepat untuk menemukan dan
  menginstal aplikasi, namun dalam situasi tertentu Anda sebagai orang tua
excerpt: Windows Store adalah tempat yang tepat untuk menemukan dan menginstal
  aplikasi, namun dalam situasi tertentu Anda sebagai orang tua
wordcount: 312
---

Windows Store adalah tempat yang tepat untuk menemukan dan menginstal     aplikasi, namun dalam situasi tertentu Anda sebagai orang tua atau     administrator mungkin ingin membatasi unduhan dan pemasangan aplikasi baru. <br>Microsoft telah menambahkan opsi untuk mematikan Store di Group Policy     Editor, dengan kebijakan ini diaktifkan, semua pengguna tidak diberi akses     ke Store, yang pada gilirannya akan menghentikan mereka untuk memasang     aplikasi baru tanpa otorisasi Anda. Inilah cara Anda mengaktifkan kebijakan     ini. <br><h3>    Batasi akses ke Windows Store dengan Group Policy Editor </h3>Buka dialog Run dan ketik gpedit.msc untuk membuka Local Group Policy     Editor.     <br>    Di Group Policy Editor, navigasikan ke Computer Configuration&gt;     Administrative Templates&gt; Windows Components&gt; Store.     <br>    <img alt="Windows Store Disable" height="356" src="https://1.bp.blogspot.com/-X8tdy9N2l8w/UJT2gcqpvLI/AAAAAAAAWUk/VPPxUYEMDPs/s1600/Windows-Store-Disable.png" title="Windows Store Nonaktifkan" width="678">    <br>    Dalam daftar Setting pane kanan, temukan dan klik dua kali pada opsi     "Matikan Store Store". <br><center>    <ins id="aswift_0_expand"><ins id="aswift_0_anchor"></ins></ins></center>Setel setting ke Enabled, lalu klik OK untuk menyimpan dan menutup jendela     konfigurasi. <br>Sekarang ketika ada yang mencoba membuka aplikasi Store, mereka akan     mendapatkan pesan ini: <br><blockquote>Windows Store tidak tersedia di PC ini. Hubungi administrator sistem         Anda untuk informasi lebih lanjut.     </blockquote><img alt="Windows Store Not\ Available" height="300" src="https://1.bp.blogspot.com/-TdfK-WoptWU/UJT2hM5FiJI/AAAAAAAAWUs/uzyyrrmyXBw/s1600/Windows-Store-Not-Available.png" title="Toko Windows Tidak \ Tersedia" width="677"><br>Perhatikan bahwa ini tidak mencegah pengguna membuka aplikasi yang sudah     terpasang, jadi mereka tetap dapat menggunakan aplikasi yang telah Anda     izinkan. <br>Untuk mengaktifkan kembali Store, cukup ubah kembali pengaturan menjadi     "Disable" atau "Not Configured". <br><h3>    Batasi akses ke Windows Store dengan Windows Registy Editor </h3>Jika Anda menggunakan edisi dasar Windows 8, Anda tidak akan memiliki akses     ke Group Policy Editor. Sebagai gantinya Anda harus menggunakan Windows     Registry untuk mengaktifkan pengaturan ini pada PC Anda. Untuk     melakukannya, buka Registry Editor dan arahkan ke HKEY_CURRENT_USER \     Software \ Policies \ Microsoft \ WindowsStore. Di bawah kunci ini, buat     nilai DWORD baru yang disebut <code>RemoveWindowsStore</code> dan tetapkan     nilainya ke <code>1</code> . Untuk mengaktifkan kembali, cukup hapus     nilainya atau setel <code>0</code> .