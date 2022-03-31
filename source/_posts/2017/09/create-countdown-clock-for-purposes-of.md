---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://1.bp.blogspot.com/-kL99VLzW4Ms/WaRX_4aQlbI/AAAAAAAAAB8/ArrS1QtEfG84W6z8Fj_caMdA-_J9ycrwwCLcBGAs/s320/5bfe82185dce9a2a58dee19d3c102139--status-younique-presenter.jpg
date: 2017-09-11T00:49:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.984+07:00
subtitle: Create a Countdown Clock for the purposes of 1 Hour Promo
tags:
  - CSS
  - JS
  - HTML
  - Tips & Tricks
title: Create a Countdown Clock for the purposes of 1 Hour Promo
type: post
uuid: 4f2c3e1e-7847-4888-84fd-f1609ce018dc
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://1.bp.blogspot.com/-kL99VLzW4Ms/WaRX_4aQlbI/AAAAAAAAAB8/ArrS1QtEfG84W6z8Fj_caMdA-_J9ycrwwCLcBGAs/s320/5bfe82185dce9a2a58dee19d3c102139--status-younique-presenter.jpg
photos:
  - https://1.bp.blogspot.com/-kL99VLzW4Ms/WaRX_4aQlbI/AAAAAAAAAB8/ArrS1QtEfG84W6z8Fj_caMdA-_J9ycrwwCLcBGAs/s320/5bfe82185dce9a2a58dee19d3c102139--status-younique-presenter.jpg
description: Create a Countdown Clock for the purposes of 1 Hour Promo
excerpt: Create a Countdown Clock for the purposes of 1 Hour Promo
wordcount: 498
---

If you happened to be holding promos and goods and service also aired on     the blog, maybe one of the ways to attract the interest of visitors to     follow ongoing promo can be tested by adding a countdown.<br>With such expected visitors will jump list or follow the promo because see     calculate a pullback so they feel worried not goto the promo hehehe ....<br>For that I find simple countdown with javascript in  <a alt="jsfiddle" href="https://jsfiddle.net/dimaslanjaka/e0sjfjy6/" rel="noopener noreferer nofollow" target="_top" title="JSFiddle">JSFiddle Snippet</a>.  which later became Fox I look H:M:S and add the style as in the Fiddle     below. <br><center>Demo</center><script async="" src="//jsfiddle.net/dimaslanjaka/e0sjfjy6/embed/result/"></script><noscript><iframe width="100%" height="130" src="//jsfiddle.net/dimaslanjaka/e0sjfjy6/embedded/result/" allowfullscreen="allowfullscreen" frameborder="0" scrolling="no"></iframe></noscript><br>If interested to try it out please use the codes below.<br>1. Copy the CSS code below and save it in the style of your blog.<br><script async="" src="//jsfiddle.net/dimaslanjaka/e0sjfjy6/embed/css/dark/"></script> <br><pre>@font-face {<br>  font-family: Roboto;<br>  font-style: normal;<br>  font-weight: 400;<br>  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v16/CWB0XYA8bzo0kSThX0UTuA.woff2) format('woff2'), url(https://fonts.gstatic.com/s/roboto/v16/2UX7WLTfW3W8TclTUvlFyQ.woff) format('woff'), url(https://fonts.gstatic.com/s/roboto/v16/QHD8zigcbDB8aPfIoaupKOvvDin1pK8aKteLpeZ5c0A.ttf) format('truetype')<br>}<br>.countdown {<br>  font-family: Roboto, sans-serif;<br>  font-size: 16px;<br>  font-weight: 400;<br>}<br>.countdown .countdown_text {<br>  display: block;<br>}<br>#time {<br>  font-family: Roboto, sans-serif;<br>  font-size: 40px;<br>  font-weight: 700;<br>  vertical-align: middle;<br>}<br>@font-face {<br>  font-family: Roboto;<br>  font-style: normal;<br>  font-weight: 700;<br>  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v16/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2) format('woff2'), url(https://fonts.gstatic.com/s/roboto/v16/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff) format('woff'), url(https://fonts.gstatic.com/s/roboto/v16/d-6IYplOFocCacKzxwXSOCZ2oysoEQEeKwjgmXLRnTc.ttf) format('truetype')<br>}<br></pre>Then save this javascript code at the top of the <kbd>&lt;/body&gt;</kbd><br><script async="" src="//jsfiddle.net/dimaslanjaka/e0sjfjy6/embed/js/dark/"></script> <br><pre>&lt;script&gt;<br>//&lt;![CDATA[<br>function startTimer(duration, display) {<br>  var timer = duration, hours, minutes, seconds;<br>  setInterval(function() {<br>    hours = parseInt(timer / 3600, 10);<br>    minutes = parseInt(timer % 3600 / 60, 10);<br>    seconds = parseInt(timer % 60, 10);<br><br>    hours = hours &lt; 10 ? "0" + hours : hours;<br>    minutes = minutes &lt; 10 ? "0" + minutes : minutes;<br>    seconds = seconds &lt; 10 ? "0" + seconds : seconds;<br><br>    display.textContent = hours + ":" + minutes + ":" + seconds;<br><br>    if (--timer &lt; 0) {<br>      timer = duration;<br>    }<br>  }, 1000);<br>}<br><br>window.onload = function() {<br>  var fiveMinutes = 60 * 60,<br>    display = document.querySelector('#time');<br>  startTimer(fiveMinutes, display);<br>};<br>//]]&gt;<br>&lt;/script&gt;<br></pre>Then his countdown to display using the HTML code below <br><script async="" src="//jsfiddle.net/dimaslanjaka/e0sjfjy6/embed/html/dark/"></script> <br><pre>&lt;div class="countdown"&gt;<br>  &lt;span class="countdown_text"&gt;Registration closes in&lt;/span&gt;<br>  &lt;span id="time"&gt;01:00:00&lt;/span&gt;<br>  &lt;span&gt;minutes!&lt;/span&gt;<br>&lt;/div&gt;<br></pre><br><div class="separator" style="clear: both; text-align: center;"><a href="https://1.bp.blogspot.com/-kL99VLzW4Ms/WaRX_4aQlbI/AAAAAAAAAB8/ArrS1QtEfG84W6z8Fj_caMdA-_J9ycrwwCLcBGAs/s1600/5bfe82185dce9a2a58dee19d3c102139--status-younique-presenter.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="236" data-original-width="236" height="320" src="https://1.bp.blogspot.com/-kL99VLzW4Ms/WaRX_4aQlbI/AAAAAAAAAB8/ArrS1QtEfG84W6z8Fj_caMdA-_J9ycrwwCLcBGAs/s320/5bfe82185dce9a2a58dee19d3c102139--status-younique-presenter.jpg" width="320"></a></div>Okay. Good luck.  <br>So the article today about <b>Create a Countdown Clock for the purposes of 1 Promo</b>, hopefully can help your problem about countdown timer.