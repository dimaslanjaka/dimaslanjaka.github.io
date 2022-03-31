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
date: 2019-07-29T06:42:00.000+07:00
lang: en
location: ""
modified: 2019-07-29T06:42:02.838+07:00
subtitle: PHP CLI?phpif argv foreach argv as k=>v if k==0 continue; it =
  explode=,argv[i]; if
tags:
  - PHP
title: Put execution arg into _GET
type: post
uuid: b733e3ea-bbe3-4888-8d55-120995b0f672
webtitle: WMI Gitlab
updated: 2019-07-29T06:42:02+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: PHP CLI?phpif argv foreach argv as k=>v if k==0 continue; it =
  explode=,argv[i]; if
excerpt: PHP CLI?phpif argv foreach argv as k=>v if k==0 continue; it =
  explode=,argv[i]; if
wordcount: 145
---

<div dir="ltr" style="text-align: left;" trbidi="on"><b>PHP CLI</b><pre><code><span class="html"><span class="default">&lt;?php<br></span><span class="keyword">if (</span><span class="default">$argv</span><span class="keyword">) {<br><br>&nbsp; &nbsp; foreach (</span><span class="default">$argv </span><span class="keyword">as </span><span class="default">$k</span><span class="keyword">=&gt;</span><span class="default">$v</span><span class="keyword">)<br><br>&nbsp; &nbsp; {<br><br>&nbsp; &nbsp; &nbsp; &nbsp; if (</span><span class="default">$k</span><span class="keyword">==</span><span class="default">0</span><span class="keyword">) continue;<br><br>&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="default">$it </span><span class="keyword">= </span><span class="default">explode</span><span class="keyword">(</span><span class="string">"="</span><span class="keyword">,</span><span class="default">$argv</span><span class="keyword">[</span><span class="default">$i</span><span class="keyword">]);<br><br>&nbsp; &nbsp; &nbsp; &nbsp; if (isset(</span><span class="default">$it</span><span class="keyword">[</span><span class="default">1</span><span class="keyword">])) </span><span class="default">$_GET</span><span class="keyword">[</span><span class="default">$it</span><span class="keyword">[</span><span class="default">0</span><span class="keyword">]] = </span><span class="default">$it</span><span class="keyword">[</span><span class="default">1</span><span class="keyword">];<br><br>&nbsp; &nbsp; }<br><br>}<br></span><span class="default">?&gt;</span></span></code><br></pre></div>