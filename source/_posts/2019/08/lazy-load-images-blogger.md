---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://imgdb.net/images/5963.png
date: 2019-08-01T00:05:00.000+07:00
lang: en
location: ""
modified: 2019-08-01T00:05:01.092+07:00
subtitle: Lazy load images bloggerlazy loading blogger berguna untuk Mempercepat
  laman webMeningkatkan rating pagespeedHTML Usage<img alt=
tags:
  - JS
title: Lazy load images blogger
type: post
uuid: 2314fa90-b3fc-4888-8acc-cc21e65058ad
webtitle: WMI Gitlab
updated: 2019-08-01T00:05:01+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://imgdb.net/images/5963.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://imgdb.net/images/5963.png
description: Lazy load images bloggerlazy loading blogger berguna untuk
  Mempercepat laman webMeningkatkan rating pagespeedHTML Usage<img alt=
excerpt: Lazy load images bloggerlazy loading blogger berguna untuk Mempercepat
  laman webMeningkatkan rating pagespeedHTML Usage<img alt=
wordcount: 533
---

<div dir="ltr" style="text-align: left;" trbidi="on"><figure>  <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://imgdb.net/images/5963.png" alt="Lazy load images blogger" style="width:100%">  <figcaption>Lazy load images blogger</figcaption></figure><br><ol style="text-align: left;">lazy loading blogger berguna untuk : <li>Mempercepat laman web</li><li>Meningkatkan rating pagespeed</li></ol><div><b>HTML (Usage)</b><pre><br>&lt;img alt='' data-src='https://lh3.googleusercontent.com/proxy/FCTXDOBcEj5ojJZCa5wsRX4hG0C1qod8MXxYlCcvUGT7EGMROVrUqXFf0LAuxtvvRaFKPr3mn-yUl3dMZj_ygE--d2lPheO6CSUofHexbWd1LQ6NV4NbJCReDlMs=w72-h58-p-k-no-nu' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXz8/SVuXQoAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=='/&gt;<br></pre><blockquote style="overflow:auto"><ul><li>src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXz8/SVuXQoAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==' : source gambar dengan resolusi paling rendah</li><li>data-src='https://lh3.googleusercontent.com/proxy/FCTXDOBcEj5ojJZCa5wsRX4hG0C1qod8MXxYlCcvUGT7EGMROVrUqXFf0LAuxtvvRaFKPr3mn-yUl3dMZj_ygE--d2lPheO6CSUofHexbWd1LQ6NV4NbJCReDlMs=w72-h58-p-k-no-nu' : source gambar asli</li></ul></blockquote></div><div><b>JS (taruh diatas <i>&lt;/body&gt;</i>)</b><pre><br>&lt;script&gt;<br>//&lt;![CDATA[<br>const config = {<br>  rootMargin: '0px 0px 50px 0px',<br>  threshold: 0<br>};<br>const imgs = document.querySelectorAll('[data-src]');<br><br>if (typeof intersectionObserver != 'undefined') {<br>  // register the config object with an instance<br>  // of intersectionObserver<br>  let observer = new intersectionObserver(function (entries, self) {<br>    // iterate over each entry<br>    entries.forEach(entry =&gt; {<br>      // process just the images that are intersecting.<br>      // isIntersecting is a property exposed by the interface<br>      if (entry.isIntersecting) {<br>        // custom function that copies the path to the img<br>        // from data-src to src<br>        preloadImage(entry.target);<br>        // the image is now in place, stop watching<br>        self.unobserve(entry.target);<br>      }<br>    });<br>  }, config);<br>  <br>  imgs.forEach(img =&gt; {<br>    observer.observe(img);<br>  });<br>} else {<br>  imgs.forEach(img =&gt; {<br>    preloadImage(img)<br>  });<br>}<br><br>function preloadImage(e) {<br>  var a = e.getAttribute('src'), b = e.getAttribute('data-src');<br>  if (b.trim() != ''){<br>    e.src = b.trim();<br>  }<br>}<br>]]&gt;<br>&lt;/script&gt;<br></pre></div><b>FULL DEMO</b><p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="dimaslanjaka" data-slug-hash="pMRowj" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pure javascript lazy load images">  <span>See the Pen <a href="https://codepen.io/dimaslanjaka/pen/pMRowj/" rel="noopener noreferer nofollow">  Pure javascript lazy load images</a> by dimas lanjaka (<a href="https://codepen.io/dimaslanjaka" rel="noopener noreferer nofollow">@dimaslanjaka</a>)   on <a href="https://codepen.io" rel="noopener noreferer nofollow">CodePen</a>.</span></p><script async="" src="https://static.codepen.io/assets/embed/ei.js"></script></div>