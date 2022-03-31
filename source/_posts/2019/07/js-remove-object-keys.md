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
date: 2019-07-18T02:14:00.002+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:18.023+07:00
subtitle: "pre><br />var thisIsObject= <br /> apos;Cowapos; : apos;Mooapos;,<br
  /> apos;Catapos; : apos;Meowapos;,<br />"
tags:
  - JS
title: "[JS] Remove Object Keys"
type: post
uuid: ff3f29ce-21be-4888-8a47-11903673c0a9
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:18+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: "pre><br />var thisIsObject= <br /> apos;Cowapos; :
  apos;Mooapos;,<br /> apos;Catapos; : apos;Meowapos;,<br />"
excerpt: "pre><br />var thisIsObject= <br /> apos;Cowapos; : apos;Mooapos;,<br
  /> apos;Catapos; : apos;Meowapos;,<br />"
wordcount: 71
---

<pre><br>var thisIsObject= {<br>    'Cow' : 'Moo',<br>    'Cat' : 'Meow',<br>    'Dog' : 'Bark'<br>};<br>try {<br>  delete thisIsObject['Cow'];<br>} catch(e){<br>  thisIsObject.cow = undefined;<br>}<br>//test using developer tools F12<br>console.log(thisIsObject);<br></pre> <b>Output</b> <pre><br>=&gt; {Cat: "Meow", Dog: "Bark"}<br></pre> <b>Wrapping in function for <i>Easy Use</i></b> <pre><br>function delkey(obj, key){<br>  try {<br>    delete obj[key];<br>  } catch(e){<br>    obj[key] = undefined;<br>  }<br>  return obj;<br>}<br></pre> <b>Test Wrapped function</b><pre><br>var thisIsObject= {<br>    'Cow' : 'Moo',<br>    'Cat' : 'Meow',<br>    'Dog' : 'Bark'<br>};<br><br>//test using developer tools F12<br>console.log(delkey(thisIsObject, 'Cow'));<br></pre> <b>Output wrapped function</b> <pre><br>=&gt; {Cat: "Meow", Dog: "Bark"}<br></pre>