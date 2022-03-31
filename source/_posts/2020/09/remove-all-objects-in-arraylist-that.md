---
author:
  nick: Kuswati
  link: https://www.blogger.com/profile/09256263851708439294
  email: noreply@blogger.com
category:
  - Programming
  - JAVA
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2020-09-22T10:36:00.001+07:00
lang: en
location: ""
modified: 2020-09-22T10:36:39.906+07:00
subtitle: pre><br />ArrayListlt;Stringgt; firstArr = new ArrayListlt;gt;;<br />
  firstArr.addquot;1quot;;<br />
tags:
  - JAVA
title: Remove all objects in an arraylist that exist in another arraylist Java
type: post
uuid: 86dc6b3b-9670-4888-8e6a-bd91726de97c
webtitle: WMI Gitlab
updated: 2020-09-22T10:36:39+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: pre><br />ArrayListlt;Stringgt; firstArr = new ArrayListlt;gt;;<br
  /> firstArr.addquot;1quot;;<br />
excerpt: pre><br />ArrayListlt;Stringgt; firstArr = new ArrayListlt;gt;;<br />
  firstArr.addquot;1quot;;<br />
wordcount: 38
---

<pre><code class="language-java">  ArrayList&lt;String&gt; firstArr = new ArrayList&lt;&gt;();
  firstArr.add(&quot;1&quot;);
  firstArr.add(&quot;2&quot;);
  firstArr.add(&quot;3&quot;);
  
  // array/list to be removed from firstArr
  ArrayList&lt;String&gt; filterArr = new ArrayList&lt;&gt;();
  filterArr.add(&quot;1&quot;);
  filterArr.add(&quot;3&quot;);
  
  // filter now
  filterArr.removeAll(blockedArr);
  
  // Dump
  System.out.println(filterArr.toString); // output 1 and 3
</code></pre>
