---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2017-09-18T09:40:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.964+07:00
subtitle: b>Responsive Menu Hover Effect</b>:<br /><ol><li>Call jquery library
  -gt; <pre>lt;script
tags:
  - CSS
  - JS
  - HTML
title: SCSS Responsive Menu Hover Effect
type: post
uuid: f8c9935c-3dd5-4888-8799-f73f58fab576
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: b>Responsive Menu Hover Effect</b>:<br /><ol><li>Call jquery
  library -gt; <pre>lt;script
excerpt: b>Responsive Menu Hover Effect</b>:<br /><ol><li>Call jquery library
  -gt; <pre>lt;script
wordcount: 1843
---

<b>Responsive Menu Hover Effect</b>:<br><ol><li>Call jquery library -&gt; <pre>&lt;script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js' async='async'&gt;&lt;/script&gt;</pre></li><li>SCSS -&gt; <pre>@import url("https://fonts.googleapis.com/css?family=Anton|Josefin+Sans");<br>::-webkit-scrollbar {<br>  width: 10px;<br>  height: 10px;<br>  background-color: white;<br>  border-top: 1px solid #000;<br>}<br><br>::-webkit-scrollbar-thumb {<br>  background-color: #1a1a1a;<br>  height: 5px;<br>}<br><br>* {<br>  box-sizing: border-box;<br>}<br><br>/*html, body {<br>  width: 100%;<br>  min-height: 100%;<br>  margin: 0;<br>  padding: 0;<br>  background: #000;<br>}<br><br>.page {<br>  width: 720px;<br>  float: left;<br>  position: relative;<br>  left: 50%;<br>  margin-left: -360px;<br>  padding: 10px;<br>}<br>.page h1, .page p {<br>  float: left;<br>  width: 100%;<br>  color: #fff;<br>  font-family: 'Josefin Sans', sans-serif;<br>}<br>.page h1 {<br>  text-transform: uppercase;<br>  margin-top: 115px;<br>  text-align: center;<br>  letter-spacing: 10px;<br>}<br>.page p {<br>  line-height: 20pt;<br>  font-size: 14pt;<br>  font-weight: 100;<br>  text-align: justify;<br>}*/<br><br>.menu {<br>  opacity: 0;<br>  pointer-events: none;<br>  background: #fff;<br>  width: 80%;<br>  float: left;<br>  height: 100%;<br>  position: fixed;<br>  z-index: 1000;<br>  top: 0;<br>  right: 0;<br>  border-left: 15px solid #333;<br>  transition: all 1s ease;<br>  -webkit-transition: all 1s ease;<br>}<br>.menu.open {<br>  opacity: 1;<br>  pointer-events: all;<br>  transition: all 0.2s ease;<br>  -webkit-transition: all 0.2s ease;<br>}<br><br>ul {<br>  float: right;<br>  list-style: none;<br>  position: fixed;<br>  color: #000;<br>  right: 70px;<br>  font-size: 40pt;<br>  top: 50%;<br>  margin-top: -190px;<br>  font-family: 'Josefin Sans', sans-serif;<br>  text-transform: uppercase;<br>}<br>ul li {<br>  float: left;<br>  clear: both;<br>  width: 100%;<br>  margin: 20px 0px 20px 0px;<br>  text-align: right;<br>  position: relative;<br>  letter-spacing: 20px;<br>  transition: all 0.2s ease;<br>  -webkit-transition: all 0.2s ease;<br>  cursor: pointer;<br>}<br>ul li:hover {<br>  letter-spacing: 2px;<br>  padding-right: 20px;<br>  color: #31f4d6;<br>}<br>ul li:hover:after {<br>  border: 8px solid #f431d6;<br>}<br>ul li:hover:before {<br>  opacity: 1;<br>  -webkit-animation: hoverRotate .5s;<br>  /* Safari 4.0 - 8.0 */<br>  -webkit-animation-delay: .1s;<br>  -webkit-transform: rotate(45deg) translate(0px, 0px);<br>  transition: all 0.2s ease;<br>  -webkit-transition: all 0.2s ease;<br>}<br>ul li:after {<br>  content: '';<br>  float: left;<br>  position: absolute;<br>  width: 40px;<br>  border-radius: 500px;<br>  height: 40px;<br>  transition: all 0.2s ease;<br>  -webkit-transition: all 0.2s ease;<br>  border: 8px solid #000;<br>  right: -50px;<br>  z-index: -1;<br>  top: -7px;<br>}<br>ul li:before {<br>  content: '';<br>  float: left;<br>  position: absolute;<br>  width: 70px;<br>  height: 10px;<br>  background: #f4e931;<br>  right: -57px;<br>  top: 17px;<br>  -webkit-transform: rotate(-45deg) translate(-60px, 0px);<br>  opacity: 0;<br>  z-index: 10000;<br>  transition: all 0.2s ease;<br>  -webkit-transition: all 0.2s ease;<br>  -webkit-transition-delay: .1s;<br>  transition-delay: .1s;<br>}<br><br>.burger {<br>  width: 50px;<br>  float: left;<br>  position: fixed;<br>  right: 30px;<br>  z-index: 10000;<br>  top: 20px;<br>  transition: all 0.2s ease;<br>  -webkit-transition: all 0.2s ease;<br>  cursor: pointer;<br>}<br>.burger span {<br>  width: 100%;<br>  float: left;<br>  height: 7px;<br>  background: #fff;<br>  margin-top: 10px;<br>  transition: all 0.2s ease;<br>  -webkit-transition: all 0.2s ease;<br>}<br>.burger:hover span {<br>  background: #31f4d6 !important;<br>}<br>.burger.open span {<br>  background: #000;<br>}<br>.burger.open span:nth-child(1) {<br>  -webkit-transform: rotate(45deg) translate(10px, 10px);<br>}<br>.burger.open span:nth-child(2) {<br>  -webkit-transform: rotate(-45deg) translate(0px, -5px);<br>}<br>.burger.open span:nth-child(3) {<br>  opacity: 0;<br>}<br><br>@-webkit-keyframes hoverRotate {<br>  0% {<br>    -webkit-transform: rotate(-45deg) translate(-60px, 0px);<br>  }<br>  50% {<br>    -webkit-transform: rotate(-45deg) translate(0px, 0px);<br>  }<br>  100% {<br>    -webkit-transform: rotate(45deg) translate(0px, 0px);<br>  }<br>}<br>@media screen and (max-width: 750px) {<br>  .page {<br>    width: 100%;<br>    left: 0%;<br>    padding: 20px;<br>    margin-left: -0px;<br>  }<br><br>  .menu {<br>    width: 100%;<br>    border: 0;<br>  }<br><br>  ul {<br>    right: 10px;<br>  }<br>  ul li {<br>    font-size: 18pt;<br>  }<br>  ul li:after {<br>    width: 100%;<br>    border-radius: 0px;<br>    height: 3px;<br>    position: absolute;<br>    background: #f4e931;<br>    border: 0px;<br>    top: 40%;<br>  }<br>  ul li:before {<br>    display: none;<br>  }<br>  ul li:hover:after {<br>    border: 0px;<br>    opacity: 0;<br>  }<br>}</pre></li><li>Js: -&gt;<pre>$('.burger').click(function(){<br>  $(this).toggleClass('open');<br>  $('.menu').toggleClass('open');<br>});</pre></li><li>Html Example -&gt;<br><iframe frameborder="0" height="300" scrolling="auto" src="https://codepen.io/mattyfours/embed/JyVMBd?default-tab=html" width="100%"></iframe></li><li>Result -&gt; <iframe frameborder="0" height="300" scrolling="auto" src="https://codepen.io/mattyfours/embed/JyVMBd?default-tab=result" width="100%"></iframe></li></ol>