---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://i.ytimg.com/vi/tbvxFW4UJdU/maxresdefault.jpg
date: 2019-07-12T19:36:00.001+07:00
lang: en
location: ""
modified: 2019-07-22T03:25:13.241+07:00
subtitle: "Requirements jQuery if not it will automated added into pages if
  typeof jQuery == undefined window.jQuery "
tags:
  - JS
  - HTML
  - Marketing Strategies
  - Tips & Tricks
title: "[JS] Google Recaptcha V3 Complete Code"
type: post
uuid: 06adc5bf-4bae-4888-8554-fdbaf2058bd8
webtitle: WMI Gitlab
updated: 2019-07-22T03:25:13+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://i.ytimg.com/vi/tbvxFW4UJdU/maxresdefault.jpg
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://i.ytimg.com/vi/tbvxFW4UJdU/maxresdefault.jpg
description: "Requirements jQuery if not it will automated added into pages if
  typeof jQuery == undefined window.jQuery "
excerpt: "Requirements jQuery if not it will automated added into pages if
  typeof jQuery == undefined window.jQuery "
wordcount: 882
---

<div dir="ltr" style="text-align: left;" trbidi="on"><div>  <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://i.ytimg.com/vi/tbvxFW4UJdU/maxresdefault.jpg" alt="grecaptcha"></div>  <b>Requirements:</b>  <ol style="text-align: left;">    <li>jQuery (if not it will automated added into pages)&nbsp;</li>    <pre><br>      if (typeof jQuery == 'undefined' || !window.jQuery) {<br>        var hs = document.createElement('script');<br>        hs.type = 'text/javascript';<br>        hs.async = true;<br>        hs.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';<br>        document.getElementsByTagName('head')[0].appendChild(hs);<br>        document.getElementsByTagName('body')[0].appendChild(hs);<br>        document.head.appendChild(hs);<br>        document.body.appendChild(hs);<br>      }<br>    </pre>     <li>Recaptcha Site Key And Secret (backend): <a href="https://www.google.com/recaptcha/admin/" rel="noopener noreferer nofollow">Get Here</a></li>    <pre><br>    //Set site key as global variable<br>    const g_site_key = 'YOUR_SITE_KEY';<br>    </pre>     <li>Main Code:</li>    <pre><br>        //loader<br>        (function () {<br>          submitDisable();<br>          download_script('https://www.google.com/recaptcha/api.js?render='+g_site_key+'&amp;render=explicit', function () {<br>            grecaptcha.ready(function () {<br>              gexec();<br>            });<br>          });<br>        })();<br>      //function callback<br>      function gexec(){ //also refresh function<br>        grecaptcha.execute(g_site_key, { action: 'homepage' }).then(function (token) {<br>          recaptcha_insert_token(token); //insert element token into form<br>        });<br>      }<br>      //function add recaptcha elements<br>      function recaptcha_insert_token(token) {<br>        if (typeof jQuery == 'undefined'){<br>          console.log('JQuery Not Loaded');<br>        } else {<br>          var f = $('form'), fg = f.find('[name="g-recaptcha-response"]');<br>        if (fg.length === 0){<br>          $('&lt;input type="hidden" readonly value="' + token + '" name="g-recaptcha-response"&gt;').appendTo(f);<br>        } else {<br>          fg.val(token);<br>        }<br>        }<br>      }<br>    </pre>  </ol>   <h2>Complete Code</h2>  <b>HTML</b>  <pre><br>      &lt;!--button refresh token (example)--&gt;<br>      &lt;button class="btn-block btn" onclick="gexec()"&gt;Refresh&lt;/button&gt;<br>  </pre>  <b>Javascript</b>  <pre><br>    //load jQuery if not exists (automated)<br>    if (typeof jQuery == 'undefined' || !window.jQuery) {<br>      var hs = document.createElement('script');<br>      hs.type = 'text/javascript';<br>      hs.async = true;<br>      hs.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';<br>      document.getElementsByTagName('head')[0].appendChild(hs);<br>      document.getElementsByTagName('body')[0].appendChild(hs);<br>      document.head.appendChild(hs);<br>      document.body.appendChild(hs);<br>    }<br>    //set site key<br>    const g_site_key = 'YOUR_SITE_KEY';<br>    //loader<br>    (function () {<br>      submitDisable();<br>      download_script('https://www.google.com/recaptcha/api.js?render='+g_site_key+'&amp;render=explicit', function () {<br>        grecaptcha.ready(function () {<br>          gexec();<br>        });<br>      });<br>    })();<br>    //function callback<br>    function gexec(){ //also refresh function<br>      grecaptcha.execute(g_site_key, { action: 'homepage' }).then(function (token) {<br>        recaptcha_insert_token(token); //insert element token into form<br>      });<br>    }<br>    //function add recaptcha elements<br>    function recaptcha_insert_token(token) {<br>      if (typeof jQuery == 'undefined'){<br>        console.log('JQuery Not Loaded');<br>      } else {<br>        var f = $('form'), fg = f.find('[name="g-recaptcha-response"]');<br>      if (fg.length === 0){<br>        $('&lt;input type="hidden" readonly value="' + token + '" name="g-recaptcha-response"&gt;').appendTo(f);<br>      } else {<br>        fg.val(token);<br>      }<br>      }<br>    }<br>  </pre>  <b>PHP (backend)</b>  <pre><br>      &lt;?php<br>      function recaptcha_verify($secret)<br>      {<br>      	if (isset($_POST['g-recaptcha-response'])) {<br>      		$response = $_POST['g-recaptcha-response'];<br>      		$remoteip = $this-&gt;getUIP();<br>      		$secret = $this-&gt;recaptcha_s;<br>      		$g_response = json_decode(file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&amp;response=' . $response . '&amp;remoteip=' . $remoteip), true);<br>      		if (isset($g_response['success']) &amp;&amp; true === $g_response['success']) {<br>      			return true;<br>      		} else {<br>      			return false;<br>      		}<br>      	}<br>      }<br><br>      if (isset($_POST['login'])){ //example if you have post named login<br>      	if (recaptcha_verify('YOUR_SECRET_KEY_HERE') !== false){<br>      		/* Recaptcha Success */<br>      	} else {<br>      		/* Recaptcha Failed */<br>      	}<br>      }<br>  </pre>  <h2>Full Example at Codepen</h2>  <div class="codepen" data-default-tab="js,result" data-height="265" data-pen-title="Complete Google recaptcha v3" data-slug-hash="qzgYmp" data-theme-id="0" data-user="dimaslanjaka" style="border: 2px solid; box-sizing: border-box; display: flex; height: 265px; margin: 1em 0; padding: 1em;">    See the Pen <a href="https://codepen.io/dimaslanjaka/pen/qzgYmp/" rel="noopener noreferer nofollow">      Complete Google recaptcha v3</a> by dimas lanjaka (<a href="https://codepen.io/dimaslanjaka" rel="noopener noreferer nofollow">@dimaslanjaka</a>)     on <a href="https://codepen.io/" rel="noopener noreferer nofollow">CodePen</a>.   </div>  <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script> </div>