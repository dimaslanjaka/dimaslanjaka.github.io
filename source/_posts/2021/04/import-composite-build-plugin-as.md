---
author:
  nick: Dimas Lanjaka
  link: https://www.blogger.com/profile/07981649157148639830
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://miro.medium.com/max/2476/0*Mll3yo3DWALtRYPR.png
date: 2021-04-20T16:40:00.001+07:00
lang: en
location: ""
modified: 2021-04-20T16:40:48.445+07:00
subtitle: pre><br />// change folder path inside bracket<br />includeBuildplugin
  <br /> dependencySubstitution <br /> // change your
tags:
  - Script
  - Gradle
  - Tips & Tricks
title: Import composite build plugin as subtitue module dependency [Gradle]
type: post
uuid: a9027466-66dd-4888-8a50-f96f0c8f8ab0
webtitle: WMI Gitlab
updated: 2021-04-20T16:40:48+07:00
thumbnail: https://miro.medium.com/max/2476/0*Mll3yo3DWALtRYPR.png
photos:
  - https://miro.medium.com/max/2476/0*Mll3yo3DWALtRYPR.png
description: pre><br />// change folder path inside bracket<br
  />includeBuildplugin <br /> dependencySubstitution <br /> // change your
excerpt: pre><br />// change folder path inside bracket<br />includeBuildplugin
  <br /> dependencySubstitution <br /> // change your
wordcount: 29
---

<pre><br>// change folder path inside bracket<br>includeBuild("plugin") {<br>    dependencySubstitution {<br>    	// change your artifact group and id<br>        // iam using <a href="https://github.com/dimaslanjaka/gradle-plugin/" target="_blank" rel="noopener noreferer nofollow">https://github.com/dimaslanjaka/gradle-plugin/</a> for example<br>        substitute(module("com.dimaslanjaka:gradle-plugin")).with(project(":"))<br>    }<br>}<br></pre> <img src="https://miro.medium.com/max/2476/0*Mll3yo3DWALtRYPR.png">