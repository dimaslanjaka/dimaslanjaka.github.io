---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://imgcdn.000webhostapp.com/https/2.bp.blogspot.com/514cc0b2c6a504375873f242e193fc29.jpeg
date: 2019-12-18T01:16:00.000+07:00
lang: en
location: ""
modified: 2019-12-18T01:16:03.789+07:00
subtitle: If you add an external link in the template or in the post and use the
  target_blank attribute, then immediately complete the
tags:
  - SEO
  - Share
  - Blogger
  - Blogging
  - Tips & Tricks
title: Complete the External Link immediately with the Noopener Rail
type: post
uuid: 6e4eeda0-d61a-4888-8858-1f89365d2360
webtitle: WMI Gitlab
updated: 2019-12-18T01:16:03+07:00
thumbnail: https://imgcdn.000webhostapp.com/https/2.bp.blogspot.com/514cc0b2c6a504375873f242e193fc29.jpeg
photos:
  - https://imgcdn.000webhostapp.com/https/2.bp.blogspot.com/514cc0b2c6a504375873f242e193fc29.jpeg
description: If you add an external link in the template or in the post and use
  the target_blank attribute, then immediately complete the
excerpt: If you add an external link in the template or in the post and use the
  target_blank attribute, then immediately complete the
wordcount: 652
---

<div id="A-G-C" date="10 Dec 2019 21:02:19"><div class="post-body entry-content" id="post-body-7219041569244313891"><br><div class="clear"></div><br><noscript><img alt="Segera Lengkapi Link External Dengan Rel Noopener" height="596" src="https://imgcdn.000webhostapp.com/https/2.bp.blogspot.com/514cc0b2c6a504375873f242e193fc29.jpeg" title="Complete the External Link immediately with the Noopener Rail" width="1000"></noscript> <span class="notranslate"> If you add <i>an external link</i> in the template or in the post and use the <code class="notranslate plaintext">target="_blank"</code> attribute, then immediately complete the <code class="notranslate plaintext">rel="noopener"</code> on the links.</span> <br><br> <span class="notranslate"> Looks like this is still not much known by bloggers (including me who just found out hehehe ...).</span> <br><br> <span class="notranslate"> When we link other web pages to our blog page using <code class="notranslate plaintext">target="_blank"</code> , the new page process that runs in the browser's new window is the same as our page process.</span> <span class="notranslate"> If the new page is executing heavy JavaScript, then the performance of our blog pages can also be affected.</span> <span class="notranslate"> Oops ... it turned out to be so impactful ...</span> <br><br> <span class="notranslate"> The <code class="notranslate plaintext">target="_blank"</code> attribute on external links is also vulnerable.</span> <span class="notranslate"> The new page has access to the window object through <code class="notranslate plaintext">window.opener</code> , and can direct our page to a different URL using <code class="notranslate plaintext">window.opener.location = newURL</code> .</span> <br><br> <span class="notranslate"> For that, please fix the external link that uses <code class="notranslate plaintext">target="_blank"</code> on your blog by adding the <code class="notranslate plaintext">rel="noopener"</code> like the following example:</span> <br><br><pre class="notranslate html"> <code class="notranslate html"> &lt;a href="http://www.domainLain.com/" </code> <mark>rel="noopener"</mark> target="_blank" title="Domain Lain"&gt;Domain Lain&lt;/a&gt;<br></pre><br> <span class="notranslate"> If combined with <code class="notranslate plaintext">rel="nofollow"</code> the writing is as follows:</span> <br><br><pre class="notranslate html"> <code class="notranslate html"> &lt;a href="http://www.domainLain.com/" rel="</code> <mark>nofollow</mark> noopener" target="_blank" title="Domain Lain"&gt;Domain Lain&lt;/a&gt;<br></pre><div><br></div><div> <span class="notranslate"> May be useful.</span> </div><div><br></div><div class="clear"></div></div><br><div class="clear"></div><div class="clear"></div><img src="https://imgcdn.000webhostapp.com/https/imgcdn.000webhostapp.com/2d40abd624c13befee8a51351449d3de.jpeg" alt="Complete the External Link immediately with the Noopener Rail"></div><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/AGC/css/responsive.css"><link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/default.min.css"><script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/highlight.min.js"></script><script src="https://codepen.io/dimaslanjaka/pen/dyPYagy.js"></script><script src="https://codepen.io/dimaslanjaka/pen/aQRrbR.js"></script>