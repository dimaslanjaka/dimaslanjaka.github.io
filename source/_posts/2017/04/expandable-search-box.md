---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://3.bp.blogspot.com/-fCN06ibkF9s/WPgDaZnEMdI/AAAAAAAAFJE/gFcoSLZVZeQ2rpoUkl-KFH5E9004wBHmgCLcB/s320/Screenshot_2017-04-20-07-39-35.jpg
date: 2017-04-20T09:40:00.000+07:00
lang: en
location: ""
modified: 2017-04-23T16:10:41.022+07:00
subtitle: Expandable Search Box
tags:
  - CSS
  - HTML
title: Expandable Search Box
type: post
uuid: bfb7bbf0-42d5-4888-8b54-583cfa3b4b30
webtitle: WMI Gitlab
updated: 2017-04-23T16:10:41+07:00
thumbnail: https://3.bp.blogspot.com/-fCN06ibkF9s/WPgDaZnEMdI/AAAAAAAAFJE/gFcoSLZVZeQ2rpoUkl-KFH5E9004wBHmgCLcB/s320/Screenshot_2017-04-20-07-39-35.jpg
photos:
  - https://3.bp.blogspot.com/-fCN06ibkF9s/WPgDaZnEMdI/AAAAAAAAFJE/gFcoSLZVZeQ2rpoUkl-KFH5E9004wBHmgCLcB/s320/Screenshot_2017-04-20-07-39-35.jpg
description: Expandable Search Box
excerpt: Expandable Search Box
wordcount: 430
---

Expandable search form using html and CSS.<br><div><div class="separator" style="clear: both; text-align: center;"><a href="https://3.bp.blogspot.com/-fCN06ibkF9s/WPgDaZnEMdI/AAAAAAAAFJE/gFcoSLZVZeQ2rpoUkl-KFH5E9004wBHmgCLcB/s1600/Screenshot_2017-04-20-07-39-35.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" height="320" src="https://3.bp.blogspot.com/-fCN06ibkF9s/WPgDaZnEMdI/AAAAAAAAFJE/gFcoSLZVZeQ2rpoUkl-KFH5E9004wBHmgCLcB/s320/Screenshot_2017-04-20-07-39-35.jpg" width="180"></a></div><br></div><div>&nbsp; &nbsp;HTML:<br><br><pre><code class="highlight">&lt;form action="<span style="color: red;">/search</span>" method="GET" target="<span style="color: red;">_top</span>" class="Search"&gt;<br>&nbsp; <br>&nbsp; &nbsp; &lt;label class="icon fa fa-search" for="search"&gt;&lt;/label&gt;<br>&nbsp; &nbsp; &lt;input type="text" placeholder="Search" class="underline" name="<span style="color: red;">q</span>" id="search"&gt;<br>&lt;/form&gt;</code></pre><br>HTML Explanation:<br><br>action"/search" -&gt; search results page target<br>target="_top" -&gt; Open new window (remove this if you want open the search results it self)<br>name="q" -&gt; Query search results example https://yourdomain/search?q=keyword<br><br>&nbsp; &nbsp; CSS:<br><br><pre><code class="highlight">.Search {<br><span class="Apple-tab-span" style="white-space: pre;"> </span>float: right;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>padding: 15px 40px 15px 0px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>position: relative;<br>}<br>.Search input {<br><span class="Apple-tab-span" style="white-space: pre;"> </span>background: #252525;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>font-size: 1.5em;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>font-weight: 300;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>height: 50px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>position: relative;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>text-indent: 46px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>width: 45px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>border: none;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>transition: width 1s;<br>}<br>::-webkit-input-placeholder {<br><span class="Apple-tab-span" style="white-space: pre;"> </span>color: #fff;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>box-shadow: &nbsp;45px 1px 0 0 #fff;<br>}<br>.Search input:active,<br>.Search input:focus {<br><span class="Apple-tab-span" style="white-space: pre;"> </span>font-size: 1.6em;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>font-weight: 300;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>height: 50px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>position: relative;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>text-indent: 46px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>width: 450px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>border-bottom: #fff solid 1px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>transition: width 1s;<br>}<br>.Search .icon {<br><span class="Apple-tab-span" style="white-space: pre;"> </span>color: #fff;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>font-size: 1.6em;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>height: 50px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>width: 45px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>left: 10px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>position: absolute;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>top: 30px;<br><span class="Apple-tab-span" style="white-space: pre;"> </span>z-index: 1;<br>}</code></pre><br>Demo -&gt;&nbsp;<a href="http://codepen.io/dimaslanjaka/full/WjrazP/" rel="noopener noreferer nofollow" target="_blank">codepen.io</a></div>