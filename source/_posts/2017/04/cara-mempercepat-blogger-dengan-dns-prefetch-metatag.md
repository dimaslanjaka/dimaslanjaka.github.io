---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - HTML
comments: true
cover: https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR0Jbr1UikPXCMcKYhYI8In9l8ajc_-DJiJInkoPOmc0t4Vi3zz
date: 2017-04-30T01:34:00.002+07:00
lang: en
location: ""
modified: 2017-04-30T01:38:00.433+07:00
subtitle: b>Bagaimana Cara mempercepat loading blogger AMP maupun NON
  AMP.</b><br /><b>Langkah awal mempercepat loading <b>AMP Blogger</b> maupun
tags:
  - Blogger
  - HTML
  - AMP
title: Cara Mempercepat Blogger Dengan dns-prefetch metatag
type: post
uuid: 5289e74a-6ef9-4888-8f2e-f29add41b8b5
webtitle: WMI Gitlab
updated: 2017-04-30T01:38:00+07:00
thumbnail: https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR0Jbr1UikPXCMcKYhYI8In9l8ajc_-DJiJInkoPOmc0t4Vi3zz
photos:
  - https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR0Jbr1UikPXCMcKYhYI8In9l8ajc_-DJiJInkoPOmc0t4Vi3zz
description: b>Bagaimana Cara mempercepat loading blogger AMP maupun NON
  AMP.</b><br /><b>Langkah awal mempercepat loading <b>AMP Blogger</b> maupun
excerpt: b>Bagaimana Cara mempercepat loading blogger AMP maupun NON AMP.</b><br
  /><b>Langkah awal mempercepat loading <b>AMP Blogger</b> maupun
wordcount: 345
---

<b>Bagaimana Cara mempercepat loading blogger AMP maupun NON AMP.</b><br><b>Langkah awal mempercepat loading <b>AMP Blogger</b> maupun Blogger dengan template biasa (mengandung javascript).</b><br><img height="221" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR0Jbr1UikPXCMcKYhYI8In9l8ajc_-DJiJInkoPOmc0t4Vi3zz" width="400"><br>Link <i>dns-prefetch</i> metatag merupakan metatags untuk mempercepat loading external source. Dengan kata lain <i>defer loading external sources</i>. <br><br>Kali ini saya akan share bagaimana cara mempercepat lagi loading <i>AMP Blogger</i> yang biasanya mengandung banyak <i>&lt;amp-iframe&gt;</i>.<br><br>Ga pake lama, cekidot tutorialnya:<br><br>1. Buka dashboard <i class="fa fa-blogger"></i> <b>Blogger</b>.<br>2. Klik tab <i>Layout</i> --&gt; klik <b>Edit HTML</b>.<br>Kemudian, taruh kode dibawah ini dibawah <mark>&lt;head&gt;</mark> atau diatas <mark>&lt;/head&gt;</mark>.<br><br><pre>&lt;link rel="dns-prefetch" href="https://cdn.ampproject.org"/&gt;</pre><br>Bila anda juga menggunakan fonts dari google cdn maka juga tambahkan: <br><br><pre>&lt;link rel="dns-prefetch" href="https://fonts.googleapis.com"/&gt;</pre><br>Dan bila anda juga menggunakan <b>Fontawesome.css</b> dari <i>https://netdna.bootstrapcdn.com/font-awesome/[VERSION]/css/font-awesome.css.</i><br>Maka juga tambahakan kode dibawah ini:<br><br><pre>&lt;link rel="dns-prefetch" href="https://netdna.boostrapcdn.com"/&gt;</pre><br>Bila digabungkan akan seperti ini:<br><br><pre>&lt;link rel="dns-prefetch" href="https://cdn.ampproject.org"/&gt;<br>&lt;link rel="dns-prefetch" href="https://fonts.googleapis.com"/&gt;<br>&lt;link rel="dns-prefetch" href="https://netdna.boostrapcdn.com"/&gt;</pre><br>Untuk <b>HTML5</b> Markup seperti ini:<br><br><pre>&lt;link href="https://cdn.ampproject.org"&nbsp;rel="dns-prefetch"/&gt;</pre><pre>&lt;link href="https://fonts.googleapis.com"&nbsp;rel="dns-prefetch"/&gt;</pre><pre>&lt;link href="https://netdna.boostrapcdn.com"&nbsp;rel="dns-prefetch"/&gt;</pre><br><b>Bedanya</b> HTML biasa dengan HTML5 cuma <mark>href</mark> yang di dahulukan.<br><br><h3>Untuk kalian yang menggunakan template biasa</h3>kalian juga bisa menerapkan teknik diatas cuman ganti saja <mark>href</mark> source nya dengan source external anda. <b>Malah lebih joss bila kalian juga menerapkan defer load javascript</b>. Baca disini: <a href="https://web-manajemen.blogspot.com/search?q=defer+javascript">Bagaimana cara defer javascript</a>.<br><br>Selesai. Semoga tulisan saya ini membantu kalian. :) . Jangan lupa share yah...<br><br><b>Incoming Terms:</b> <i>Mempercepat loading blog dengan dns-prefetch | prefetching external script dan css | Mempercepat loading AMP Blogger | Mempercepat loading blog tahap awal | &lt;link rel="dns-prefetch" | Bagaimana cara mempercepat loading blog dengan link metatag | Bagaimana cara mempercepat loading blogger AMP maupun NON AMP.</i>