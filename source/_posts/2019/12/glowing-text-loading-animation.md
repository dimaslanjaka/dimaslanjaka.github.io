---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://2.bp.blogspot.com/-UFidWzf_o3A/Xfp0n9U9c4I/AAAAAAAAAiI/Ve1ajQPHYdsVNKW9F8Rc8iPr0eLAYVeQgCLcBGAsYHQ/s1600/Screenshot_1.png
date: 2019-12-31T01:50:00.000+07:00
lang: en
location: ""
modified: 2019-12-31T01:50:05.800+07:00
subtitle: "Glowing Text Loading AnimationCSSbody
  margin:0px;padding:0px;background:262222;ULposition:
  absolute;top:50;left:50;display:"
tags:
  - CSS
  - HTML
  - Tips & Tricks
title: Glowing Text Loading Animation
type: post
uuid: 862e19a4-fdf1-4888-8d3b-b2616fe48ad3
webtitle: WMI Gitlab
updated: 2019-12-31T01:50:05+07:00
thumbnail: https://2.bp.blogspot.com/-UFidWzf_o3A/Xfp0n9U9c4I/AAAAAAAAAiI/Ve1ajQPHYdsVNKW9F8Rc8iPr0eLAYVeQgCLcBGAsYHQ/s1600/Screenshot_1.png
photos:
  - https://2.bp.blogspot.com/-UFidWzf_o3A/Xfp0n9U9c4I/AAAAAAAAAiI/Ve1ajQPHYdsVNKW9F8Rc8iPr0eLAYVeQgCLcBGAsYHQ/s1600/Screenshot_1.png
description: "Glowing Text Loading AnimationCSSbody
  margin:0px;padding:0px;background:262222;ULposition:
  absolute;top:50;left:50;display:"
excerpt: "Glowing Text Loading AnimationCSSbody
  margin:0px;padding:0px;background:262222;ULposition:
  absolute;top:50;left:50;display:"
wordcount: 218
---

<div dir="ltr" style="text-align: left;" trbidi="on"><h2>Glowing Text Loading Animation</h2><img border="0" src="https://2.bp.blogspot.com/-UFidWzf_o3A/Xfp0n9U9c4I/AAAAAAAAAiI/Ve1ajQPHYdsVNKW9F8Rc8iPr0eLAYVeQgCLcBGAsYHQ/s1600/Screenshot_1.png" data-original-width="1352" data-original-height="546"><b>CSS</b><br><pre>body{<br> margin:0px;padding:0px;background:#262222;<br>}<br>UL{<br>position: absolute;<br>top:50%;<br>left:50%;<br>display: flex;<br>transform: translate(-50% ,-50%);<br>}<br>ul li{<br>  list-style: none;<br>  letter-spacing: 15px;<br>  font-size: 5em;<br>  font-family: fantasy;<br>  color:#484848;<br>  animation: ani 1.2s linear infinite;<br>}<br>ul li:nth-child(1){<br>  animation-delay: .2s;<br>}<br>ul li:nth-child(2){<br>  animation-delay: .6s;<br>}<br>ul li:nth-child(3){<br>  animation-delay: .8s;<br>}<br>ul li:nth-child(4){<br>  animation-delay: 1.0s;<br>}<br>ul li:nth-child(5){<br>  animation-delay: 1.4s;<br>}<br>ul li:nth-child(6){<br>  animation-delay: 1.8s;<br>}<br>ul li:nth-child(7){<br>  animation-delay: 1.12s;<br>}<br>@keyframes ani {<br>  0%{<br>     color:#44848;<br>     text-shadow: none;<br>  }<br>  90%{<br>     color:#44848;<br>     text-shadow: none;<br>  }<br>  100%{<br>     color:#fff900;<br>     text-shadow: 0 0 7px #fff900,0 0 70px #fff123;<br>  }<br>}<br></pre><b>HTML</b><br><pre>&lt;ul&gt;<br>  &lt;li&gt;L&lt;/li&gt;<br>  &lt;li&gt;O&lt;/li&gt;<br>  &lt;li&gt;A&lt;/li&gt;<br>  &lt;li&gt;D&lt;/li&gt;<br>  &lt;li&gt;I&lt;/li&gt;<br>  &lt;li&gt;N&lt;/li&gt;<br>  &lt;li&gt;G&lt;/li&gt;<br>&lt;/ul&gt;<br></pre><h5>try it</h5><p class="codepen" data-height="300" data-theme-id="light" data-default-tab="css,result" data-user="omaf" data-slug-hash="NgWzmL" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Glowing Text Loading Animation Tutorial - Html Css Blinking Text Effect ">  <span>See the Pen <a href="https://codepen.io/omaf/pen/NgWzmL" rel="noopener noreferer nofollow">  Glowing Text Loading Animation Tutorial - Html Css Blinking Text Effect </a> by omar (<a href="https://codepen.io/omaf" rel="noopener noreferer nofollow">@omaf</a>)   on <a href="https://codepen.io" rel="noopener noreferer nofollow">CodePen</a>.</span></p><script async="" src="https://static.codepen.io/assets/embed/ei.js"></script></div>