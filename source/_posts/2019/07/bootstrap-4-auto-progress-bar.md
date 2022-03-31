---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://dimaslanjaka.github.io/assets/img/javascript.png
date: 2019-07-25T23:09:00.001+07:00
lang: en
location: ""
modified: 2019-07-25T23:54:52.055+07:00
subtitle: See the Pen Bootstrap progress bar countdown by dimas lanjaka
  @dimaslanjaka on CodePen.
tags:
  - CSS
  - JS
  - HTML
title: Bootstrap 4 Auto Progress Bar
type: post
uuid: e4a3479a-db0e-4888-88e0-d76a7f5bdb59
webtitle: WMI Gitlab
updated: 2019-07-25T23:54:52+07:00
thumbnail: https://dimaslanjaka.github.io/assets/img/javascript.png
photos:
  - https://dimaslanjaka.github.io/assets/img/javascript.png
description: See the Pen Bootstrap progress bar countdown by dimas lanjaka
  @dimaslanjaka on CodePen.
excerpt: See the Pen Bootstrap progress bar countdown by dimas lanjaka
  @dimaslanjaka on CodePen.
wordcount: 269
---

<blockquote>  Press F12 for console debug    <br>  <pre type="Info"><br>  requirements:<br>  1. jQuery<br>  2. Bootstrap 4 css<br>  3. <a href="https://rawcdn.githack.com/dimaslanjaka/Web-Manajemen/f3dfa14a3848a8282eb39b1e2f01e1d6e62d7c44/js/jquery.progressBarTimer.min.js" rel="noopener noreferer nofollow">https://rawcdn.githack.com/dimaslanjaka/Web-Manajemen/f3dfa14a3848a8282eb39b1e2f01e1d6e62d7c44/js/jquery.progressBarTimer.min.js</a> Read <a href="https://web-manajemen.blogspot.com/2019/07/cara-defer-loading-javascript.html" target="_blank" rel="follow">How to async defer CSS JS perfectly</a><br>  <br>  attribute info:<br>    countdown = to start countdown<br>    data-callback = function name of callback<br>    data-warning = bar warning style <br>    data-success = bar success style<br>    data-base = bar progress style<br>  </pre></blockquote><b>HTML code</b><pre type="HTML"><br>&lt;div data-callback="fn" countdown="5"&gt;&lt;/div&gt;<br>&lt;div data-callback="fi" countdown="10"&gt;&lt;/div&gt;<br></pre><b>Javascript code</b><pre type="JS"><br>var elm = $("[countdown]"); <br><br>function fc() {<br>    console.log("callback Succedeed")<br>}<br><br>function ctd(elm) { //main function<br>    var tl = 0 &lt; elm.attr("countdown") ? elm.attr("countdown") : 5,<br>        bs = elm.data("base") ? elm.data("base") : "bg-info",<br>        bw = elm.data("warning") ? elm.data("warning") : "bg-danger",<br>        bc = elm.data("success") ? elm.data("success") : "bg-success",<br>        myCountdown = elm.progressBarTimer({<br>            warningThreshold: 5,<br>            timeLimit: tl,<br>            baseStyle: bs,<br>            warningStyle: bw,<br>            completeStyle: bc,<br>            smooth: !0,<br>            striped: !0,<br>            animated: !0,<br>            height: 0,<br>            onFinish: function() {<br>                var callback = elm.data("callback"),<br>                    xn = window[callback];<br>                if ("function" == typeof xn) {<br>                    var x = eval(callback);<br>                    x()<br>                } else console.log(callback + " isn't function ")<br>            },<br>            label: {<br>                show: !0,<br>                type: "percent"<br>            },<br>            autoStart: !0<br>        })<br>}<br>0 &lt; elm.length &amp;&amp; elm.each(function(e) { //looping elements with attribute countdown<br>    ctd($(this))<br>});<br></pre> <b>Live example</b><img src="https://dimaslanjaka.github.io/assets/img/javascript.png"><p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="dimaslanjaka" data-slug-hash="oKLOrB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Bootstrap 4 progress bar countdown">  <span>See the Pen <a href="https://codepen.io/dimaslanjaka/pen/oKLOrB/" rel="noopener noreferer nofollow">  Bootstrap 4 progress bar countdown</a> by dimas lanjaka (<a href="https://codepen.io/dimaslanjaka" rel="noopener noreferer nofollow">@dimaslanjaka</a>)   on <a href="https://codepen.io" rel="noopener noreferer nofollow">CodePen</a>.</span></p><script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>