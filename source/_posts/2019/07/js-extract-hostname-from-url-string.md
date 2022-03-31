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
date: 2019-07-18T01:21:00.005+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.800+07:00
subtitle: Extract HostnameDomainfrom URL stringfunction extractHostnameurl var
  hostname; //find remove protocol http, ftp, etc. and
tags:
  - JS
title: "[JS] Extract Hostname From URL STRING"
type: post
uuid: 30bbdf65-965f-4888-8a25-5ab1a9e1f484
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Extract HostnameDomainfrom URL stringfunction extractHostnameurl
  var hostname; //find remove protocol http, ftp, etc. and
excerpt: Extract HostnameDomainfrom URL stringfunction extractHostnameurl var
  hostname; //find remove protocol http, ftp, etc. and
wordcount: 113
---

<div dir="ltr" style="text-align: left;" trbidi="on"><b>Extract <u>Hostname</u>/<u>Domain</u>&nbsp;from URL (string)</b><br><b><br></b><pre class="snippet-code-js lang-js prettyprint prettyprinted" style="background-color: #eff0f1; border-radius: 3px; border: 0px; box-sizing: inherit; color: #393318; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; font-stretch: inherit; font-variant-east-asian: inherit; font-variant-numeric: inherit; line-height: inherit; margin-bottom: 1em; max-height: 600px; overflow-wrap: normal; overflow: auto; padding: 12px 8px; vertical-align: baseline; width: auto;"><br><br>function extractHostname(url) {<br>    var hostname;<br>    //find &amp; remove protocol (http, ftp, etc.) and get hostname<br><br>    if (url.indexOf("//") &gt; -1) {<br>        hostname = url.split('/')[2];<br>    }<br>    else {<br>        hostname = url.split('/')[0];<br>    }<br><br>    //find &amp; remove port number<br>    hostname = hostname.split(':')[0];<br>    //find &amp; remove "?"<br>    hostname = hostname.split('?')[0];<br><br>    return hostname;<br>}<br><br>//test the code Press F12<br>console.log("== Testing extractHostname: ==");<br>console.log(extractHostname("http://www.blog.classroom.me.uk/index.php"));<br>console.log(extractHostname("http://www.youtube.com/watch?v=ClkQA2Lb_iE"));<br>console.log(extractHostname("https://www.youtube.com/watch?v=ClkQA2Lb_iE"));<br>console.log(extractHostname("www.youtube.com/watch?v=ClkQA2Lb_iE"));<br>console.log(extractHostname("ftps://ftp.websitename.com/dir/file.txt"));<br>console.log(extractHostname("websitename.com:1234/dir/file.txt"));<br>console.log(extractHostname("ftps://websitename.com:1234/dir/file.txt"));<br>console.log(extractHostname("example.com?param=value"));<br>console.log(extractHostname("https://facebook.github.io/jest/"));<br>console.log(extractHostname("//youtube.com/watch?v=ClkQA2Lb_iE"));<br>console.log(extractHostname("http://localhost:4200/watch?v=ClkQA2Lb_iE"));<br><br></pre></div>