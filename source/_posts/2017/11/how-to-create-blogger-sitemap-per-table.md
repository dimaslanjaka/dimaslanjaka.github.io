---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://4.bp.blogspot.com/-0ALg8SCnD24/VSsqzL7AxJI/AAAAAAAACOQ/4w_tFyoUEVo/s1600/Menerapkan%2BDaftar%2Bisi%2BMenurut%2BLabel.png
date: 2017-11-16T19:34:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.904+07:00
subtitle: h2>Stylish blogger sitemap per tables</h2><img
tags:
  - CSS
  - JS
  - Blogger
title: How to create blogger sitemap per tables 100 Worked
type: post
uuid: 23bc6fee-c977-4888-8e75-1cdba59c78e1
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://4.bp.blogspot.com/-0ALg8SCnD24/VSsqzL7AxJI/AAAAAAAACOQ/4w_tFyoUEVo/s1600/Menerapkan%2BDaftar%2Bisi%2BMenurut%2BLabel.png
photos:
  - https://4.bp.blogspot.com/-0ALg8SCnD24/VSsqzL7AxJI/AAAAAAAACOQ/4w_tFyoUEVo/s1600/Menerapkan%2BDaftar%2Bisi%2BMenurut%2BLabel.png
description: h2>Stylish blogger sitemap per tables</h2><img
excerpt: h2>Stylish blogger sitemap per tables</h2><img
wordcount: 242
---

<h2>Stylish blogger sitemap per tables</h2><img src="https://4.bp.blogspot.com/-0ALg8SCnD24/VSsqzL7AxJI/AAAAAAAACOQ/4w_tFyoUEVo/s1600/Menerapkan%2BDaftar%2Bisi%2BMenurut%2BLabel.png"><br><b>Tutorial Create Blogger Sitemap Per Tables:</b><br><ol><li>Open dashboard <i>blogger.</i></li><li>Navigate to pages tab</li><li>Create <i>New Page</i></li><li>Enter the code below in html editor mode</li></ol><pre>&lt;div-wrapper id='wrapper'&gt;&lt;div-wrapper dir="ltr" style="text-align:left;" trbidi="on"&gt;&lt;div-wrapper class="table-of-content" id="table-of-content"&gt;&lt;div-wrapper class="loading"&gt;&lt;img class='loading' src='https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.amcsscentry.gov.in/asset/images/please_wait.gif'&gt;&lt;/div-wrapper&gt;&lt;/div-wrapper&gt;&lt;/div-wrapper&gt;&lt;div-wrapper&gt;&lt;script async='async' custom-element='div-wrapper' src='https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js'&gt;&lt;/script&gt;<br>&lt;link href='https://codepen.io/dimaslanjaka/pen/eWWzrL.css' rel='stylesheet'&gt;<br>&lt;style type="text/css"&gt;<br>#comments{visibility; hidden; display:none;}<br>&lt;/style&gt;<br>&lt;script&gt;<br>var toc_config = {<br>    url: 'https://www.webmanajemen.com/',<br>    containerId: 'table-of-content',<br>    showNew: 15,<br>    newText: ' &lt;strong style="font-weight:normal;font-style:normal;color:#fff;font-size:11px;background:#5c5a78;padding:1px 6px 3px 6px;line-height:normal;float:right;border-radius:3px;"&gt;baru&lt;/strong&gt;',<br>    sortAlphabetically: {<br>        thePanel: true,<br>        theList: true<br>    },<br>    maxResults: 9999,<br>    activePanel: 1,<br>    slideSpeed: {<br>        down: 400,<br>        up: 400<br>    },<br>    slideEasing: {<br>        down: null,<br>        up: null<br>    },<br>    slideCallback: {<br>        down: function() {},<br>        up: function() {}<br>    },<br>    clickCallback: function() {},<br>    jsonCallback: '_toc',<br>    delayLoading: 0<br>};<br><br>!function(e,o){var t=o.getElementById(toc_config.containerId),c=o.getElementsByTagName("head")[0],n=[];e[toc_config.jsonCallback]=function(e){for(var o,c,i=e.feed.entry,a=e.feed.category,l="",s=0,d=a.length;d&gt;s;++s)n.push(a[s].term);for(var r=0,f=i.length;f&gt;r;++r)(toc_config.showNew||toc_config.showNew&gt;0)&amp;&amp;r&lt;toc_config.showNew+1&amp;&amp;(i[r].title.$t+=" %new%");i=toc_config.sortAlphabetically.theList?i.sort(function(e,o){return e.title.$t.localeCompare(o.title.$t)}):i,toc_config.sortAlphabetically.thePanel&amp;&amp;n.sort();for(var g=0,h=n.length;h&gt;g;++g){l+='&lt;h3 class="toc-header"&gt;'+n[g]+"&lt;/h3&gt;",l+='&lt;div class="toc-content"&gt;&lt;ol&gt;';for(var _=0,p=i.length;p&gt;_;++_){o=i[_].title.$t;for(var w=0,u=i[_].link.length;u&gt;w;++w)if("alternate"==i[_].link[w].rel){c=i[_].link[w].href;break}for(var v=0,m=i[_].category.length;m&gt;v;++v)n[g]==i[_].category[v].term&amp;&amp;(l+='&lt;li&gt;&lt;a rel="nofollow" rel="noreferrer"href="'+c+'"&gt;'+o.replace(/ \%new\%$/,"")+"&lt;/a&gt;"+(o.match(/\%new\%/)?" "+toc_config.newText:"")+"&lt;/li&gt;")}l+="&lt;/ol&gt;&lt;/div&gt;"}t.innerHTML=l,"undefined"!=typeof jQuery&amp;&amp;($("#"+toc_config.containerId+" .toc-content").hide(),$("#"+toc_config.containerId+" .toc-header").click(function(){$(this).hasClass("active")||(toc_config.clickCallback(this),$("#"+toc_config.containerId+" .toc-header").removeClass("active").next().slideUp(toc_config.slideSpeed.up,toc_config.slideEasing.up,toc_config.slideCallback.up),$(this).addClass("active").next().slideDown(toc_config.slideSpeed.down,toc_config.slideEasing.down,toc_config.slideCallback.down))}).eq(toc_config.activePanel-1).addClass("active").next().slideDown(toc_config.slideSpeed.down,toc_config.slideEasing.down,toc_config.slideCallback.down))};var i=o.createElement("script");i.src=toc_config.url.replace(/\/$/,"")+"/feeds/posts/summary?alt=json-in-script&amp;max-results="+toc_config.maxResults+"&amp;callback="+toc_config.jsonCallback,"onload"==toc_config.delayLoading?e.onload=function(){c.appendChild(i)}:e.setTimeout(function(){c.appendChild(i)},toc_config.delayLoading)}(window,document);<br>  &lt;/script&gt;</pre><b>DEMO:</b><br><amp-iframe frameborder="0" height="800" layout="fixed-height" scrolling="yes" src="https://source.l3n4r0x.cf/php/codepen.php?user=dimaslanjaka&amp;id=WjjGda&amp;tab=result&amp;h=800"></amp-iframe><br><br><b><i>OR:</i></b> <a alt="DEMO" href="https://web-manajemen.blogspot.jp/p/test-sitemap.html" rel="follow" title="DEMO">Click Here</a>. I've made demo on my page.<br><b>Dont forget share this article</b><br><b>Incoming Terms:</b><br><i></i><br><ol><li><i>How to create blogger sitemap per tables</i></li><li><i>How to make blogger sitemap per tables</i></li><li><i>Blogger sitemap tables tab style</i></li><li><i>Stylish blogger sitemap with tables tab style</i></li><li><i>Blogger sitemap per tables</i></li><li><i>How to create sitemap per tables on blogger 100% Worked.</i></li></ol>