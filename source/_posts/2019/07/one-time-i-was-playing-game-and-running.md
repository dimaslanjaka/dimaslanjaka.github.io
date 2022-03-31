---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://1.bp.blogspot.com/-RgpJNTI1w90/Uy4W4qlHVuI/AAAAAAAAAf4/JozWbUyJgts/s1600/spp.png
date: 2019-07-21T01:20:00.000+07:00
lang: en
location: ""
modified: 2019-07-21T01:20:57.339+07:00
subtitle: One time I was playing a game, and running several programs on a
  Windows laptop. Then the memory was heavy, some of my programs were
tags:
  - Tips & Tricks
title: Turn off the Platform Protection Service Software Program
type: post
uuid: dbf6c734-f90c-4888-8bd3-b775fec8ca50
webtitle: WMI Gitlab
updated: 2019-07-21T01:20:57+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://1.bp.blogspot.com/-RgpJNTI1w90/Uy4W4qlHVuI/AAAAAAAAAf4/JozWbUyJgts/s1600/spp.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://1.bp.blogspot.com/-RgpJNTI1w90/Uy4W4qlHVuI/AAAAAAAAAf4/JozWbUyJgts/s1600/spp.png
description: One time I was playing a game, and running several programs on a
  Windows laptop. Then the memory was heavy, some of my programs were
excerpt: One time I was playing a game, and running several programs on a
  Windows laptop. Then the memory was heavy, some of my programs were
wordcount: 215
---

<div dir="ltr" style="text-align: left;" trbidi="on"><div class="separator" style="clear: both; text-align: center;"> <a href="http://res.cloudinary.com/dimaslanjaka/image/fetch/https://1.bp.blogspot.com/-RgpJNTI1w90/Uy4W4qlHVuI/AAAAAAAAAf4/JozWbUyJgts/s1600/spp.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://1.bp.blogspot.com/-RgpJNTI1w90/Uy4W4qlHVuI/AAAAAAAAAf4/JozWbUyJgts/s1600/spp.png" data-original-height="250" data-original-width="500" height="160" width="320"></a></div><br>One time I was playing a game, and running several programs on a Windows 8 laptop. Then the memory was heavy, some of my programs were closed. It's still heavy, then I check the task manager. It turns out that a windows service called sppsvc.exe - Software Platform Protection Service - has consumed as much as 25% of my RAM, constantly. Repeatedly killed with 'end task', the program appears again. Finally I was browsing and found a way to end it.<br><br>SPPSVC is a Windows program that will be available during Windows Non-Genuine, it is still not activated. Because the way to activate it is difficult to call everything ... But now there are many available Win8 activators, just download and run. Now, how to permanently disable sppsvc, we only need to close it at the startup program.<br><br>Open Services from the program run &gt;&gt; 'services.msc'<br>Select Software Protection and see if Startup type: Enabled, then change to Disabled. If it can't be selected, try to turn on / turn off this service by typing in cmd &gt;&gt;<br><br>sppsvc net start<br>or<br>sppsvc net stop<br><br><div class="separator" style="clear: both; text-align: center;"><a href="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://2.bp.blogspot.com/-eJCqoflLv60/Uy4W4jUjCbI/AAAAAAAAAf8/vP2ng4ilw0A/s1600/servicesmsc.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="531" data-original-width="800" height="212" src="https://2.bp.blogspot.com/-eJCqoflLv60/Uy4W4jUjCbI/AAAAAAAAAf8/vP2ng4ilw0A/s320/servicesmsc.png" width="320"></a></div><br>Can also disable it from the registry editor, this is a short way from the command prompt &gt;&gt; <pre>REG add "HKLM\SYSTEM\CurrentControlSet\services\sppsvc" /v Start /t REG_DWORD /d 4 /f</pre></div>