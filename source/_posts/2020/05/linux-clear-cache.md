---
author:
  nick: Kuswati
  link: https://www.blogger.com/profile/09256263851708439294
  email: noreply@blogger.com
category:
  - Programming
  - Bash
comments: true
cover: https://res.cloudinary.com/practicaldev/image/fetch/https://www.wissenschaft.com.ng/wp-content/uploads/2021/02/clear_ram_buffer_linux.jpg
date: 2020-05-30T00:03:00.002+07:00
lang: en
subtitle: Script To Clear Cache Linux
tags:
  - Bash
  - Script
  - Tips & Tricks
  - Linux/Unix
title: Linux Clear Cache
type: post
uuid: db68c44f-5c4e-4888-824c-065ae21add60
webtitle: Script
updated: 2022-03-26T05:37:59+0000
excerpt: Script To Clear Cache Linux
description: Script To Clear Cache Linux
thumbnail: https://res.cloudinary.com/practicaldev/image/fetch/https://www.wissenschaft.com.ng/wp-content/uploads/2021/02/clear_ram_buffer_linux.jpg
photos:
  - https://res.cloudinary.com/practicaldev/image/fetch/https://www.wissenschaft.com.ng/wp-content/uploads/2021/02/clear_ram_buffer_linux.jpg
wordcount: 105
---

<pre><code class="language-bash">#!/bin/bash
#clean page cache
#sync
#echo 1 &gt;/proc/sys/vm/drop_caches
#clean dentries and inodes
#sync
#echo 2 &gt;/proc/sys/vm/drop_caches
#clean page cache and dentries inodes, but it is not recommended in production instead use &quot;echo 1&quot;
#sync
#echo 3 &gt;/proc/sys/vm/drop_caches

##################
# begin refresh script
##################

sync
if [ $(dpkg-query -W -f='${Status}' polipo 2&gt;/dev/null | grep -c &quot;ok installed&quot;) -eq 0 ]; then
  apt-get install polipo -y
fi
polipo -x
echo 3 &gt;/proc/sys/vm/drop_caches
swapoff -a &amp;&amp; swapon -a
printf '\n%s\n\n' 'Ram-cache and Swap Cleared'
/opt/lampp/xampp restart
free -h
</code></pre>
<p>this script used for better performance your linux vps.</p>
<p>incoming terms:</p>
<ul>
<li>fix apache slow response</li>
<li>fix xampp web server slow</li>
<li>fix overload ram vps</li>
<li>fix mysqld overheat</li>
<li>fix java machine overheat ram</li>
</ul>
