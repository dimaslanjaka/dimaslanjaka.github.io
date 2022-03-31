---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.victim-site.com/img/snapshots/websocket.png
date: 2019-07-13T01:38:00.001+07:00
lang: en
location: ""
modified: 2020-02-01T00:40:44.799+07:00
subtitle: "Cara membuat websocket dengan Javascript JS dan PHPUpdate: Simple
  WebsocketRequirements: PHP 5.6 minimumWebsocket merupakan standard"
tags:
  - JS
  - HTML
  - PHP
  - Tips & Tricks
title: "[JS][PHP] Membuat Websocket Javascript"
type: post
uuid: f549c4d8-78f3-4888-87a4-f7bf9d4df5fb
webtitle: WMI Gitlab
updated: 2020-02-01T00:40:44+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.victim-site.com/img/snapshots/websocket.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.victim-site.com/img/snapshots/websocket.png
description: "Cara membuat websocket dengan Javascript JS dan PHPUpdate: Simple
  WebsocketRequirements: PHP 5.6 minimumWebsocket merupakan standard"
excerpt: "Cara membuat websocket dengan Javascript JS dan PHPUpdate: Simple
  WebsocketRequirements: PHP 5.6 minimumWebsocket merupakan standard"
wordcount: 588
---

<div dir="ltr" style="text-align: left;" trbidi="on"><div style="text-align: center;">Cara membuat <b>websocket </b>dengan <b>Javascript (JS)</b> dan <b>PHP</b><br><img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.victim-site.com/img/snapshots/websocket.png"><br><blockquote>Update: <a href="https://www.webmanajemen.com/p/simple-websocket.html">Simple Websocket</a></blockquote></div><blockquote class="tr_bq" style="text-align: left;">Requirements: <br><ol style="text-align: left;"><li>PHP 5.6+ (minimum)&nbsp;</li></ol></blockquote><br>Websocket merupakan standard baru untuk berkomunikasi, dan cocok untuk aplikasi chat, live server, live listener. Hampir sama dengan AJAX namun perbedaannya ada pada kecepatan dan CPU usage pada device client maupun server. Intinya lebih ringan lah.<br>Websocket ini dapat menerima request apapun dan mendistribusikannya secara instant dari perubahan data sebelumnya. Berikut <b>Cara membuat websocket tanpa NODEJS menggunakan Pure Javascript dan PHP:</b><br><br><i>websocket.js</i><br><pre>/** websocket steam */<br>var socket;<br>socket_start(); //start websocket<br><br>function socket_start() {<br>  if (!socket) { //if socket is null<br>    console.log('WebSocket Started'); //start server<br>    socket = socket_server();<br>  }<br>  try {<br>    socket.onopen = function (msg) {<br>      //console.log('socket initialized');<br>    };<br>    socket.onmessage = function (msg) {<br>      var data = JSON.parse(msg.data);<br>      //PARSING RESPONSE DATA<br>    };<br>    socket.onclose = function (msg) {<br>      console.log({ closed: socket });<br>    };<br>  }<br>  catch (ex) {<br>    console.log(ex);<br>  }<br>}<br><br>function socket_server() {<br>  console.log('Socket Initialized');<br>  // <b>Set YOUR PHP FILE URL</b><br>  var host = '/websocket/server.php'; <br>  if (!!window.EventSource) {<br>    var socket = new EventSource(host);<br>  } else {<br>    var socket = new WebSocket(host);<br>  }<br>  return socket;<br>}<br><br>function socket_stop() {<br>  if (socket != null) {<br>    console.log("WebSocket Stopped");<br>    socket.close();<br>    socket = null;<br>  }<br>}<br><br>function socket_check(){<br>  return socket;<br>}<br></pre><br><i>Usage:</i><br><br><ol style="text-align: left;"><li><u>Checking socket:</u>&nbsp;befungsi untuk mengecek apakah socket sudah berjalan atau tidak.</li><pre>if (!socket_check()){<br>  /* Socket tidak berjalan */<br>}<br>--- OR ---<br>if (socket_check() === null){<br>  /* Socket tidak berjalan */<br>}<br>--- OR ---<br>if (socket_check()){<br>  /* Socket berjalan */<br>}<br></pre><li><u>Parsing response data</u></li><pre><br>socket.onmessage = function (msg) { //function socket_start()<br>   var data = JSON.parse(msg.data);<br>   //PARSING RESPONSE DATA DISINI<br>};<br></pre></ol><br><i>server.php</i><pre><br>&lt;?php<br>header('X-Robots-Tag: noindex, nofollow', true);<br>header('Content-Type: text/event-stream');<br>header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');<br>header('Cache-Control: post-check=0, pre-check=0', false);<br>header('Cache-Control: no-cache');<br><br>function SEND($id, $msg)<br>{<br>  echo "id: $id" . PHP_EOL;<br>  $data = trim(json_encode([ //encoding JSON untuk data yang panjang<br>    'array_key' =&gt; 'array_value',<br>  ]));<br>  echo "data: $data" . PHP_EOL;<br>  echo PHP_EOL;<br>  ob_flush();<br>  flush();<br>}<br><br>$serverTime = time();<br><br>SEND($serverTime, 'server time: ' . date('h:i:s', time()));<br>exit;<br></pre></div><blockquote>Update: <a href="https://www.webmanajemen.com/p/simple-websocket.html">Simple Websocket</a></blockquote> <ol><p>Incoming terms:</p><li>javascript</li><li>php</li><li>websocket</li><li>web socket</li><li>simple websocket</li><li>websocket simple</li><li>websocket javascript php</li></ol>