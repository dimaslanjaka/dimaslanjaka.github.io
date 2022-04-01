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
updated: 2022-03-20T20:57:28+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: pre><br />ArrayListlt;Stringgt; firstArr = new ArrayListlt;gt;;<br
  /> firstArr.addquot;1quot;;<br />
excerpt: pre><br />ArrayListlt;Stringgt; firstArr = new ArrayListlt;gt;;<br />
  firstArr.addquot;1quot;;<br />
wordcount: 38
---

```java
  ArrayList<String> firstArr = new ArrayList<>();
  firstArr.add("1");
  firstArr.add("2");
  firstArr.add("3");
  
  // array/list to be removed from firstArr
  ArrayList<String> filterArr = new ArrayList<>();
  filterArr.add("1");
  filterArr.add("3");
  
  // filter now
  filterArr.removeAll(blockedArr);
  
  // Dump
  System.out.println(filterArr.toString); // output 1 and 3
```
