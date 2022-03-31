---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://i.pinimg.com/originals/6b/fd/9c/6bfd9ce3f5358772d835bc0f03fa26be.png
date: 2019-09-27T13:13:00.001+07:00
lang: en
location: ""
modified: 2019-09-27T13:13:59.047+07:00
subtitle: I Also have the same problem and any that I found not solved my
  problem. But I remember that I also working with Laravel and in
tags:
  - PHP
  - Tips & Tricks
title: Remove index.php?route= from opencart
type: post
uuid: 963cc71f-b97e-4888-86b0-b798fb762de3
webtitle: WMI Gitlab
updated: 2019-09-27T13:13:59+07:00
thumbnail: https://i.pinimg.com/originals/6b/fd/9c/6bfd9ce3f5358772d835bc0f03fa26be.png
photos:
  - https://i.pinimg.com/originals/6b/fd/9c/6bfd9ce3f5358772d835bc0f03fa26be.png
description: I Also have the same problem and any that I found not solved my
  problem. But I remember that I also working with Laravel and in
excerpt: I Also have the same problem and any that I found not solved my
  problem. But I remember that I also working with Laravel and in
wordcount: 398
---

<h3>How to remove index.php?route= common issue from url bar for SEO url</h3><img src="https://i.pinimg.com/originals/6b/fd/9c/6bfd9ce3f5358772d835bc0f03fa26be.png"><p>    I Also have the same problem and any that I found not solved my problem. But!     I remember that I also working with Laravel and in this engine well working     url path. Don't ask why I associated OpenCart with Laravel. So I enable SEO     radio button in <em>System -&gt; Settings -&gt; Server</em> you also can     disable it I don't see difference in the site work. </p><p>    This solution consist from several part: </p><p>    <strong>1.</strong>    In your root folder replace <em>.htaccess</em> file content with next     shapshot: </p><pre><code>&lt;IfModule mod_rewrite.c&gt;<br>    &lt;IfModule mod_negotiation.c&gt;<br>        Options -MultiViews -Indexes<br>    &lt;/IfModule&gt;<br><br>    RewriteEngine On<br><br>    # Handle Authorization Header<br>    RewriteCond %{HTTP:Authorization} .<br>    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]<br><br>    # Redirect Trailing Slashes If Not A Folder...<br>    RewriteCond %{REQUEST_FILENAME} !-d<br>    RewriteCond %{REQUEST_URI} (.+)/$<br>    RewriteRule ^ %1 [L,R=301]<br><br>    # Handle Front Controller...<br>    RewriteCond %{REQUEST_FILENAME} !-d<br>    RewriteCond %{REQUEST_FILENAME} !-f<br>    RewriteRule ^(.*)$ index.php?route=$1 [L]<br>&lt;/IfModule&gt;</code></pre><p>    <strong>2.</strong>    Go to <em>/system/library/url.php</em> and find <code>link</code> method     and replace it with next: </p><pre><code>public function link($route, $args = '', $secure = false) {<br>  if ($this-&gt;ssl &amp;&amp; $secure) {<br>    $url = $this-&gt;ssl . 'index.php?route=' . $route;<br>  } else {<br>    $url = $this-&gt;url . 'index.php?route=' . $route;<br>  }<br><br>  if ($args) {<br>    if (is_array($args)) {<br>      $url .= '&amp;amp;' . http_build_query($args);<br>    } else {<br>      $url .= str_replace('&amp;', '&amp;amp;', '&amp;' . ltrim($args, '&amp;'));<br>    }<br>  }<br><br>  foreach ($this-&gt;rewrite as $rewrite) {<br>    $url = $rewrite-&gt;rewrite($url);<br>  }<br><br>  $url = str_replace('index.php?route=', '', $url);<br><br>  return $url; <br>}</code></pre><p>    Since you changed <em>.htaccess</em> in root folder and change url     generating method you also need remember about admin part. If you what see pretty url in admin just    <strong>copy .htaccess from root folder to /admin folder</strong>. </p><p>If you want save orignal url in admin side you must little bit change    <code>link</code> method with next: </p><pre><code>public function link($route, $args = '', $secure = false) {<br>  if ($this-&gt;ssl &amp;&amp; $secure) {<br>    $url = $this-&gt;ssl . 'index.php?route=' . $route;<br>  } else {<br>    $url = $this-&gt;url . 'index.php?route=' . $route;<br>  }<br><br>  if ($args) {<br>    if (is_array($args)) {<br>      $url .= '&amp;amp;' . http_build_query($args);<br>    } else {<br>      $url .= str_replace('&amp;', '&amp;amp;', '&amp;' . ltrim($args, '&amp;'));<br>    }<br>  }<br><br>  foreach ($this-&gt;rewrite as $rewrite) {<br>    $url = $rewrite-&gt;rewrite($url);<br>  }<br><br>  //  Skip admin path<br>  if (strpos($_SERVER['REQUEST_URI'], '/admin') !== 0) {<br>    $url = str_replace('index.php?route=', '', $url);<br>  }<br><br>  return $url; <br>}</code></pre><p>    <strong>Result:</strong></p><p>    <em>Before</em></p><p>    <code>        http://YOUR_SITE/index.php?route=product/product&amp;product_id=52     </code></p><p>    <em>After</em></p><p>    <code>http://YOUR_SITE/product/product&amp;product_id=52</code></p><p>    <em>Before</em></p><p>    <code>http://YOUR_SITE/index.php?route=account/login</code></p><p>    <em>After</em></p><p>    <code>http://YOUR_SITE/account/login</code></p>