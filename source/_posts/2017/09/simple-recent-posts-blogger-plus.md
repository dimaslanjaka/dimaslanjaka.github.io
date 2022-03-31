---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://4.bp.blogspot.com/-M7b7TGI5AZI/WaRRhUHpaMI/AAAAAAAAABs/6QHVYugtOzwTqYJqNN7FkWZM_MOl83csACLcBGAs/s320/Screenshot_2017-08-29-00-22-36-950_com.android.chrome.png
date: 2017-09-12T00:23:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.811+07:00
subtitle: Simple Recent Posts Blogger Plus Thumbnails
tags:
  - JS
  - Blogger
  - HTML
  - Blogging
  - Social Media
  - Tips & Tricks
title: Simple Recent Posts Blogger Plus Thumbnails
type: post
uuid: 7c4871bb-f958-4888-8f73-1105aa764934
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://4.bp.blogspot.com/-M7b7TGI5AZI/WaRRhUHpaMI/AAAAAAAAABs/6QHVYugtOzwTqYJqNN7FkWZM_MOl83csACLcBGAs/s320/Screenshot_2017-08-29-00-22-36-950_com.android.chrome.png
photos:
  - https://4.bp.blogspot.com/-M7b7TGI5AZI/WaRRhUHpaMI/AAAAAAAAABs/6QHVYugtOzwTqYJqNN7FkWZM_MOl83csACLcBGAs/s320/Screenshot_2017-08-29-00-22-36-950_com.android.chrome.png
description: Simple Recent Posts Blogger Plus Thumbnails
excerpt: Simple Recent Posts Blogger Plus Thumbnails
wordcount: 90
---

Installing a recent post widget is one way to minimize bounce rate blog by providing information for the latest posts on readers.  With so readers will easily find the most warm posts on the blog.<br><div class="separator" style="clear: both; text-align: center;"><a href="https://4.bp.blogspot.com/-M7b7TGI5AZI/WaRRhUHpaMI/AAAAAAAAABs/6QHVYugtOzwTqYJqNN7FkWZM_MOl83csACLcBGAs/s1600/Screenshot_2017-08-29-00-22-36-950_com.android.chrome.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="1600" data-original-width="900" height="320" src="https://4.bp.blogspot.com/-M7b7TGI5AZI/WaRRhUHpaMI/AAAAAAAAABs/6QHVYugtOzwTqYJqNN7FkWZM_MOl83csACLcBGAs/s320/Screenshot_2017-08-29-00-22-36-950_com.android.chrome.png" width="180"></a></div><br>Many kinds of recent post widgets like recent posts or recent carousel shaped posts. Well this time I will share a blogger widget recent posts are quite simple and stored in the sidebar blog.  In addition to simple, recent posts widget has a fairly light loading, so you need to try also hehehe ...<br><br><center><b>Demo</b></center><script async="" src="//jsfiddle.net/dimaslanjaka/c01de4w7/embed/result/"></script><noscript><iframe width="100%" height="500" src="//jsfiddle.net/dimaslanjaka/c01de4w7/embedded/result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe></noscript>If you are interested to try it, please follow the steps below.<br>Please save the following CSS code above <mark>&lt;/head&gt;</mark> code (you may need to customize some sections to customize it to the theme you are using). <br><pre>&lt;style&gt;<br>/*&lt;![CDATA[*/<br>ul#recent-posts{width:100%;margin:0 auto;padding:0!important;list-style-type:none}<br>ul#recent-posts li{background:#FFF;padding:0!important;margin-bottom:10px;overflow:hidden;width:100%;height:auto;-webkit-box-shadow:2px 2px 3px rgba(0,0,0,.05);-o-box-shadow:2px 2px 3px rgba(0,0,0,.05);-ms-box-shadow:2px 2px 3px rgba(0,0,0,.05);box-shadow:2px 2px 3px rgba(0,0,0,.05);}<br>ul#recent-posts li img{width:90px;height:70px;margin:0 10px 0 0;float:left;}<br>ul#recent-posts li .title_post{padding:10px!important;line-height: 1;position:relative;margin-left:90px;}<br>ul#recent-posts li a{color:#333;font-family:inherit;font-size:14px;font-weight:500;text-decoration:none}<br>ul#recent-posts li a:hover{color:#FF1744;}<br>ul#recent-posts:after{content:"";display:block;clear:both}<br>/*]]&gt;*/<br>&lt;/style&gt;</pre>Then please save the following javascript code above code <mark>&lt;/body&gt;.</mark><br><pre>&lt;script type='text/javascript'&gt;<br>//&lt;![CDATA[<br>var homePage = window.location.origin,numPosts = <b><mark>5</mark></b>;<br>function downloadJSAtOnload(){var d=document.createElement("script");d.src="https://cdn.rawgit.com/KompiAjaib/kompi-js/master/recent_post_with_thumbnail.js",document.body.appendChild(d)}window.addEventListener?window.addEventListener("load",downloadJSAtOnload,!1):window.attachEvent?window.attachEvent("onload",downloadJSAtOnload):window.onload=downloadJSAtOnload;<br>//]]&gt;<br>&lt;/script&gt;</pre>Listing 5 on marked text above had a function to set the number of posts displayed.<br><hr>Lastly please save the following code in the sidebar through the layout / layout on the gadget HTML / JavaScript.<br><pre style="background: rgb(51, 51, 51); border-left: 3px solid rgb(252, 194, 140); color: #fcc28c; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, monospace; font-size: 14px; line-height: 1.3em; margin: 10px auto; max-width: 100%; overflow: auto; padding: 8px 10px; user-select: all; white-space: initial; word-break: normal;"><code style="font-family: Consolas, Monaco, &quot;Andale Mono&quot;, monospace; line-height: 1.3em; white-space: initial; word-break: normal; word-spacing: normal;">&lt;ul id="recent-posts"&gt;&lt;/ul&gt;</code></pre>Done, good luck. <br><hr>So today article about Simple Recent Posts Blogger Plus Thumbnails hopefully help and solve your problem.