---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://imgdb.net/images/3192.jpg
date: 2017-09-13T14:55:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.881+07:00
subtitle: How to Create a Sticky Widget in Blog Sidebar
tags:
  - CSS
  - JS
  - Blogger
title: How to create sticky widget on sidebar blogger
type: post
uuid: bb943112-1738-4888-8824-d420c024992b
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://imgdb.net/images/3192.jpg
photos:
  - https://imgdb.net/images/3192.jpg
description: How to Create a Sticky Widget in Blog Sidebar
excerpt: How to Create a Sticky Widget in Blog Sidebar
wordcount: 512
---

<img height="206" src="https://imgdb.net/images/3192.jpg" width="400"><br>In the previous article I once shared a tutorial on Installing Sticky Functions<br><strong>  On Blogger Widgets</strong>, this time I will share a tutorial with the same function that is to make a particular widget sticky or float following the page when scrolled down and up. This tutorial is an improvement as well as answering your comment from the previous tutorial which when the page is scrolled down sticky widget will pass the Footer Wrapper and it will be a bit annoying because it blocks the widgets that are installed in the Footer area.<br><br>I will share this code more suitable to be installed on all content in Sidebar or can also be installed on one particular widget. For buddy who want to try it, please follow tutorial<strong>&nbsp;How to Make Sticky Widget in Sidebar Blog</strong>.<br><img height="211" src="https://imgdb.net/images/3193.jpg" width="400"><br><h4 style="background-color: white; border-color: rgb(21, 21, 21) rgb(21, 21, 21) rgb(224, 224, 224); border-style: none none solid; border-width: 0px 0px 2px; color: #151515; font-family: Roboto, sans-serif, sans-serif-light, sans-serif; font-size: 18px; font-weight: 500; margin: 0px 0px 10px; padding: 10px 0px; word-wrap: break-word;"><span class="notranslate" style="border: 0px none rgb(21, 21, 21);"><b style="border: 0px none rgb(21, 21, 21);">How to Create a Sticky Widget in Blog Sidebar</b></span></h4><br style="background-color: white; border: 0px none rgb(21, 21, 21); color: #151515; font-family: Roboto, sans-serif, sans-serif-light, sans-serif; font-size: 15px; line-height: 25.5px;"><span class="notranslate" style="background-color: white; border: 0px none rgb(21 , 21 , 21); color: #151515; font-family: &quot;roboto&quot; , sans-serif , , sans-serif; font-size: 15px; line-height: 25.5px;">1. Login to Blogger --&gt; Go to Template editor --&gt;</span><b>&nbsp;Put below script before <kbd>&lt;/body&gt;</kbd> tag</b><br><pre>&lt;script type='text/javascript'&gt;<br>//&lt;![CDATA[<br>$(function() {<br>  if ($('<kbd class="blue">#sticky-sidebar</kbd>').length) { // <kbd class="yellow">Change "#sticky-sidebar" with spesific ID or Change to <mark>Your ID Widgets</mark></kbd><br>    var el = $('<kbd class="blue">#sticky-sidebar</kbd>');<br>    var stickyTop = $('<kbd class="blue">#sticky-sidebar</kbd>').offset().top;<br>    var stickyHeight = $('<kbd class="blue">#sticky-sidebar</kbd>').height();<br>    $(window).scroll(function() {<br>      var limit = $('<kbd class="red">#footer-wrapper</kbd>').offset().top - stickyHeight - 20; // <kbd class="yellow">Distance stops at "#footer-wrapper"</kbd><br>      var windowTop = $(window).scrollTop();<br>      if (stickyTop &lt; windowTop) {<br>        el.css({<br>          position: 'fixed',<br>          top: 20 // <kbd class="yellow">Distance of margin from top</kbd><br>        });<br>      } else {<br>        el.css('position', 'static');<br>      }<br>      if (limit &lt; windowTop) {<br>        var diff = limit - windowTop;<br>        el.css({<br>          top: diff<br>        });<br>      }<br>    });<br>  }<br>});<br>//]]&gt;<br>&lt;/script&gt;</pre>Notice the code marked, replace the code with the ID to be made sticky&nbsp;according to the template used<br><blockquote>NOTE: #sticky-sidebar: ID of the content or widget to be made sticky<br>#footer-wrapper: Specify the ID to limit the sticky function</blockquote>Next add the width to the content or widget that is made sticky with CSS.&nbsp;Suppose here I give 300px for sticky width, for example:<br><pre>#sticky-sidebar{width:100%;max-width:300px}</pre><b>Or:</b><br><pre>#ID_WIDGET{width:100%;max-width:300px}</pre>Determine the width according to the width of the sidebar of the template you use and also do not forget to replace the width on a particular query media, for example<br><pre>@media only screen and (max-width:768px){<br>#sticky-sidebar{width:100%;max-width:100%}<br>}</pre><br><center><button><a href="https://l3n4r0x.cf/source/php/codepen.php?user=arlinadesign&amp;id=OMXaYb&amp;tab=result&amp;h=500" rel="noopener noreferer nofollow">DEMO</a></button></center>