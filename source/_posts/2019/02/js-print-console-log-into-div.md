---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://topjavatutorial.com/wp-content/uploads/2016/08/consolelog.png
date: 2019-02-06T22:55:00.001+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.803+07:00
subtitle: "[JS] Print console log into div"
tags:
  - JS
  - HTML
title: "[JS] Print console log into div"
type: post
uuid: e680a9ca-1abf-4888-8602-dea9131a390b
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://topjavatutorial.com/wp-content/uploads/2016/08/consolelog.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://topjavatutorial.com/wp-content/uploads/2016/08/consolelog.png
description: "[JS] Print console log into div"
excerpt: "[JS] Print console log into div"
wordcount: 83
---

<div><img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://topjavatutorial.com/wp-content/uploads/2016/08/consolelog.png"></div> <h3>HTML</h3><pre><br>&lt;div id="debug"&gt;&lt;/div&gt;<br></pre><h3>Pure Javascript</h3><pre><br>(function () {<br>    var old = console.log;<br>    var logger = document.getElementById('log');<br>    console.log = function (message) {<br>        if (typeof message == 'object') {<br>            logger.innerHTML += (JSON &amp;&amp; JSON.stringify ? JSON.stringify(message) : message) + '&lt;br /&gt;';<br>        } else {<br>            logger.innerHTML += message + '&lt;br /&gt;';<br>        }<br>    }<br>})();<br></pre><h3>Using jQuery</h3><pre><br>// Using jQuery<br>if (typeof console  != "undefined") <br>    if (typeof console.log != 'undefined')<br>        console.olog = console.log;<br>    else<br>        console.olog = function() {};<br><br>console.log = function(message) {<br>    console.olog(message);<br>    $('#debug').append('&lt;p&gt;' + message + '&lt;/p&gt;');<br>};<br>console.error = console.debug = console.info =  console.log<br></pre>