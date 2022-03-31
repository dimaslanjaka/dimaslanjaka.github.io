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

<p>Komponen amp-pixel berperilaku seperti img img gambar sederhana. Dibutuhkan satu URL saja, namun memberikan variabel yang bisa digantikan oleh komponen dalam string URL saat melakukan request. Lihat bagian <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3ctYW1wcHJvamVjdC1vcmcuY2RuLmFtcHByb2plY3Qub3JnL3Yvcy93d3cuYW1wcHJvamVjdC5vcmcvZG9jcy9yZWZlcmVuY2UvY29tcG9uZW50cy9hbXAtcGl4ZWw/YW1wX2pzX3Y9MC4xJnVzcXA9bXEzMzFBUUNDQUUlM0Qjc3Vic3RpdHV0aW9ucw==" rel="nofollow noopener" target="_blank">substitusi (ampproject-org)</a> untuk rincian lebih lanjut. <br>Dalam contoh dasar ini, pesan ampli memberi sedikit permintaan GET sederhana ke URL yang diberikan dan mengabaikan hasilnya. <br><pre>&lt;amp-pixel src=“<a href="https://foo.com/tracker/foo">https://foo.com/tracker/foo</a>” layout = “nodisplay”&gt;&lt;/amp-pixel&gt;</pre><br>Nah kali ini saya akan share <b>bagaimana cara Memasang Histats Di AMP Menggunakan amp-pixel</b>. Ikuti langkah-langkah nya dibawah ini:<br><ol><li>Masuk Ke <a href="//webmanajemen.com/page/safelink.html?url=aHR0cDovL2hpc3RhdHMuY29t" target="_blank" rel="nofollow noopener">http://histats.com</a>, login atau register (-Baca-&gt; <a alt="Register Histats" href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93ZWItbWFuYWplbWVuLmJsb2dzcG90LmNvLnVrL3Avc2VhcmNoLmh0bWw/cT1yZWdpc3RlcitIaXN0YXRz" rel="nofollow noopener" title="How to register histats" target="_blank">Bagaimana Cara Daftar Histats</a>) </li><li>Pilih <b>akun website histat</b> anda atau buat <b>Akun Website Baru</b></li><li>Buat Counter Code (HIDDEN TRACKER).</li><li>Pilih <b>No JavaScript</b> di bagian code section</li><li>ambil source img nya -&gt; &lt;img src=“disini” /&gt;</li><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly8yLmJwLmJsb2dzcG90LmNvbS8talNMaU9ac3VhaFEvV2FSY1QtTk1JNEkvQUFBQUFBQUFBQ0kvdmp1aWQ5LXUtaEU0cFQ0M3pzeDBYeG95dHBqV2o1SGRBQ0xjQkdBcy9zMTYwMC9oaXN0YXRzLTIuanBn" imageanchor="1" style="margin-left: auto; margin-right: auto;" rel="nofollow noopener" target="_blank"><img alt="Amp-pixel" border="0" data-original-height="358" data-original-width="750" height="152" src="https://2.bp.blogspot.com/-jSLiOZsuahQ/WaRcT-NMI4I/AAAAAAAAACI/vjuid9-u-hE4pT43zsx0XxoytpjWj5HdACLcBGAs/s320/histats-2.jpg" title="Histats" width="320"></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Histats Amp-Pixel</td></tr></tbody></table><li>Kemudian silahkan pasang kode berikut di atas <code>&lt;/body&gt;</code> atau <code>&amp;lt;!–&lt;/body&gt;–&amp;gt; &amp;lt;/body&amp;gt;</code><br><pre>&lt;amp-pixel src=“<b>URL_SOURCE_IMG_HIDDEN_TRACKER_KAMU</b>” layout=“nodisplay”&gt;&lt;/amp-pixel&gt;<br></pre><br><b>Keterangan:</b><br><ul><li>URL_SOURCE_IMG_HIDDEN_TRACKER_KAMU = ganti dengan source image hidden tracker Histats kamu (cek screenshot diatas)</li><li>Pada Url source kamu bila ada simbol (<b>&amp;</b>) maka tambah disetelah simbol tersebut “amp;”, maka akan menjadi <b>&amp;amp;</b>.</li><br>Cek contoh dibawah ini:<br>Before: <pre><a href="//sstatic1.histats.com/0.gif?123456">//sstatic1.histats.com/0.gif?123456</a><b><u>&amp;</u></b>789</pre>After: <pre><code><u><b>https:</b></u><a href="//sstatic1.histats.com/0.gif?123456">//sstatic1.histats.com/0.gif?123456</a><b><u>&amp;amp;</u></b>789</code></pre></ul></li></ol>Selesai. Demikian artikel tentang bagaimana memasang Histats di amp menggunakan amp-pixel. Semoga bermanfaat. <br><ul>Incoming Terms:<br><li>Histats Amp</li><li>Histats amp-pixel</li><li>Histats hidden</li><li>Hidden histats with amp-pixel</li><li>amp-pixel plus histats</li></ul></p>
