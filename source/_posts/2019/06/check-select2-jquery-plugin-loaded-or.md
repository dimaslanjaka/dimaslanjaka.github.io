---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://laraget.com/images/blog/1482184906-Select2.png
date: 2019-06-26T11:20:00.002+07:00
lang: en
location: ""
modified: 2020-01-20T04:37:48.611+07:00
subtitle: Example How to change select2 jQuery plugin using jQuery.val
tags:
  - JS
  - Tips & Tricks
title: "[JS] Check select2 jquery plugin loaded or not"
type: post
uuid: 41c07fdd-3aba-4888-8fef-f72db6aa6221
webtitle: WMI Gitlab
updated: 2020-01-20T04:37:48+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://laraget.com/images/blog/1482184906-Select2.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://laraget.com/images/blog/1482184906-Select2.png
description: Example How to change select2 jQuery plugin using jQuery.val
excerpt: Example How to change select2 jQuery plugin using jQuery.val
wordcount: 93
---

<img border="0" src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://laraget.com/images/blog/1482184906-Select2.png" data-original-width="750" data-original-height="430"><i>Read <a href="https://web-manajemen.blogspot.com/2019/07/defer-loading-css-js.html" target="_blank" rel="follow">How to async defer CSS JS perfectly</a></i><pre><br>if (jQuery.fn.select2) { //jquery select2 loaded or not false or not undefined =&gt; return array<br>  jQuery.fn.select2.defaults.set( "theme", "bootstrap" ); //then select themes<br>}<br></pre><p>Example: How to change select2 jQuery plugin using jQuery.val()</p><pre><br>  $('#mySelect2').val('US'); // Change the value or make some change to the internal state<br>if (jQuery.fn.select2) {<br>  $('#mySelect2').trigger('change.select2'); // Notify only Select2 of changes<br>}<br></pre>