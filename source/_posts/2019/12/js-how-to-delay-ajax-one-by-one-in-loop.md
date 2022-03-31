---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://artandlogic.com/wp-content/uploads/2000px-AJAX_logo_by_gengns.svg_.png
date: 2019-12-30T02:26:00.001+07:00
lang: en
location: ""
modified: 2020-01-07T13:18:21.183+07:00
subtitle: "[JS] How to delay ajax one by one in loop"
tags:
  - JS
  - Share
title: "[JS] How to delay ajax one by one in loop"
type: post
uuid: c78f5103-caec-4888-895e-2fd1cefce788
webtitle: WMI Gitlab
updated: 2020-01-07T13:18:21+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://artandlogic.com/wp-content/uploads/2000px-AJAX_logo_by_gengns.svg_.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://artandlogic.com/wp-content/uploads/2000px-AJAX_logo_by_gengns.svg_.png
description: "[JS] How to delay ajax one by one in loop"
excerpt: "[JS] How to delay ajax one by one in loop"
wordcount: 564
---

<i>Bahasa indonesia: Bagaimana eksekusi ajax satu per satu di Loop</i><br><pre>&lt;div id="demo"&gt;&lt;/div&gt;<br>&lt;script&gt;<br>/**<br> * Define global variable<br> * @var {int} indexLoop global loop indexer<br> * @var {int} lastLoop global last iteration for global loop indexer from loop initializer<br> * @var {array} queueLoop global array to be processed from ajax<br> * @var {array} arrayLoop define array to be proccesed<br> */<br><br>var indexLoop = 0,<br>  lastLoop = 0,<br>  queueLoop = [],<br>  arrayLoop = ['apple', 'melon', 'watermelon', 'grapes'];<br><br>for (var i = 0; i &lt; arrayLoop.length; i++) {<br>  queueLoop.push(arrayLoop[i]);<br>  if (i == arrayLoop.length - 1) {<br>    lastLoop = i + 1;<br>    ajaxLoop(function () {<br>      var b = document.createElement('b');<br>      b.innerHTML = 'Processing all item ' + indexLoop + ' of ' + lastLoop + ' succedeed&lt;br/&gt;';<br>      document.getElementById('demo').appendChild(b);<br>    });<br>  }<br>}<br>/**<br> * Initialize global ajaxLoop function<br> * @param {function} lastFunction function to be executed on last iteration<br> */<br>function ajaxLoop(lastFunction) {<br>  if (indexLoop &lt; lastLoop) {<br>    $.ajax({<br>      url: 'https://reqres.in/api/users?page=' + (indexLoop + 1),<br>      beforeSend: function () {<br>        var b = document.createElement('b');<br>        b.innerHTML = 'Processing item ' + indexLoop + ' of ' + lastLoop + '&lt;br/&gt;';<br>        document.getElementById('demo').appendChild(b);<br>      },<br>      success: function (response) {<br>        var b = document.createElement('b');<br>        b.innerHTML = 'Processed item success ' + this.url.split('=')[1] + ' of ' + lastLoop + '&lt;br/&gt;';<br>        document.getElementById('demo').appendChild(b);<br>      },<br>      error: function () {<br>        var b = document.createElement('b');<br>        b.innerHTML = 'Processed item error ' + this.url.split('=')[1] + ' of ' + lastLoop + '&lt;br/&gt;';<br>        document.getElementById('demo').appendChild(b);<br>      },<br>      complete: function () {<br>        var b = document.createElement('b');<br>        b.innerHTML = 'Processed item complete ' + this.url.split('=')[1] + ' of ' + lastLoop + '&lt;br/&gt;';<br>        document.getElementById('demo').appendChild(b);<br>      }<br>    });<br><br>    indexLoop++;<br>    ajaxLoop();<br>    if (indexLoop == queueLoop.length) {<br>      if (typeof lastFunction == 'function') {<br>        lastFunction();<br>        /** reseting global indexer */<br>        indexLoop = 0;<br>      }<br>    }<br>  }<br>}<br>&lt;/script&gt;</pre><h2>preview</h2>    <div class="cp_embed_wrapper"><iframe name="cp_embed_2" src="https://codepen.io/dimaslanjaka/embed/qBEXLYV?height=265&amp;theme-id=light&amp;default-tab=result&amp;user=dimaslanjaka&amp;slug-hash=qBEXLYV&amp;pen-title=await%20ajax%20jQuery%20on%20loop&amp;name=cp_embed_2" scrolling="no" frameborder="0" height="265" allowtransparency="true" allowfullscreen="true" allowpaymentrequest="true" title="await ajax jQuery on loop" class="cp_embed_iframe " style="width: 100%; overflow:hidden; display:block;" id="cp_embed_qBEXLYV"></iframe></div><script async="" src="https://static.codepen.io/assets/embed/ei.js"></script> <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://artandlogic.com/wp-content/uploads/2000px-AJAX_logo_by_gengns.svg_.png" title="Delay ajax in loop" alt="Delay ajax in loop" width="100%">