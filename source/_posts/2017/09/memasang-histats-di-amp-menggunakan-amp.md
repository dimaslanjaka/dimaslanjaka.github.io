---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - HTML
comments: true
cover: https://2.bp.blogspot.com/-jSLiOZsuahQ/WaRcT-NMI4I/AAAAAAAAACI/vjuid9-u-hE4pT43zsx0XxoytpjWj5HdACLcBGAs/s320/histats-2.jpg
date: 2017-09-14T01:20:00.000+07:00
lang: en
location: ""
modified: 2017-09-14T01:20:01.785+07:00
subtitle: Komponen amppixel berperilaku seperti img img gambar sederhana.
  Dibutuhkan satu URL saja, namun memberikan variabel yang bisa digantikan
tags:
  - HTML
  - AMP
title: Memasang Histats Di AMP Menggunakan amp-pixel
type: post
uuid: ba11674a-9d5b-4888-8e3a-e14f223a43a2
webtitle: WMI Gitlab
updated: 2017-09-14T01:20:01+07:00
thumbnail: https://2.bp.blogspot.com/-jSLiOZsuahQ/WaRcT-NMI4I/AAAAAAAAACI/vjuid9-u-hE4pT43zsx0XxoytpjWj5HdACLcBGAs/s320/histats-2.jpg
photos:
  - https://2.bp.blogspot.com/-jSLiOZsuahQ/WaRcT-NMI4I/AAAAAAAAACI/vjuid9-u-hE4pT43zsx0XxoytpjWj5HdACLcBGAs/s320/histats-2.jpg
description: Komponen amppixel berperilaku seperti img img gambar sederhana.
  Dibutuhkan satu URL saja, namun memberikan variabel yang bisa digantikan
excerpt: Komponen amppixel berperilaku seperti img img gambar sederhana.
  Dibutuhkan satu URL saja, namun memberikan variabel yang bisa digantikan
wordcount: 458
---

Komponen amp-pixel berperilaku seperti img img gambar sederhana. Dibutuhkan satu URL saja, namun memberikan variabel yang bisa digantikan oleh komponen dalam string URL saat melakukan request. Lihat bagian <a href="https://www-ampproject-org.cdn.ampproject.org/v/s/www.ampproject.org/docs/reference/components/amp-pixel?amp_js_v=0.1&amp;usqp=mq331AQCCAE%3D#substitutions" rel="noopener noreferer nofollow" target="_blank">substitusi (ampproject-org)</a> untuk rincian lebih lanjut. <br>Dalam contoh dasar ini, pesan ampli memberi sedikit permintaan GET sederhana ke URL yang diberikan dan mengabaikan hasilnya. <br><pre>&lt;amp-pixel src="https://foo.com/tracker/foo" layout = "nodisplay"&gt;&lt;/amp-pixel&gt;</pre><br>Nah kali ini saya akan share <b>bagaimana cara Memasang Histats Di AMP Menggunakan amp-pixel</b>. Ikuti langkah-langkah nya dibawah ini:<br><ol><li>Masuk Ke http://histats.com, login atau register (-Baca-&gt; <a alt="Register Histats" href="https://web-manajemen.blogspot.co.uk/p/search.html?q=register+Histats" rel="follow" title="How to register histats">Bagaimana Cara Daftar Histats</a>) </li><li>Pilih <b>akun website histat</b> anda atau buat <b>Akun Website Baru</b></li><li>Buat Counter Code (HIDDEN TRACKER).</li><li>Pilih <b>No JavaScript</b> di bagian code section</li><li>ambil source img nya -&gt; &lt;img src="disini" /&gt;</li><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="https://2.bp.blogspot.com/-jSLiOZsuahQ/WaRcT-NMI4I/AAAAAAAAACI/vjuid9-u-hE4pT43zsx0XxoytpjWj5HdACLcBGAs/s1600/histats-2.jpg" imageanchor="1" style="margin-left: auto; margin-right: auto;" rel="noopener noreferer nofollow"><img alt="Amp-pixel" border="0" data-original-height="358" data-original-width="750" height="152" src="https://2.bp.blogspot.com/-jSLiOZsuahQ/WaRcT-NMI4I/AAAAAAAAACI/vjuid9-u-hE4pT43zsx0XxoytpjWj5HdACLcBGAs/s320/histats-2.jpg" title="Histats" width="320"></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Histats Amp-Pixel</td></tr></tbody></table><li>Kemudian silahkan pasang kode berikut di atas&nbsp;<code>&lt;/body&gt;</code>&nbsp;atau&nbsp;<code>&amp;lt;!--&lt;/body&gt;--&amp;gt; &amp;lt;/body&amp;gt;</code><br><pre>&lt;amp-pixel src="<b>URL_SOURCE_IMG_HIDDEN_TRACKER_KAMU</b>" layout="nodisplay"&gt;&lt;/amp-pixel&gt;<br></pre><br><b>Keterangan:</b><br><ul><li>URL_SOURCE_IMG_HIDDEN_TRACKER_KAMU = ganti dengan source image hidden tracker Histats kamu (cek screenshot diatas)</li><li>Pada Url source kamu bila ada simbol (<b>&amp;</b>) maka tambah disetelah simbol tersebut "amp;", maka akan menjadi <b>&amp;amp;</b>.</li><br>Cek contoh dibawah ini:<br>Before: <pre>//sstatic1.histats.com/0.gif?123456<b><u>&amp;</u></b>789</pre>After: <pre><code><u><b>https:</b></u>//sstatic1.histats.com/0.gif?123456<b><u>&amp;amp;</u></b>789</code></pre></ul></li></ol>Selesai. Demikian artikel tentang bagaimana memasang Histats di amp menggunakan amp-pixel. Semoga bermanfaat. <br><ul>Incoming Terms:<br><li>Histats Amp</li><li>Histats amp-pixel</li><li>Histats hidden</li><li>Hidden histats with amp-pixel</li><li>amp-pixel plus histats</li></ul>