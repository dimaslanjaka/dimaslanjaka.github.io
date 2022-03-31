---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://imgdb.net/images/3205.png
date: 2017-10-23T18:34:00.000+07:00
lang: en
location: ""
modified: 2017-10-23T18:34:03.220+07:00
subtitle: Structure BlogPosting pada AMP merupakan hal istimewa. Dijamin bila
  keyword density kata-kata/kalimat yang berhubungan dengan title/judul
tags:
  - SEO
  - Blogger
  - AMP
title: Schema Blogposting Untuk Blogger AMP
type: post
uuid: ac1809c4-69b8-4888-83ef-e9cb959e9bc3
webtitle: WMI Gitlab
updated: 2017-10-23T18:34:03+07:00
thumbnail: https://imgdb.net/images/3205.png
photos:
  - https://imgdb.net/images/3205.png
description: Structure BlogPosting pada AMP merupakan hal istimewa. Dijamin bila
  keyword density kata-kata/kalimat yang berhubungan dengan title/judul
excerpt: Structure BlogPosting pada AMP merupakan hal istimewa. Dijamin bila
  keyword density kata-kata/kalimat yang berhubungan dengan title/judul
wordcount: 151
---

Structure BlogPosting pada AMP merupakan hal istimewa. Dijamin bila keyword density (kata-kata/kalimat yang berhubungan dengan title/judul post) banyak akan ditampilkan dalam card view di posisi kedua di google. (Cek Screenshot). <img src="https://imgdb.net/images/3205.png"><br>Nah kali ini saya akan share bagaimana cara menempatkan schema Blogposting/BlogPosting Rich Card di blogger. Berikut tutorial nya: Taruh kode dibawah ini di bawah &lt;article .....&gt;:<br><pre class="prettyprint lang-xml">&lt;b:if cond='data:blog.pageType == "item"'&gt;<br>&lt;script type='application/ld+json'&gt;<br>{&amp;quot;@context&amp;quot;:&amp;quot;http:\/\/schema.org&amp;quot;,&amp;quot;@type&amp;quot;:&amp;quot;BlogPosting&amp;quot;,&amp;quot;mainEntityOfPage&amp;quot;:&amp;quot;&lt;data:blog.url/&gt;&amp;quot;,&amp;quot;headline&amp;quot;:&amp;quot;&lt;data:blog.pageTitle/&gt;&amp;quot;,&amp;quot;datePublished&amp;quot;:&amp;quot;&lt;b:if cond='data:post.timestamp'&gt;&lt;data:post.timestamp/&gt;&lt;/b:if&gt;&amp;quot;,&amp;quot;dateModified&amp;quot;:&amp;quot;&lt;b:if cond='data:top.showTimestamp'&gt;&lt;data:post.lastUpdatedISO8601/&gt;&lt;/b:if&gt;&amp;quot;,&amp;quot;publisher&amp;quot;:{&amp;quot;@type&amp;quot;:&amp;quot;Organization&amp;quot;, &amp;quot;name&amp;quot;:&amp;quot;Dimas Lanjaka&amp;quot;, &amp;quot;image&amp;quot;: { &amp;quot;@type&amp;quot;:&amp;quot;ImageObject&amp;quot;, &amp;quot;url&amp;quot;:&amp;quot;&lt;b:if cond='data:post.firstImageUrl'&gt;&lt;data:post.firstImageUrl/&gt;&lt;/b:if&gt;&amp;quot;, &amp;quot;width&amp;quot;:&amp;quot;60&amp;quot;, &amp;quot;height&amp;quot;:&amp;quot;60&amp;quot; }, &amp;quot;logo&amp;quot;: { &amp;quot;@type&amp;quot;:&amp;quot;ImageObject&amp;quot;, &amp;quot;url&amp;quot;:&amp;quot;&lt;b:if cond='data:post.firstImageUrl'&gt;&lt;data:post.firstImageUrl/&gt;&lt;/b:if&gt;&amp;quot;, &amp;quot;width&amp;quot;:&amp;quot;60&amp;quot;, &amp;quot;height&amp;quot;:&amp;quot;60&amp;quot; } },&amp;quot;author&amp;quot;:{&amp;quot;@type&amp;quot;:&amp;quot;Person&amp;quot;, &amp;quot;name&amp;quot;:&amp;quot;Dimas Lanjaka&amp;quot;},&amp;quot;description&amp;quot;: &amp;quot;&lt;b:if cond='data:blog.metaDescription'&gt;&lt;data:blog.metaDescription/&gt;&lt;b:else/&gt;&lt;b:if cond='data:post.snippet'&gt;&lt;data:post.snippet/&gt;&lt;/b:if&gt;&lt;/b:if&gt;&amp;quot;,&amp;quot;image&amp;quot;:{ &amp;quot;@type&amp;quot;:&amp;quot;ImageObject&amp;quot;, &amp;quot;url&amp;quot;:&amp;quot;&lt;b:if cond='data:post.thumbnailUrl'&gt;&lt;data:post.thumbnailUrl/&gt;&lt;b:else/&gt;&lt;b:if cond='data:post.firstImageUrl'&gt;&lt;data:post.firstImageUrl/&gt; &lt;b:else/&gt;https://3.bp.blogspot.com/-ltyYh4ysBHI/U04MKlHc6pI/AAAAAAAADQo/PFxXaGZu9PQ/w200-h150-c/no-image.png&lt;/b:if&gt;&lt;/b:if&gt;&amp;quot;, &amp;quot;width&amp;quot;:&amp;quot;622&amp;quot;, &amp;quot;height&amp;quot;:&amp;quot;415&amp;quot;}}<br>&lt;/script&gt;<br>&lt;/b:if&gt;<br></pre>Simpan template. Cek di https://search.google.com/structured-data/testing-tool/u/0/?hl=en#url=<b class="w3-text-red">https://domain.mu/post.html</b>. <blockquote>https://domain.mu/post.html ganti dengan url post blog kamu</blockquote>