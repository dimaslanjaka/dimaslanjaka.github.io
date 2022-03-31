---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - HTML
comments: true
cover: https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRwHYn1q6qKyIO1WJAsg-ZtU3RJIlFDpbwnD9gZRG_NE29f4lDc
date: 2017-09-11T18:43:00.000+07:00
lang: en
location: ""
modified: 2017-09-11T18:43:44.280+07:00
subtitle: Cara mempercepat loading webfonts
tags:
  - HTML
  - Miscellaneous
  - Tips & Tricks
title: Cara mempercepat loading webfonts
type: post
uuid: 15e86d8b-7e46-4888-88bf-cf5ce7f1c0d3
webtitle: WMI Gitlab
updated: 2017-09-11T18:43:44+07:00
thumbnail: https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRwHYn1q6qKyIO1WJAsg-ZtU3RJIlFDpbwnD9gZRG_NE29f4lDc
photos:
  - https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRwHYn1q6qKyIO1WJAsg-ZtU3RJIlFDpbwnD9gZRG_NE29f4lDc
description: Cara mempercepat loading webfonts
excerpt: Cara mempercepat loading webfonts
wordcount: 79
---

<h3>Cara mempercepat loading fonts blog (webfonts).</h3><div class="separator" style="clear: both; text-align: center;"><a href="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRwHYn1q6qKyIO1WJAsg-ZtU3RJIlFDpbwnD9gZRG_NE29f4lDc" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRwHYn1q6qKyIO1WJAsg-ZtU3RJIlFDpbwnD9gZRG_NE29f4lDc"></a></div>Sekian banyak kode yang saya implementasikan namun belum ada yang mempercepat loading font. Nah berikut tutorialnya:<br><br><b>Metode 1.</b><br><br>Taruh atau ambil fonts (ttf,woff, dan lainnya) di cdn<br>&nbsp;Lalu pasang htaccess berikut:<br><pre class=".htaccess"><code># Apache config<br>&lt;FilesMatch ".(eot|ttf|otf|woff)"&gt;<br> Header set Access-Control-Allow-Origin "*"<br>&lt;/FilesMatch&gt;<br># nginx config<br>if ($filename ~* ^.*?\.(eot)|(ttf)|(woff)$){<br> add_header Access-Control-Allow-Origin *;<br>}</code></pre><br><b>2.  Gunakan Non-Blocking CSS Loading</b><br><br><pre><code>&lt;link rel="stylesheet" type="text/css" href="fonts.css" media="none" onload="this.media='all';"&gt;<br>&lt;link rel="stylesheet" type="text/css" href="style.css" media="none" onload="this.media='all';"&gt;<br></code></pre><br><b>3. Bedakan fonts model dengan CSS</b><br><br><br><pre><code>h1 { font-family: Arial, serif; } /* basic system font */ .fontsloaded h1 { font-family: 'MySpecialFont', serif; } /* custom system font */</code></pre><br><pre><code>&lt;link href="fonts.css" onload="document.body.className+=' fontsloaded';" rel="stylesheet" type="text/css" &gt;</code></pre><br><b>4. Letakkan fonts file di penyimpanan lokal (localstorage)</b><br><br>Selesai. Begitulah sedikit pengetahuan saya dalam merender fonts lebih cepat.<br>Namun saya rekomendasikan menggunakan <i>NON BLOCKING RENDER LOADING</i>.