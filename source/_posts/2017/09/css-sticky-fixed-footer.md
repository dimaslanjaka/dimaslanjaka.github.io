---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2017-09-06T13:47:00.000+07:00
lang: en
location: ""
modified: 2017-09-06T16:43:20.476+07:00
subtitle: Header
tags:
  - CSS
title: CSS Sticky Fixed Footer
type: post
uuid: 09ccd22c-2402-4888-8b50-beca1a541934
webtitle: WMI Gitlab
updated: 2017-09-06T16:43:20+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Header
excerpt: Header
wordcount: 59
---

<h4>The CSS</h4><pre>#footer {<br>position:fixed;<br>left:0px;<br>bottom:0px;<br>height:30px;<br>width:100%;<br>background:#999;<br>}<br>/* IE 6 */<br>* html #footer {<br>position:absolute;<br>top:expression((0-(footer.offsetHeight)+(document.documentElement.clientHeight<br>? document.documentElement.clientHeight :<br>document.body.clientHeight)+(ignoreMe =<br>document.documentElement.scrollTop ?<br>document.documentElement.scrollTop :<br>document.body.scrollTop))+'px');<br>}<br></pre><h3>Demo:</h3><i>Check This Footer Page</i><br><style amp-custom="" type="text/css">#tall,.tall{height:50px;background:salmon} div#footer.example { position:fixed; left:0px; bottom:0px; height:30px; width:100%; background:#999; } /* IE 6 */ * html div#footer.example { position:absolute; top:expression((0-(footer.offsetHeight)+(document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight)+(ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop))+'px'); } .translate,#translate{display:none} </style><br><div id="tall">Header</div><div id="tall">Content</div><b>THE STICKY WILL BE APPEARED ON BOTTOM THIS PAGE</b><br><div class="example" id="footer">Footer Sticky</div><div id="tall">Additional Content</div><br><b>Done.</b> <i>I Hope this article (CSS sticky Fixed Footer) be help you</i><br><br><b>Incoming Terms:</b> <i>CSS Sticky Footer | Fixed Footer | CSS Sticky Bottom Page | Sticky Bottom Fixed | Sticky Fixed Bottom | CSS Sticky</i>