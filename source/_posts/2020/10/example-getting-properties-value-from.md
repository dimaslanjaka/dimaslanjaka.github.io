---
author:
  nick: Kuswati
  link: https://www.blogger.com/profile/09256263851708439294
  email: noreply@blogger.com
category:
  - Programming
  - KOTLIN
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2020-10-24T09:19:00.000+07:00
lang: en
location: ""
modified: 2020-10-24T09:19:53.448+07:00
subtitle: pre><br />pluginManagement <br /> resolutionStrategy <br /> eachPlugin
  <br /> // Work around
tags:
  - KOTLIN
title: Example getting properties value from settings.gradle.kts
type: post
uuid: 27d03306-0c58-4888-8a64-b45d83662e64
webtitle: WMI Gitlab
updated: 2020-10-24T09:19:53+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: pre><br />pluginManagement <br /> resolutionStrategy <br />
  eachPlugin <br /> // Work around
excerpt: pre><br />pluginManagement <br /> resolutionStrategy <br /> eachPlugin
  <br /> // Work around
wordcount: 74
---

<pre><br>pluginManagement {<br>    resolutionStrategy {<br>        eachPlugin {<br>            // Work around https://github.com/gradle/gradle/issues/1697.<br>            if (requested.version == null) {<br>                def pluginName = requested.id.name.split('-').collect { it.capitalize() }.join().uncapitalize()<br>                def versionPropertyName = (requested.id.id == 'org.jetbrains.kotlin.jvm') ?<br>                        "kotlinPluginVersion" : "${pluginName}PluginVersion"<br>                logger.info("Checking for plugin version property '$versionPropertyName'.")<br>                if (gradle.rootProject.hasProperty(versionPropertyName)) {<br>                    def version = gradle.rootProject.properties[versionPropertyName]<br>                    logger.info("Setting '${requested.id.id}' plugin version to $version.")<br>                    useVersion version<br>                } else {<br>                    logger.warn("No version specified for plugin '${requested.id.id}' and property " +<br>                            "'$versionPropertyName' does not exist.")<br>                }<br>            }<br>        }<br>    }<br>}<br></pre>