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
date: 2018-03-11T00:53:00.002+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:18.013+07:00
subtitle: Loading of external javascript resources libraries, plugins, widgets
  should be done asynchronously, in a non-blocking manner, so the load
tags:
  - JS
title: Asynchronous Loading of External Javascript
type: post
uuid: fdb4c0db-0e4a-4888-8ac1-5ec390d0a800
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:18+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Loading of external javascript resources libraries, plugins,
  widgets should be done asynchronously, in a non-blocking manner, so the load
excerpt: Loading of external javascript resources libraries, plugins, widgets
  should be done asynchronously, in a non-blocking manner, so the load
wordcount: 327
---

<h2>INTRODUCTION</h2><div>Loading of external javascript resources (libraries, plugins, widgets) should be done asynchronously, in a non-blocking manner, so the load time of your web-page will not be affected. Thus other resources like images and CSS are not blocked from loading.</div><h2>HTML5 WAY</h2><div>In the past that was possible with help of thedefer&nbsp;attribute, later HTML5 spec introduce the&nbsp;<code>async</code>&nbsp;attribute.</div><pre>&lt;script src="//code.jquery.com/jquery-1.11.0.min.js" async&gt;<br>&lt;/script&gt;</pre><h2>PROGRAMATICALLY WAY</h2><div>Dynamically you can create&nbsp;<code>script</code>&nbsp;tag and inject it into the DOM.</div><pre class="prettyprint lang-html">&lt;script type="text/javascript"&gt;<br>(function() {<br>    var script = document.createElement("script");<br>    script.type = "text/javascript";<br>    script.async = true;<br>    script.src = "//code.jquery.com/jquery-1.11.0.min.js";<br>    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);<br>})();<br>&lt;/script&gt;</pre><h2>YOU NEED A CALLBACK?</h2><div>Often we need to know when the script is loaded, and when we are ready to use it. That's why we need a callback function. Also you can think about it as a dependency manager.</div><pre class="prettyprint lang-html">&lt;script type="text/javascript"&gt;<br>function loadScript(url, callback) {<br>    var script = document.createElement("script");<br>    script.type = "text/javascript";<br>    script.async = true;<br>    if (script.readyState) {<br>        script.onreadystatechange = function () {<br>            if (script.readyState == "loaded" || script.readyState == "complete") {<br>                script.onreadystatechange = null;<br>                if (callback &amp;&amp; typeof callback === "function") {<br>                    callback();<br>                }<br>            }<br>        };<br>    } else {<br>        script.onload = function () {<br>            if (callback &amp;&amp; typeof callback === "function") {<br>                callback();<br>            }<br>        };<br>    }<br>    script.src = url;<br>    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);<br>}<br>// How to use it<br>loadScript("//code.jquery.com/jquery-1.11.0.min.js", function () {<br>    // jQuery was loaded<br>    loadScript("//code.jquery.com/ui/1.10.4/jquery-ui.min.js");<br>});<br>&lt;/script&gt;</pre><h2 id="ECMAScript2017">ECMASCRIPT 2017 (ES8) WAY</h2><div>Callback functions runs the world of JavaScript before the advent of ECMAScript 2017 that standardized the use of&nbsp;<code>async/await</code>&nbsp;in conjunction with&nbsp;<code>Promises</code>&nbsp;(part of ECMAScript 2015).</div><pre class="prettyprint">&lt;script type="text/javascript"&gt;<br>async function loadScripts (scripts) {<br>    <br>    function get (src) {<br>        return new Promise(function (resolve, reject) {<br>            var el = document.createElement("script");<br>            el.async = true;<br>            el.addEventListener("load", function () {<br>                resolve(src);<br>            }, false);<br>            el.addEventListener("error", function () {<br>                reject(src);<br>            }, false);<br>            el.src = src;<br>            (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(el);<br>        });<br>    }<br><br>    const myPromises = scripts.map(async function (script, index) {<br>        return await get(script);<br>    });<br><br>    return await Promise.all(myPromises);<br>}<br><br>// How to use it<br>loadScripts([<br>    "https://static.zinoui.com/1.5/compiled/zino.svg.min.js",<br>    "https://static.zinoui.com/libs/jquery/jquery.min.js"<br>]).then(function () {<br>    return loadScripts(["https://static.zinoui.com/1.5/compiled/zino.chart.min.js"]);<br>}).then(function () {<br>    $("#chart").zinoChart(settings);<br>});<br>&lt;/script&gt;</pre><div>Asynchronous Loading of External Javascript Written By Dimitar Ivanov On <a href="https://zinoui.com/blog/asynchronous-loading-external-javascript" rel="noopener noreferer nofollow">Asynchronous Loading of External Javascript</a>. Posted on: June 11, 2014 </div>