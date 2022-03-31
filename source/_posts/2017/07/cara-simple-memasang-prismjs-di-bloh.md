---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/http://crambler.com/wp-content/uploads/2014/07/PrismJS_Blog_NEW.jpg
date: 2017-07-21T02:11:00.001+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:18.077+07:00
subtitle: ""
tags:
  - CSS
  - JS
title: Cara simple memasang prismjs di blog 100 Work
type: post
uuid: 88cbec25-9c30-4888-8f9a-1eeb0ddd65e4
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:18+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/http://crambler.com/wp-content/uploads/2014/07/PrismJS_Blog_NEW.jpg
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/http://crambler.com/wp-content/uploads/2014/07/PrismJS_Blog_NEW.jpg
excerpt: null
description: null
wordcount: 113
---

<p>Cara simple memasang syntax highlighter dengan prismjs di blog 100% Work.<br></p><div class="separator" style="clear: both; text-align: center;"><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGltYXNsYW5qYWthL2ltYWdlL2ZldGNoL2h0dHA6Ly9jcmFtYmxlci5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTQvMDcvUHJpc21KU19CbG9nX05FVy5qcGc=" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="nofollow noopener" target="_blank"><img border="0" data-original-height="431" data-original-width="800" height="172" src="https://res.cloudinary.com/dimaslanjaka/image/fetch/http://crambler.com/wp-content/uploads/2014/07/PrismJS_Blog_NEW.jpg" width="320"></a></div><br>Kemaren sudah saya share<br>Hari ini saya akan share bagaimana cara memasang prismjs di blog secara sempurna.<br><br><pre>&lt;script&gt;<br>//&lt;![CDATA[<br>function loadCSS(e, t, n) { “use strict”; var i = window.document.createElement(“link”); var o = t || window.document.getElementsByTagName(“script”)[0]; i.rel = “stylesheet”; i.href = e; i.media = “only x”; o.parentNode.insertBefore(i, o); setTimeout(function () { i.media = n || “all” }) }<br>loadCSS(“<a href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-solarizedlight.css">https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-solarizedlight.css</a>”);<br><br>$(“pre:not(:has(code))”).each(function(){$(this).wrapInner(“&lt;code&gt;&lt;/code&gt;”)});$(“code”).addClass(“language-markup”);<br><br>function downloadJSAtOnload() {<br> (function(scripts) {<br>   var i = 0,<br>    l = scripts.length;<br>  for (; i&lt;l; ++i ){<br>   var element = document.createElement(“script”);<br>   element.src = scripts[i];<br>   document.body.appendChild(element);<br>  }<br> })([‘<span style="background-color: red;"><a href="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js">https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js</a></span>’,‘<a href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js">https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js</a>’]);<br>}<br>if (window.addEventListener)<br>        window.addEventListener(“load”, downloadJSAtOnload, false);<br>else if (window.attachEvent)<br> window.attachEvent(“onload”, downloadJSAtOnload);<br>else window.onload = downloadJSAtOnload;<br>//]]&gt;<br>&lt;/script&gt;</pre><br>Deskripsi:<br><br>Hapus CSS yang menstyle pre, code, pre code, misal pre{font-family:…} code{font-color:…} pre code{background:…} hapus semua yang seperti itu. (diblogger biasanya di &lt;b:skin&gt;).<br><br>Untuk kode yang saya tandai merah bisa di ikutkan bisa pula dihapus. Itu berguna untuk menetralisir mixed content.<br><br>Cara memanggil Prismjs Syntax Highlighter:<br> Cara memanggil syntax highlighter ini pun sangat simple sekali. Dengan cara berikut<br><pre>&lt;pre&gt;&lt;code&gt;KODE HTML CSS JS PHP DAN LAIN LAIN&lt;/code&gt;&lt;/pre&gt;</pre>Atau<br><pre>&lt;code&gt;KODE HTML CSS JS PHP DAN LAIN LAIN&lt;/code&gt;</pre>Atau<br><pre>&lt;pre&gt;KODE HTML CSS JS PHP DAN LAIN LAIN&lt;/pre&gt;</pre><br>Simple bukan ?.<br><b>DEMO: <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9jb2RlcGVuLmlvL2RpbWFzbGFuamFrYS9mdWxsL1hScHBiby8=" rel="nofollow noopener" target="_blank">Codepen</a></b><br><b><br></b>
