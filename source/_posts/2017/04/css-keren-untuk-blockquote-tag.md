---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2017-04-11T15:56:00.000+07:00
lang: en
location: ""
modified: 2017-04-11T15:56:03.823+07:00
subtitle: Apa itu blockquote tag HTML <blockquote> tag digunakan untuk
  menunjukkan kutipan panjang yaitu kutipan yang berlangsung beberapa baris.
tags:
  - CSS
title: css keren untuk blockquote tag
type: post
uuid: 8e1d8e9d-156d-4888-8c52-c89f5acc47b1
webtitle: WMI Gitlab
updated: 2017-04-11T15:56:03+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Apa itu blockquote tag HTML <blockquote> tag digunakan untuk
  menunjukkan kutipan panjang yaitu kutipan yang berlangsung beberapa baris.
excerpt: Apa itu blockquote tag HTML <blockquote> tag digunakan untuk
  menunjukkan kutipan panjang yaitu kutipan yang berlangsung beberapa baris.
wordcount: 730
---

<div dir="ltr" style="text-align: left;" trbidi="on"><h2>Apa itu blockquote tag ? </h2><div><div style="text-align: left;"><span style="font-family: &quot;raleway&quot;;">HTML &lt;blockquote&gt; tag digunakan untuk menunjukkan kutipan panjang (yaitu kutipan yang berlangsung beberapa baris). Ini harus mengandung unsur-unsur blok-tingkat hanya di dalamnya, dan tidak hanya teks biasa.</span><br><span style="font-family: &quot;raleway&quot;;"><br></span><span style="font-family: &quot;raleway&quot;;">Nah, dalam tutorial kali ini saya akan membagikan bagaimana cara menjadikan &lt;blockquote&gt; tersebut menjadi keren dengan CSS. Berikut salah satu CSS terbaik untuk memodifikasi tampilan &lt;blockquote&gt; :</span></div><span class="notranslate" style="background-color: white; box-sizing: border-box; font-family: &quot;verdana&quot; , &quot;geneva&quot; , &quot;tahoma&quot; , &quot;arial&quot; , &quot;helvetica&quot; , sans-serif; font-size: 15px; line-height: 24px; text-align: justify;"><br></span></div><div><pre></pre><pre>blockquote{<br>  display:block;<br>  background: #fff;<br>  padding: 15px 20px 15px 45px;<br>  margin: 0 0 20px;<br>  position: relative;<br><br>  <br><br>  /*Font*/<br>  font-family: Georgia, serif;<br>  font-size: 16px;<br>  line-height: 1.2;<br>  color: #666;<br>  text-align: justify;<br><br>  /*Borders - (Optional)*/<br>  border-left: 15px solid #c76c0c;<br>  border-right: 2px solid #c76c0c;<br><br>  /*Box Shadow - (Optional)*/<br>  -moz-box-shadow: 2px 2px 15px #ccc;<br>  -webkit-box-shadow: 2px 2px 15px #ccc;<br>  box-shadow: 2px 2px 15px #ccc;<br>}<br><br>blockquote::before{<br>  content: "\201C"; /*Unicode for Left Double Quote*/<br><br>  /*Font*/<br>  font-family: Georgia, serif;<br>  font-size: 60px;<br>  font-weight: bold;<br>  color: #999;<br><br>  /*Positioning*/<br>  position: absolute;<br>  left: 10px;<br>  top:5px;<br>}<br>blockquote::after{<br>  /*Reset to make sure*/<br>  content: "";<br>}<br>blockquote a{<br>  text-decoration: none;<br>  background: #eee;<br>  cursor: pointer;<br>  padding: 0 3px;<br>  color: #c76c0c;<br>}<br>blockquote a:hover{<br> color: #666;<br>}<br>blockquote em{<br>  font-style: italic;<br>}</pre><br><h3><a alt="Demo" href="https://codepen.io/maxds/full/DcveB/" rel="noopener noreferer nofollow" target="_blank" title="Demo">View DEMO</a>.</h3></div><div>Ada pun CSS kode lainnya untuk memodifikasi &lt;blockquote&gt; tag, namun lebih rumit. Ini dia&nbsp;<a href="https://codepen.io/andrewwright/pen/Aigre" rel="noopener noreferer nofollow" target="_blank">Project Codepen.io</a>.<br><br>Namun bila anda ingin CSS yang simple untuk &lt;blockquote&gt; ini anda bisa menggunakan CSS ini :<br><br><pre>blockquote {<br>  background: #f9f9f9;<br>  border-left: 10px solid #ccc;<br>  margin: 1.5em 10px;<br>  padding: 0.5em 10px;<br>  quotes: "\201C""\201D""\2018""\2019";<br>}<br>blockquote:before {<br>  color: #ccc;<br>  content: open-quote;<br>  font-size: 4em;<br>  line-height: 0.1em;<br>  margin-right: 0.25em;<br>  vertical-align: -0.4em;<br>}<br>blockquote p {<br>  display: inline;<br>}</pre><br><a alt="Demo Simple" href="http://codepen.io/P3R0/full/jEXvRK/" rel="noopener noreferer nofollow" title="Demo Simple">DEMO Hasil CSS simple tersebut</a>.<br><br>Nah demikian lah "CSS keren untuk &lt;blockquote&gt; tag". Sekian dari saya "Dimas Lanjaka" semoga membantu</div></div>