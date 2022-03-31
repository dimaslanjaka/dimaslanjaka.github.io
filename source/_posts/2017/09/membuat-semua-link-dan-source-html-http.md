---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://www.bluecorona.com/wp-content/uploads/2017/02/https-cover-photo.png
date: 2017-09-11T22:49:00.002+07:00
lang: en
location: ""
modified: 2020-02-06T23:45:23.750+07:00
subtitle: Yo guys, kali ini akan saya share bagaimana cara mengubah semua source
  link atau iframe yang tidak menggunakan https.br />Mula mula anda
tags:
  - JS
  - SEO
  - Tips & Tricks
title: Membuat semua link dan source html http menjadi https
type: post
uuid: 4b6e1b22-9d3d-4888-818d-3b3c867fd46c
webtitle: WMI Gitlab
updated: 2020-02-06T23:45:23+07:00
thumbnail: https://www.bluecorona.com/wp-content/uploads/2017/02/https-cover-photo.png
photos:
  - https://www.bluecorona.com/wp-content/uploads/2017/02/https-cover-photo.png
description: Yo guys, kali ini akan saya share bagaimana cara mengubah semua
  source link atau iframe yang tidak menggunakan https.br />Mula mula anda
excerpt: Yo guys, kali ini akan saya share bagaimana cara mengubah semua source
  link atau iframe yang tidak menggunakan https.br />Mula mula anda
wordcount: 451
---

<p>Yo guys, kali ini akan saya share bagaimana cara mengubah semua source link atau iframe yang tidak menggunakan https.<br>Mula mula anda harus mengetahui APAKAH HTTPS BAGUS UNTUK SEO? <br><img height="167" src="https://www.bluecorona.com/wp-content/uploads/2017/02/https-cover-photo.png" width="320"><br>Jika Anda telah melakukan beberapa pencarian online (mencoret pesaing Anda,     mungkin? Mencari perusahaan untuk merombak dapur Anda?), Anda mungkin     pernah memperhatikan situs HTTP dan HTTPS. Apa perbedaan antara keduanya,     dan apakah itu penting dalam hal pemasaran online? <br>Senang kamu tanya Kami baru saja menulis posting blog tentang     <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly90cmFuc2xhdGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3RyYW5zbGF0ZV9jP2RlcHRoPTMmbnY9MSZydXJsPXRyYW5zbGF0ZS5nb29nbGUuY29tJnNsPWVuJnNwPW5tdDQmdGw9aWQmdT1odHRwczovL3d3dy5ibHVlY29yb25hLmNvbS9ibG9nL3JlYXNvbnMtdG8taGF2ZS1odHRwcy13ZWJzaXRlJnVzZz1BTGtKcmhocUZJbHp0VzdFMHN4b3ZEZExyNWE3ZUx2T1Jn" rel="nofollow noopener" target="_blank">        alasan situs Anda harus HTTPS     </a>    , tapi posting ini masuk ke rincian lebih lanjut, terutama yang berkaitan     dengan dampak keamanan situs terhadap SEO. <br><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly90cmFuc2xhdGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3RyYW5zbGF0ZV9jP2RlcHRoPTMmbnY9MSZydXJsPXRyYW5zbGF0ZS5nb29nbGUuY29tJnNsPWVuJnNwPW5tdDQmdGw9aWQmdT1odHRwczovL3d3dy5ibHVlY29yb25hLmNvbS9ibG9nL2h0dHBzLXNlby1kb3dubG9hZC8mdXNnPUFMa0pyaGl4UFc0UUtYZG91Rk5CN3pGTjJQT2VfYjludkE=" rel="nofollow noopener" target="_blank">        <img alt="" height="100" src="https://www.bluecorona.com/wp-content/uploads/2017/08/blog-graphic-https.png" width="320">    </a><br><h2>    Apa itu HTTPS? </h2>Mari kita mulai dengan dasar-dasarnya. “S” di bagian akhir “http” dari     sebuah URL berarti situs web tersebut aman. HTTPS (Hypertext Transport     Protocol Security), atau situs yang aman mencakup kunci SSL 2048-bit dan     dapat melindungi koneksi situs melalui otentikasi dan enkripsi. Saat     diinstal di server web, sertifikat SSL mengaktifkan gembok dan protokol     https dan memungkinkan koneksi aman dari server web ke browser. <br>Situs web aman dapat melindungi koneksi pengguna dengan mengamankan     informasi dalam tiga lapisan: <br><ul><li>        Enkripsi memastikan bahwa aktivitas pengguna tidak dapat dilacak atau         informasi mereka dicuri     </li><li>        Integritas data mencegah file rusak saat dipindahkan     </li><li>        Dan otentikasi melindungi terhadap serangan dan membangun kepercayaan         pengguna     </li></ul>Tapi bagaimana, tepatnya, apakah sertifikat SSL mempengaruhi peringkat     mesin pencari dan banyak lagi? <br><h2>    Apa Keseluruhan Dampak SEO HTTPS? </h2>Berikut adalah visual untuk beberapa fakta cepat tentang situs yang aman,     namun teruslah membaca untuk lebih jelasnya! <br><img alt="HTTPS Infografis" height="208" src="https://www.bluecorona.com/wp-content/uploads/2017/02/https-infographic-use.jpg" width="400"><br>Lebih dari sekadar konten di tempat dapat memberi dampak positif pada     peringkat, lalu lintas, dan, berpotensi, konversi Anda.Salah satu faktor     ini adalah keamanan situs web. <br>Nah berikut kode untuk membuat semua link dan source html dari http menjadi https menggunakan jquery<br><b>Mengubah semua iframe source http menjadi https</b>:<br><pre>$(“iframe”).each(function() {<br>    $(this).attr(“src”, $(this).attr(“src”).replace(“http://”, “https://”));<br>});</pre><b>mengubah semua link url href http menjadi https</b>: <br><pre>$(“a”).each(function() {<br>    $(this).attr(“src”, $(this).attr(“src”).replace(“http://”, “https://”));<br>});</pre><b>mengubah semua img source (src) http menjadi https</b>: <br><pre>$(“img”).each(function() {<br>    $(this).attr(“src”, $(this).attr(“src”).replace(“http://”, “https://”));<br>});</pre><hr><blockquote>Rekomendasi Update: <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93ZWItbWFuYWplbWVuLmJsb2dzcG90LmNvbS9zZWFyY2g/cT1tZW5ndWJhaCtpbWcrc3JjK2tlK2h0dHBzK3RlcmJhcnU=" title="Update cara mengubah image src menjadi https" target="_blank" rel="nofollow noopener">Cara Mengubah Image Src Menjadi Https</a></blockquote><hr>Demikian tutorial cara mengubah semua link dan source html http menjadi https.</p>
