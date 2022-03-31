---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://1.bp.blogspot.com/-JTaqhxiYd1E/WcU1hIQLgxI/AAAAAAAAAHk/sZcV1Nd5gf8nN_sb9B26g69ev9WkebldACLcBGAs/s320/Screenshot_2017-09-22-23-08-01-400_com.android.chrome.png
date: 2017-09-20T11:36:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.829+07:00
subtitle: FontAwesome CSS3 Text Animation
tags:
  - CSS
  - JS
  - HTML
title: FontAwesome CSS3 Text Animation
type: post
uuid: 8cb1225b-2272-4888-8552-f5f0d260783d
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://1.bp.blogspot.com/-JTaqhxiYd1E/WcU1hIQLgxI/AAAAAAAAAHk/sZcV1Nd5gf8nN_sb9B26g69ev9WkebldACLcBGAs/s320/Screenshot_2017-09-22-23-08-01-400_com.android.chrome.png
photos:
  - https://1.bp.blogspot.com/-JTaqhxiYd1E/WcU1hIQLgxI/AAAAAAAAAHk/sZcV1Nd5gf8nN_sb9B26g69ev9WkebldACLcBGAs/s320/Screenshot_2017-09-22-23-08-01-400_com.android.chrome.png
description: FontAwesome CSS3 Text Animation
excerpt: FontAwesome CSS3 Text Animation
wordcount: 896
---

Text Animation CSS and FontAwesome <br><div><img src="https://1.bp.blogspot.com/-JTaqhxiYd1E/WcU1hIQLgxI/AAAAAAAAAHk/sZcV1Nd5gf8nN_sb9B26g69ev9WkebldACLcBGAs/s320/Screenshot_2017-09-22-23-08-01-400_com.android.chrome.png" height="300" width="300"></div><ol><li>Import font-awesome from cdn -&gt;&nbsp;<kbd>https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css</kbd></li><li>CSS: <pre>@import url('https://fonts.googleapis.com/css?family=Anton|Roboto');<br><br>.word {<br> font-family: 'Anton', sans-serif;<br> perspective: 1000px; <br> perspective-origin: 200px 40px;<br>}<br><br>.word span {<br> cursor: pointer;<br> display: inline-block;<br> font-size: 100px;<br> user-select: none;<br> line-height: .8;<br>}<br><br>.word span:nth-child(1).active {<br> animation: balance 1.5s ease-out;<br> transform-origin: 0% 100% 0px;<br>}<br><br>@keyframes balance {<br> 0%, 100% {<br>  transform: rotate(0deg);<br> }<br> <br> 30%, 60% {<br>  transform: rotate(-45deg);<br> }<br>}<br><br>.word span:nth-child(2).active {<br> animation: shrinkjump 1s ease-in-out;<br> transform-origin: bottom center;<br>}<br><br>@keyframes shrinkjump {<br> 10%, 35% {<br>  transform: scale(2, .2) translate(0, 0);<br> }<br> <br> 45%, 50% {<br>  transform: scale(1) translate(0, -150px);<br> }<br> <br> 80% {<br>  transform: scale(1) translate(0, 0);<br> }<br>}<br><br>.word span:nth-child(3).active {<br> animation: falling 2s ease-out;<br> transform-origin: bottom center;<br>}<br><br>@keyframes falling {<br> 12% {<br>  transform: rotateX(240deg);<br> }<br> <br> 24% {<br>  transform: rotateX(150deg);<br> }<br> <br> 36% {<br>  transform: rotateX(200deg);<br> }<br> <br> 48% {<br>  transform: rotateX(175deg);<br> }<br> <br> 60%, 85% {<br>  transform: rotateX(180deg);<br> }<br> <br> 100% {<br>  transform: rotateX(0deg);<br> }<br>}<br><br>.word span:nth-child(4).active {<br> animation: rotate 1s ease-out;<br>}<br><br>@keyframes rotate {<br> 20%, 80% {<br>  transform: rotateY(180deg);<br> }<br> <br> 100% {<br>  transform: rotateY(360deg);<br> }<br>}<br><br>.word span:nth-child(5).active {<br> animation: toplong 1.5s linear;<br>}<br><br>@keyframes toplong {<br> 10%, 40% {<br>  transform: translateY(-48vh) scaleY(1);<br> }<br> <br> 90% {<br>  transform: translateY(-48vh) scaleY(4);<br> }<br>}<br><br>/* Other styles */<br>#letters-container {<br> background-color: skyblue;<br> color: #fff;<br> display: flex;<br> font-family: 'Roboto', sans-serif;<br> justify-content: center;<br> align-items: center;<br> flex-direction: row;<br> height: 100vh;<br> margin: 0; padding:0;<br>}<br><br>.fixed {<br> position: fixed;<br> top: 40px;<br> left: 50%;<br> transform: translateX(-50%);<br>}<br><br>footer {<br> position: fixed;<br> bottom: 0;<br> left: 0;<br> right: 0;<br> text-align: center;<br> letter-spacing: 1px;<br>}<br><br>footer i {<br> color: red;<br>}<br><br>footer a {<br> color: #3C97BF;<br> text-decoration: none;<br>}</pre><small><a href="https://raw.githubusercontent.com/dimaslanjaka/Web-Manajemen/master/Animasi/text-animasi.css" rel="noopener noreferer nofollow">Source Css</a></small></li><li><pre>let spans = document.querySelectorAll('.word span');<br>spans.forEach((span, idx) =&gt; {<br> span.addEventListener('click', (e) =&gt; {<br>  e.target.classList.add('active');<br> });<br> span.addEventListener('animationend', (e) =&gt; {<br>  e.target.classList.remove('active');<br> });<br> <br> // Initial animation<br> setTimeout(() =&gt; {<br>  span.classList.add('active');<br> }, 750 * (idx+1))<br>});</pre><small><a href="https://raw.githubusercontent.com/dimaslanjaka/Web-Manajemen/master/Animasi/text-animasi.js" rel="noopener noreferer nofollow">Source JS</a></small></li><li>Html: -&gt; <pre>&lt;div id="letters-container"&gt;<br>&lt;h3 class="fixed"&gt;Click the letters! | klik Huruf Nama Ku&lt;/h3&gt;<br>&lt;div class="word"&gt;<br> &lt;span&gt;D&lt;/span&gt;<br> &lt;span&gt;I&lt;/span&gt;<br> &lt;span&gt;M&lt;/span&gt;<br> &lt;span&gt;A&lt;/span&gt;<br> &lt;span&gt;S&lt;/span&gt;<br>&lt;/div&gt;<br>&lt;footer&gt;<br> &lt;p&gt;Created with &lt;i class="fa fa-heart"&gt;&lt;/i&gt; by &lt;a href="http://Web-Manajemen.blogspot.com"&gt;Dimas Lanjaka&lt;/a&gt;&lt;/p&gt;<br>&lt;/footer&gt;<br>&lt;/div&gt;</pre><small><a href="https://raw.githubusercontent.com/dimaslanjaka/Web-Manajemen/master/Animasi/text-animasi.html" rel="noopener noreferer nofollow">Source HTML</a></small></li><li>Result: -&gt;&nbsp; <div class="text-animasi"></div></li></ol><script>var gtfr = '<iframe src="http://dimaslanjaka.github.io//Web-Manajemen/master/Animasi/text-animasi.html" width="100%" height="500" frameborder="0"></iframe>'; $('.text-animasi').html(gtfr); </script>