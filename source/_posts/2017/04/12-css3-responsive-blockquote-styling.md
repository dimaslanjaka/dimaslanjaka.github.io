---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUtlynMMhFXVKgaLk8lcOo_X_6ZTtwmffeOl4rVh8h-EJtJejQ
date: 2017-04-27T23:29:00.000+07:00
lang: en
location: ""
modified: 2017-04-27T23:34:14.307+07:00
subtitle: img height=280
  src=https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUtlynMMhFXVKgaLk8lcOo_X_6ZTtwmffeOl4rVh8h-EJtJejQ
tags:
  - CSS
title: 12 CSS3 Responsive Blockquote Styling
type: post
uuid: a4ec1529-dca6-4888-8cfe-87e5ebd28f80
webtitle: WMI Gitlab
updated: 2017-04-27T23:34:14+07:00
thumbnail: https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUtlynMMhFXVKgaLk8lcOo_X_6ZTtwmffeOl4rVh8h-EJtJejQ
photos:
  - https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUtlynMMhFXVKgaLk8lcOo_X_6ZTtwmffeOl4rVh8h-EJtJejQ
description: img height=280
  src=https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUtlynMMhFXVKgaLk8lcOo_X_6ZTtwmffeOl4rVh8h-EJtJejQ
excerpt: img height=280
  src=https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUtlynMMhFXVKgaLk8lcOo_X_6ZTtwmffeOl4rVh8h-EJtJejQ
wordcount: 551
---

<img height="280" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUtlynMMhFXVKgaLk8lcOo_X_6ZTtwmffeOl4rVh8h-EJtJejQ" width="320"><br>Today i want to reshare css3 for styling blockquote.<br><br><pre>/* <br>// 12 - CSS3 Blockquote Effects Demo<br>// Made with ❤ by @Pawan_Mall<br>// http://www.web-manajemen.blogspot.jp <br>*/<br><br>@import url('http://fonts.googleapis.com/css?family=Montez');<br>@import url(http://fonts.googleapis.com/css?family=Francois+One);<br><br>body{<br>  background: #f5f7fa;<br>  margin:10px;<br>  padding:10px;  <br>}<br><br>blockquote{<br>  display:block;<br>  background: #fff;<br>  padding: 15px 20px 15px 45px;<br>  margin: 0 0 20px;<br>  position: relative;<br>  <br>  /*Font*/<br>  font-family: Georgia, serif;<br>  font-size: 14px;<br>  line-height: 1.2;<br>  color: #666;<br><br>  /*Box Shadow - (Optional)*/<br>  -moz-box-shadow: 2px 2px 15px #ccc;<br>  -webkit-box-shadow: 2px 2px 15px #ccc;<br>  box-shadow: 2px 2px 15px #ccc;<br><br>  /*Borders - (Optional)*/<br>  border-left-style: solid;<br>  border-left-width: 15px;<br>  border-right-style: solid;<br>  border-right-width: 2px;    <br>}<br><br>blockquote::before{<br>  content: "\201C"; /*Unicode for Left Double Quote*/<br>  <br>  /*Font*/<br>  font-family: Georgia, serif;<br>  font-size: 60px;<br>  font-weight: bold;<br>  color: #999;<br>  <br>  /*Positioning*/<br>  position: absolute;<br>  left: 10px;<br>  top:5px;<br>  <br>}<br><br>blockquote::after{<br>  /*Reset to make sure*/<br>  content: "";<br>}<br><br>blockquote a{<br>  text-decoration: none;<br>  background: #eee;<br>  cursor: pointer;<br>  padding: 0 3px;<br>  color: #c76c0c;<br>}<br><br>blockquote a:hover{<br> color: #666;<br>}<br><br>blockquote em{<br>  font-style: italic;<br>}<br><br>  /*Default Color Palette*/<br>blockquote.default{ <br>  border-left-color: #656d77;<br>  border-right-color: #434a53;  <br>}<br><br>/*Grapefruit Color Palette*/<br>blockquote.grapefruit{<br>  border-left-color: #ed5565;<br>  border-right-color: #da4453;<br>}<br><br>/*Bittersweet Color Palette*/<br>blockquote.bittersweet{<br>  border-left-color: #fc6d58;<br>  border-right-color: #e95546;<br>}<br><br>/*Sunflower Color Palette*/<br>blockquote.sunflower{<br>  border-left-color: #ffcd69;<br>  border-right-color: #f6ba59;<br>}<br><br>/*Grass Color Palette*/<br>blockquote.grass{<br>  border-left-color: #9fd477;<br>  border-right-color: #8bc163;<br>}<br><br>/*Mint Color Palette*/<br>blockquote.mint{<br>  border-left-color: #46cfb0;<br>  border-right-color: #34bc9d;<br>}<br><br>/*Aqua Color Palette*/<br>blockquote.aqua{<br>  border-left-color: #4fc2e5;<br>  border-right-color: #3bb0d6;<br>}<br><br>/*Blue Jeans Color Palette*/<br>blockquote.bluejeans{<br>  border-left-color: #5e9de6;<br>  border-right-color: #4b8ad6;<br>}<br><br>/*Lavander Color Palette*/<br>blockquote.lavander{<br>  border-left-color: #ad93e6;<br>  border-right-color: #977bd5;<br>}<br><br>/*Pinkrose Color Palette*/<br>blockquote.pinkrose{<br>  border-left-color: #ed87bd;<br>  border-right-color: #d870a9;<br>}<br><br>/*Light Color Palette*/<br>blockquote.light{<br>  border-left-color: #f5f7fa;<br>  border-right-color: #e6e9ed;<br>}<br><br>/*Gray Color Palette*/<br>blockquote.gray{<br>  border-left-color: #ccd1d8;<br>  border-right-color: #aab2bc;<br>}<br><br><br>/* These CSS classes used just for Demo purpose */<br>.heading{<br>   font-family:Montez;<br>   text-align:center;<br>   font-size:30px;<br>}<br>code{<br>  color:#da4453;<br>}<br>span{<br>  font-weight:bolder;<br>  <br>}<br>h1{<br>  text-align:left;<br>  font-size:16px;<br>  font-family: 'Francois One', sans-serif;<br>}<br><br>span.Cdefault{<br>  color:#434a53;<br>}<br>span.Cgrapefruit{<br>  color:#da4453;<br>}<br>span.Cbittersweet{<br>  color:#e95546;<br>}<br>span.Csunflower{<br>  color:#f6ba59;<br>}<br>span.Cgrass{<br>  color:#8bc163;<br>}<br>span.Cmint{<br>  color:#34bc9d;<br>}<br>span.Caqua{<br>  color:#3bb0d6;<br>}<br>span.Cbluejeans{<br>  color:#4b8ad6;<br>}<br>span.Clavander{<br>  color:#977bd5;<br>}<br>span.Cpinkrose{<br>  color:#d870a9;<br>}<br>span.Clight{<br>  color:#e6e9ed;<br>}<br>span.Cgray{<br>  color:#aab2bc;<br>}</pre><br><h3>Demo:</h3><iframe frameborder="no" height="800px" name="Blockquote" scrolling="auto" src="https://source.l3n4r0x.cf/php/codepen.php?user=dimaslanjaka&amp;id=aWpXJY&amp;tab=result&amp;h=500" width="100%"><br /></iframe><br><br><b>Incoming Terms:</b> <i>css3 blockquote | styling blockquote | css for blockquote | Responsive Blockquote | How to make cool and simple clearly <blockqiote> | awesome blockquote | 12 css | css3</blockqiote></i>