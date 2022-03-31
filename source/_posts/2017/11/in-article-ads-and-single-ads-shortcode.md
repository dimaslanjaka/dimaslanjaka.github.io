---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://imgdb.net/images/3203.jpg
date: 2017-11-11T23:34:00.000+07:00
lang: en
location: ""
modified: 2017-11-11T23:34:02.579+07:00
subtitle: center><h2>Adsense Shortcode Wordpress Compatible With WP AMP NINJA
  Plugin</h2></center><img src=https://imgdb.net/images/3203.jpg /><br
tags:
  - Adsense
  - Wordpress
  - AMP
  - PHP
title: In Article Ads And Single Ads Shortcode Wordpress With WP AMP NINJA Plugin
type: post
uuid: 59068f6c-11ed-4888-89bb-2e406d19c3e5
webtitle: WMI Gitlab
updated: 2017-11-11T23:34:02+07:00
thumbnail: https://imgdb.net/images/3203.jpg
photos:
  - https://imgdb.net/images/3203.jpg
description: center><h2>Adsense Shortcode Wordpress Compatible With WP AMP NINJA
  Plugin</h2></center><img src=https://imgdb.net/images/3203.jpg /><br
excerpt: center><h2>Adsense Shortcode Wordpress Compatible With WP AMP NINJA
  Plugin</h2></center><img src=https://imgdb.net/images/3203.jpg /><br
wordcount: 203
---

<center><h2>Adsense Shortcode Wordpress Compatible With WP AMP NINJA Plugin</h2></center><img src="https://imgdb.net/images/3203.jpg"><br><h2>Call Adsense JavaScript (adsbygoogle.js)</h2><pre>function saotn_loadAdsByGoogleJs() {<br>  wp_register_script( 'google-adsense', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', '', '', true );<br>  wp_enqueue_script( 'google-adsense' );<br>}<br>add_action( 'wp_enqueue_scripts', 'saotn_loadAdsByGoogleJs' );<br></pre><h2>Create In Article Ads Shortcode</h2><b>Goto Adsense Dashboard -&gt; My Ads -&gt; Add New -&gt; Choose In Article Ads -&gt; Set with your defined settings -&gt; Get Code from &lt;ins until &lt;/script&gt; dont copy script.js above &lt;/ins&gt;.</b><br><pre>//In Article Ads<br>function IAA($atts) {<br>$urlamp = (isset($_SERVER['HTTPS']) ? "https" : "http") . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];<br><br>if (strpos($urlamp,'wpamp') !== false) {<br>    //echo 'Car exists.';<br>    return '&lt;amp-ad layout="fixed-height" height=100 type="adsense" data-ad-client="ca-pub-7975270895217217" data-ad-slot="7382733759"&gt;<br>&lt;/amp-ad&gt;';<br>} else {<br>  return '&lt;ins class="adsbygoogle"<br>     style="display:block; text-align:center;"<br>     data-ad-layout="in-article"<br>     data-ad-format="fluid"<br>     data-ad-client="ca-pub-XXXXXXXXXX"<br>     data-ad-slot="XXXXXXXXXX"&gt;&lt;/ins&gt;<br>&lt;script&gt;<br>     (adsbygoogle = window.adsbygoogle || []).push({});<br>&lt;/script&gt;';<br>       }<br>}<br>add_shortcode('ads', 'IAA');<br></pre>Add shortcode <b>[ads]</b> in every post Location.<br>Replace ad-client and ad-slot with your in article ads client and slot number. <br><h2>Add Shortcode Responsive Adsense</h2><i class="fa fa-info"></i> <b>Goto Adsense.Google.com -&gt; My Ads -&gt; Ad New -&gt; Choose Text And Image Ads -&gt; Choose Responsive Ads -&gt; Get Code from &lt;ins until &lt;/script&gt; dont copy script.js above &lt;ins&gt;.</b><br><pre>//Single Adsense<br>function adsens($atts) {<br>   extract(shortcode_atts(array(<br>      'adsid' =&gt; h50,<br>      'height' =&gt; 250,<br>   ), $atts));<br>    $google_code = '&lt;ins id="'.$adsid.'" class="adsbygoogle"<br>     style="display:block"<br>     data-ad-client="ca-pub-XXXXXXX"<br>     data-ad-slot="XXXXXXXXXX"<br>     data-ad-format="auto"&gt;&lt;/ins&gt;<br>&lt;script&gt;<br>(adsbygoogle = window.adsbygoogle || []).push({});<br>&lt;/script&gt;';<br>$ampr = '&lt;amp-ad layout="fixed-height" id="'.$adsid.'" height='.$height.' type="adsense" data-ad-client="ca-pub-XXXXXX" data-ad-slot="XXXXXXXXXX"&gt;&lt;/amp-ad&gt;';<br>$urlamp = (isset($_SERVER['HTTPS']) ? "https" : "http") . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];<br><br>if (strpos($urlamp,'wpamp') !== false) {<br>    return $ampr;<br>} else {<br>return $google_code;<br>}<br>}<br>add_shortcode('adsense', 'adsens');</pre>add shortcode <b>[adsense height="50" id="YOURID"]</b><br>Change number 50 to your defined height in pixel (px).<br>YOURID change with your defined ID (if you have css to styling this ads).<br><br>Done.&nbsp;In Article Ads And Single Ads Shortcode Wordpress With WP AMP NINJA Plugin hope be functionally for your adsense.