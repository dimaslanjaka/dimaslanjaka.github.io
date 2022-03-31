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
date: 2017-11-17T11:46:00.000+07:00
lang: en
location: ""
modified: 2017-11-17T11:46:04.066+07:00
subtitle: Normal HTML Compiled Before converted to PUG<script
tags:
  - CSS
title: Pug Preporcessor  SCSS border animation without svg
type: post
uuid: 43a883d6-5b11-4888-8da1-07e534f731be
webtitle: WMI Gitlab
updated: 2017-11-17T11:46:04+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Normal HTML Compiled Before converted to PUG<script
excerpt: Normal HTML Compiled Before converted to PUG<script
wordcount: 594
---

<h2>PURE CSS Using PUG Preprocessor + SCSS to create border animation without SVG</h2><amp-img alt="PUG HTML AND SCSS" height="300" src="https://web-capture.net/picture_mini.php?type=jpeg&amp;url=https%3A%2F%2Fsource.l3n4r0x.cf%2Fphp%2Fcodepen.php%3Fuser%3Ddimaslanjaka%26id%3DgWWrbB%26tab%3Dresult%26h%3D500" width="300"></amp-img><br><h3>HTML Code</h3><div><b>Normal HTML (Compiled | Before converted to PUG)</b><br><pre>&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"&gt;&lt;/script&gt;<br>&lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/6.0.0/normalize.css"/&gt;<br>&lt;div class="bb"&gt;&lt;/div&gt;</pre></div><div><b>PUG CODE (After Converted from NORMAL HTML)</b></div><pre>script(src='https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js')<br>link(rel='stylesheet', href ='https://cdnjs.cloudflare.com/ajax/libs/normalize/6.0.0/normalize.css')<br><br>.bb</pre><amp-iframe frameborder="0" height="200" layout="responsive" scrolling="yes" src="https://source.l3n4r0x.cf/php/codepen.php?user=dimaslanjaka&amp;id=gWWrbB&amp;tab=html&amp;h=500" width="300"></amp-iframe><br><h4>CSS Code:</h4><div><b>NORMAL CSS (Before converted to SCSS):</b><br><pre>.bb, .bb::before, .bb::after {<br>  position: absolute;<br>  top: 0;<br>  bottom: 0;<br>  left: 0;<br>  right: 0;<br>}<br><br>.bb {<br>  width: 200px;<br>  height: 200px;<br>  margin: auto;<br>  background: url("https://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png") no-repeat 50%/70% rgba(0, 0, 0, 0.1);<br>  color: #69ca62;<br>  box-shadow: inset 0 0 0 1px rgba(105, 202, 98, 0.5);<br>}<br>.bb::before, .bb::after {<br>  content: '';<br>  z-index: -1;<br>  margin: -5%;<br>  box-shadow: inset 0 0 0 2px;<br>  animation: clipMe 8s linear infinite;<br>}<br>.bb::before {<br>  animation-delay: -4s;<br>}<br>.bb:hover::after, .bb:hover::before {<br>  background-color: rgba(255, 0, 0, 0.3);<br>}<br><br>@keyframes clipMe {<br>  0%, 100% {<br>    clip: rect(0px, 220px, 2px, 0px);<br>  }<br>  25% {<br>    clip: rect(0px, 2px, 220px, 0px);<br>  }<br>  50% {<br>    clip: rect(218px, 220px, 220px, 0px);<br>  }<br>  75% {<br>    clip: rect(0px, 220px, 220px, 218px);<br>  }<br>}<br>html,<br>body {<br>  height: 100%;<br>}<br><br>body {<br>  position: relative;<br>  background-color: #0f222b;<br>}<br><br>*,<br>*::before,<br>*::after {<br>  box-sizing: border-box;<br>}</pre></div><div><b>SCSS Code (After Converted from Normal CSS)</b><br><pre>$anime-time: 8s;<br><br>$box-size: 200px;<br>$clip-distance: .05;<br>$clip-size: $box-size * (1 + $clip-distance * 2);<br>$path-width: 2px;<br><br>$main-color: #69ca62;<br><br>$codepen-logo-path: url('https://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png');<br><br>%full-fill {<br>  position: absolute;<br>  top: 0;<br>  bottom: 0;<br>  left: 0;<br>  right: 0;<br>}<br><br>.bb {<br>  @extend %full-fill;<br>  width: $box-size;<br>  height: $box-size;<br>  margin: auto;<br>  background: $codepen-logo-path no-repeat 50% / 70% rgba(#000, .1);<br>  color: $main-color;<br>  box-shadow: inset 0 0 0 1px rgba($main-color, .5);<br><br>  &amp;::before,<br>  &amp;::after {<br>    @extend %full-fill;<br>    content: '';<br>    z-index: -1;<br>    margin: -1 * $clip-distance * 100%;<br>    box-shadow: inset 0 0 0 $path-width; <br>    animation: clipMe $anime-time linear infinite;<br>  }<br><br>  &amp;::before {<br>    animation-delay: $anime-time * -.5;<br>  }<br><br>  // for debug<br>  &amp;:hover {<br>    &amp;::after,<br>    &amp;::before {<br>      background-color: rgba(#f00, .3);<br>    }<br>  }<br><br>}<br><br>@keyframes clipMe {<br>  0%, 100% {clip: rect(0px, $clip-size, $path-width, 0px); }<br>  25% {clip: rect(0px, $path-width, $clip-size, 0px); }<br>  50% {clip: rect($clip-size - $path-width, $clip-size, $clip-size, 0px); }<br>  75% {clip: rect(0px, $clip-size, $clip-size, $clip-size - $path-width); }<br>}<br><br>/////<br><br>html,<br>body {<br>  height: 100%;<br>}<br><br>body {<br>  position: relative;<br>  background-color: #0f222b;<br>}<br><br>*,<br>*::before,<br>*::after {<br>  box-sizing: border-box;<br>}</pre></div><amp-iframe frameborder="0" height="500" layout="responsive" scrolling="yes" src="https://source.l3n4r0x.cf/php/codepen.php?user=dimaslanjaka&amp;id=gWWrbB&amp;tab=css&amp;h=500" width="300"></amp-iframe><br><br><h5>Result DEMO:</h5><amp-iframe frameborder="0" height="500" layout="responsive" scrolling="yes" src="https://source.l3n4r0x.cf/php/codepen.php?user=dimaslanjaka&amp;id=gWWrbB&amp;tab=result&amp;h=500" width="300"></amp-iframe>