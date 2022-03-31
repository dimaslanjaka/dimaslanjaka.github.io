---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2019-07-16T03:03:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:18.030+07:00
subtitle: Extract video id from youtube URL with javascript function function
  youtubeparserurl var regExp =
tags:
  - JS
title: "[JS] Youtube Video ID URL Parser"
type: post
uuid: fc26a82f-95a0-4888-8b4e-d28bbc248a4e
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:18+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Extract video id from youtube URL with javascript function function
  youtubeparserurl var regExp =
excerpt: Extract video id from youtube URL with javascript function function
  youtubeparserurl var regExp =
wordcount: 186
---

<div dir="ltr" style="text-align: left;" trbidi="on"><b>Extract video id from youtube URL with javascript function</b> <pre><br>function youtube_parser(url){<br>    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&amp;\?]*).*/;<br>    var match = url.match(regExp);<br>    if (match&amp;&amp;match[7].length==11) { return match[7]}<br>  <br>  var regExp2 = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&amp;v=)([^#\&amp;\?]*).*/;<br>  var match2 = url.match(regExp2);<br>  if (match2 &amp;&amp; match2[2].length == 11) {<br>    return match2[2];<br>  }<br>  <br>  var regex = /(?:[?&amp;]v=|\/embed\/|\/1\/|\/v\/|https?:\/\/(?:www\.)?youtu\.be\/)([^&amp;\n?#]+)/gm;<br>  let m = regex.exec(url);<br>  if (m[1].length){<br>    return m[1];<br>  }<br>  <br>  return url+' --failed--';<br>}<br>console.clear()<br>var n = [<br>  'http://www.youtube.com/watch?v=0zMd3nApSvMg&amp;feature=feedrec_grec_index', <br>  'http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o', <br>  'http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;amp;hl=en_US&amp;amp;rel=0',<br>  'http://www.youtube.com/watch?v=0zMg3nApSvMg#t=0m10s',<br>  'http://www.youtube.com/embed/0zM3nApdSvMg?rel=0',<br>  'http://www.youtube.com/watch?v=0zM3nAxpSvMg',<br>  'http://youtu.be/0zM3nApgSvMg'<br>];<br>  n.forEach(function(i){<br>  document.write(youtube_parser(i)+'&lt;br&gt;')<br>});<br></pre> <b>demo</b><p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="dimaslanjaka" data-slug-hash="BggxgP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Youtube URL Parser">  <span>See the Pen <a href="https://codepen.io/dimaslanjaka/pen/BggxgP/" rel="noopener noreferer nofollow">  Youtube URL Parser</a> by dimas lanjaka (<a href="https://codepen.io/dimaslanjaka" rel="noopener noreferer nofollow">@dimaslanjaka</a>)   on <a href="https://codepen.io" rel="noopener noreferer nofollow">CodePen</a>.</span></p><script async="" src="https://static.codepen.io/assets/embed/ei.js"></script></div>