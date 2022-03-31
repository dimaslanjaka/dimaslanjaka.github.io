---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://imgdb.net/images/3202.jpg
date: 2017-10-09T14:56:00.000+07:00
lang: en
location: ""
modified: 2017-10-09T14:56:42.855+07:00
subtitle: img class=center w3-center height=250
  src=https://imgdb.net/images/3202.jpg width=100 /><br /><ol><li>Go to Your
  Dashboard
tags:
  - Adsense
  - Wordpress
  - PHP
title: Create Adsense shortcode for WordPress
type: post
uuid: de960b3e-b799-4888-847a-210629943dee
webtitle: WMI Gitlab
updated: 2017-10-09T14:56:42+07:00
thumbnail: https://imgdb.net/images/3202.jpg
photos:
  - https://imgdb.net/images/3202.jpg
description: img class=center w3-center height=250
  src=https://imgdb.net/images/3202.jpg width=100 /><br /><ol><li>Go to Your
  Dashboard
excerpt: img class=center w3-center height=250
  src=https://imgdb.net/images/3202.jpg width=100 /><br /><ol><li>Go to Your
  Dashboard
wordcount: 220
---

<img class="center w3-center" height="250" src="https://imgdb.net/images/3202.jpg" width="100%"><br><ol><li>Go to Your Dashboard WordPress</li><li>Click menu -&gt; Appearance</li><li>Click editor -&gt; choose functions.php</li><li>Add below code inside <kbd>&lt;?php</kbd></li></ol><pre>/*<br> * enqueue adsbygoogle.js in the footer &amp; <br> * create a WordPress shortcode with your Google AdSense code<br> * follow me on Twitter: @DimasSkynetCybe<br> */<br><br>function loadAdsenseJS() {<br>  wp_register_script( 'google-adsense', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', '', '', true );<br>  wp_enqueue_script( 'google-adsense' );<br>}<br>add_action( 'wp_enqueue_scripts', 'loadAdsenseJS' );<br><br>function AdSense() {<br>  $output = '&lt;ins class="adsbygoogle"<br>    style="background-color: transparent;<br>      text-decoration: none;<br>      display:inline-block;<br>      width:336px;<br>      height:280px"<br>    data-ad-client="ca-pub-xxYourUniqueIdxx"<br>    data-ad-slot="xxUniqueIdSlotxx"&gt;&lt;/ins&gt;<br>  &lt;script&gt;<br>  (adsbygoogle = window.adsbygoogle || []).push({});<br>  &lt;/script&gt;';<br>  <br>  return $output;<br>}<br>add_shortcode( 'adsense', 'AdSense' );<br><h4><br>/*<br> * Usage: add <i>[adsense]</i> in your WordPress posts <br> * where you want your ad to appear<br> */</h4><br></pre>