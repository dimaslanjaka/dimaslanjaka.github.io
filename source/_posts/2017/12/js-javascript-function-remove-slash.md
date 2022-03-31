---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://thumbs.dreamstime.com/z/javascript-flat-illustration-abstract-design-development-concepts-elements-mobile-web-applications-50893845.jpg
date: 2017-12-27T05:39:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.937+07:00
subtitle: All I needed was to expel every single forward slice in a string
  utilizing Javascript.
tags:
  - JS
  - HTML
title: JS Javascript Function Remove Slash From String
type: post
uuid: 8477ce0f-070e-4888-8dea-7874e23542cc
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://thumbs.dreamstime.com/z/javascript-flat-illustration-abstract-design-development-concepts-elements-mobile-web-applications-50893845.jpg
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://thumbs.dreamstime.com/z/javascript-flat-illustration-abstract-design-development-concepts-elements-mobile-web-applications-50893845.jpg
description: All I needed was to expel every single forward slice in a string
  utilizing Javascript.
excerpt: All I needed was to expel every single forward slice in a string
  utilizing Javascript.
wordcount: 269
---

<img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://thumbs.dreamstime.com/z/javascript-flat-illustration-abstract-design-development-concepts-elements-mobile-web-applications-50893845.jpg" width="100%" title="JavaScript function" alt="JavaScript Function"><div>All I needed was to expel every single forward slice in a string utilizing Javascript. </div><div class="w3-panel w3-center w3-red"><b>Remove <i>Forward Slash</i> <span class="w3-text-green">(/)</span> Using JavaScript Function</b></div><div class="w3-round w3-border w3-light-grey"><pre>function FSlash(func){<br>var x = func,<br> &nbsp; &nbsp;n = x.replace(/\//g,'');<br>return n<br> &nbsp;}<br>//Usage Using Variable<br>var nx = "4x/4/4/5/6/7//532///45/";<br>//Call Variable Into Function Name<br> &nbsp; &nbsp;document.write(FSlash(nx));<br>//You can combine from function too<br></pre><div class="w3-center w3-blue">Demo : <a href="https://codepen.io/dimaslanjaka/embed/dJNZzb" rel="noopener noreferer nofollow">CodePen</a></div></div><div>The vital part to note here is the consistent articulation <kbd>/\//g</kbd>. The bit of the string you need supplanting is composed between the first and last forward cuts – so on the off chance that you needed the word 'work area' supplanted you would compose/work area/g.  <br><br>As the character we need to expel is an uncommon case you need to escape it utilizing an oblique punctuation line, generally the code will read the twofold forward cut as a remark thus quit preparing the line.  <br><br>At last, the <kbd>g</kbd> implies apply the substitution internationally to the string with the goal that all occasions of the substring are supplanted. </div><a name="more"></a><div class="w3-panel w3-center w3-red"><b>Remove <i>Back Slash</i> <span class="w3-text-green">(\)</span> Using JavaScript Function</b></div><div class="w3-round w3-light-grey w3-border"><pre>function BSlash(func){<br>var x = func,<br> &nbsp; &nbsp;n = x.replace(/\\/g, '')<br>return n<br> &nbsp;}<br>//Usage Using Variable<br>var nx = "Dev : \D\i\m\a\s\Www.webmanajemen.com";<br>//Call Variable Into Function Name<br> &nbsp; &nbsp;document.write(BSlash(nx));<br>//You can combine from function too<br></pre><div class="w3-center w3-blue">Demo : <a href="https://jsfiddle.net/arunpjohny/cW62s/" rel="noopener noreferer nofollow">JsFiddle</a></div></div><div class="clear"></div>so an article about "JS Function Remove Slash From String" today. I hope this helps.