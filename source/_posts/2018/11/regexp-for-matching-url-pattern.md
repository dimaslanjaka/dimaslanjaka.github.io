---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://www.webubi.com/wp-content/uploads/2017/03/regex.png
date: 2018-11-23T22:25:00.000+07:00
lang: en
location: ""
modified: 2020-01-21T01:56:29.965+07:00
subtitle: img
  src=https://res.cloudinary.com/dimaslanjaka/image/fetch/https://www.webubi.com/wp-content/uploads/2017/03/regex.png
  alt=regexp
tags:
  - Script
  - JS
  - PHP
title: "[JS][PHP] Regexp for matching URL Pattern"
type: post
uuid: d8c6ac9a-9287-4888-8c62-2619979a958a
webtitle: WMI Gitlab
updated: 2020-01-21T01:56:29+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://www.webubi.com/wp-content/uploads/2017/03/regex.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://www.webubi.com/wp-content/uploads/2017/03/regex.png
description: img
  src=https://res.cloudinary.com/dimaslanjaka/image/fetch/https://www.webubi.com/wp-content/uploads/2017/03/regex.png
  alt=regexp
excerpt: img
  src=https://res.cloudinary.com/dimaslanjaka/image/fetch/https://www.webubi.com/wp-content/uploads/2017/03/regex.png
  alt=regexp
wordcount: 186
---

<p><img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://www.webubi.com/wp-content/uploads/2017/03/regex.png" alt="regexp" class="img-responsive"> Regexp Pattern Untuk mencocokkan semua jenis URL, kode berikut seharusnya berfungsi: <pre><br>&lt;?php<br>    $regex = “((https?|ftp)://)?”; // SCHEME<br>    $regex .= “([a-z0-9+!<em>(),;?&amp;=$_.-]+(:[a-z0-9+!</em>(),;?&amp;=$<em>.-]+)?@)?&quot;; // User and Pass<br>    $regex .= “([a-z0-9-.]*).(([a-z]{2,4})|([0-9]{1,3}.([0-9]{1,3}).([0-9]{1,3})))”; // Host or IP<br>    $regex .= “(:[0-9]{2,5})?”; // Port<br>    $regex .= &quot;(/([a-z0-9+$</em>%-].?)+)<em>/?&quot;; // Path<br>    $regex .= &quot;(?[a-z+&amp;$<em>.-][a-z0-9;:@&amp;%=+/$</em>.-]</em>)?”; // GET Query<br>    $regex .= “(#[a-z_.-][a-z0-9+$%_.-]*)?”; // Anchor<br>?&gt;<br></pre> <h4>Example: correctly way for matching URL</h4><pre><br>&lt;?php<br>   if(preg_match(“<sub>^$regex$</sub>i”, ‘<a href="http://www.example.com/etcetc">www.example.com/etcetc</a>’, $m))<br>      var_dump($m);<br><br>   if(preg_match(“<sub>^$regex$</sub>i”, ‘<a href="http://www.example.com/etcetc">http://www.example.com/etcetc</a>’, $m))<br>      var_dump($m);<br>?&gt;<br></pre><blockquote>Pattern diatas bisa digunakan di javascript. Bedanya dengan diatas hanya dari segi variablenya saja. Bila di PHP variable dituliskan dengan awalan ($) maka di javascript cukup diganti (var) atau (let) atau (const) </blockquote></p>
