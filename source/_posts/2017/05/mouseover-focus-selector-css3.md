---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://1.bp.blogspot.com/-uaYqOPzmKIk/WPgRWL0wYyI/AAAAAAAAFJU/BSgqP9KOA4gg9ERDx3YEY_tg9r4KTY8LQCLcB/s320/Screenshot_2017-04-20-08-38-25.jpg
date: 2017-05-03T08:40:00.000+07:00
lang: en
location: ""
modified: 2017-05-03T08:40:07.539+07:00
subtitle: Mouseover Focus Selector CSS3 Transitions Code HTML and CSS3
tags:
  - CSS
  - HTML
title: Mouseover  Focus Selector CSS3 Transitions Code HTML and CSS3
type: post
uuid: c719eb89-a6ba-4888-838a-c8a3410fcaf0
webtitle: WMI Gitlab
updated: 2017-05-03T08:40:07+07:00
thumbnail: https://1.bp.blogspot.com/-uaYqOPzmKIk/WPgRWL0wYyI/AAAAAAAAFJU/BSgqP9KOA4gg9ERDx3YEY_tg9r4KTY8LQCLcB/s320/Screenshot_2017-04-20-08-38-25.jpg
photos:
  - https://1.bp.blogspot.com/-uaYqOPzmKIk/WPgRWL0wYyI/AAAAAAAAFJU/BSgqP9KOA4gg9ERDx3YEY_tg9r4KTY8LQCLcB/s320/Screenshot_2017-04-20-08-38-25.jpg
description: Mouseover Focus Selector CSS3 Transitions Code HTML and CSS3
excerpt: Mouseover Focus Selector CSS3 Transitions Code HTML and CSS3
wordcount: 155
---

<h3>Mouseover &amp; Focus Selector CSS3 Transitions Code HTML and CSS3</h3><div class="separator" style="clear: both; text-align: center;"><a href="https://1.bp.blogspot.com/-uaYqOPzmKIk/WPgRWL0wYyI/AAAAAAAAFJU/BSgqP9KOA4gg9ERDx3YEY_tg9r4KTY8LQCLcB/s1600/Screenshot_2017-04-20-08-38-25.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" height="320" src="https://1.bp.blogspot.com/-uaYqOPzmKIk/WPgRWL0wYyI/AAAAAAAAFJU/BSgqP9KOA4gg9ERDx3YEY_tg9r4KTY8LQCLcB/s320/Screenshot_2017-04-20-08-38-25.jpg" width="180"></a><a href="https://4.bp.blogspot.com/-9CqvmBQJqfo/WPgRX84JUUI/AAAAAAAAFJY/ONqUBZjR2sYP00DdPDnJrUCrnkKIYU4pgCLcB/s1600/Screenshot_2017-04-20-08-38-40.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" height="320" src="https://4.bp.blogspot.com/-9CqvmBQJqfo/WPgRX84JUUI/AAAAAAAAFJY/ONqUBZjR2sYP00DdPDnJrUCrnkKIYU4pgCLcB/s320/Screenshot_2017-04-20-08-38-40.jpg" width="180"></a></div><br>HTML: <br><br>Horizontal Tab (Resize auto and auto focus in any device transtition): <br><br><pre>&lt;div class="tab" id="blue"&gt;Blue&lt;/div&gt; <br> &lt;div class="tab" id="green"&gt;Green&lt;/div&gt; <br> &lt;div class="tab" id="yellow"&gt;Yellow&lt;/div&gt; <br> &lt;div class="tab" id="red"&gt;Red&lt;/div&gt; <br></pre>On Form Submissions: <br><br><pre>&lt;input class="searchBar" id="blue" type="text" value="Search"&gt; <br> &lt;br/&gt; <br> &lt;input class="searchBar" id="green" type="text" value="Search"&gt; <br> &lt;br/&gt; <br> &lt;input class="searchBar" id="yellow" type="text" value="Search"&gt; <br> &lt;br/&gt; <br> &lt;input class="searchBar" id="red" type="text" value="Search"&gt; <br></pre>CSS3 of HTML above: <br><br><pre>/* BODY STYLING */ <br><br>body{padding: 50px 50px; background: #fff; font-family:Verdana; color:#2d2d2d; font-weight:100; } <br>hr {color:#2d2d2d; } <br><br> <br></pre><pre>/* EXPANDING SEARCH BAR STARTS HERE */ <br><br> /* Main Styling */ <br><br> input[type=text].searchBar{width:100px;padding:4px 8px;margin-top:10px;color:#fff;font-size:12px;border-radius:10px;border:0;-webkit-transition:all ease-in-out .3s;-moz-transition:all ease-in-out .3s}<br></pre><pre></pre><pre>/* Individual Styling */ <br><br>input[type=text]#blue{background:#0faae4}</pre><pre>input[type=text]#green{background:#5cb85c}</pre><pre>input[type=text]#yellow{background:#f0ad4e}</pre><pre>input[type=text]#red{background:#d9534f}</pre><pre>input[type=text].searchBar:focus{width:165px;outline:0;background:#fff;border:1px solid #999}</pre><pre>/* Individual Styling on Focus */ <br><br> input[type=text]#blue:focus{color:#0faae4; background:#fff; } <br> input[type=text]#green:focus{color:#5cb85c; background:#fff; } <br> input[type=text]#yellow:focus{color:#f0ad4e; background:#fff; } <br> input[type=text]#red:focus{color:#d9534f; background:#fff; } <br></pre><br><pre>/* EXPANDING MOUSE OVER TAB STARTS HERE */ <br>/* Main Styling */ <br><br>div.tab{width:100px;float:left;display:inline-block;padding:4px 8px;color:#fff;font-size:12px;border:0;-webkit-transition:all ease-in-out .3s;-moz-transition:all ease-in-out .3s}<br>/* Individual Styling */<br>div#blue{background:#0faae4;border-radius:10px 0 0 10px}div#green{background:#5cb85c}<br>/* Main Styling On Focus for all */<br>div#yellow{background:#f0ad4e}div#red{background:#d9534f;border-radius:0 10px 10px 0}div.tab:hover{width:165px;outline:0;background:#fff}<br>/* Individual Styling on Focus */<br>div#blue:hover{width:200px;color:#e9e9e9}div#green:hover{color:#e9e9e9;width:165px}div#yellow:hover{width:110px;color:#e9e9e9}div#red:hover{width:140px;color:#e9e9e9}</pre><br><h3><a href="http://codepen.io/dimaslanjaka/full/OmMaJd/" rel="noopener noreferer nofollow">DeMo</a></h3>