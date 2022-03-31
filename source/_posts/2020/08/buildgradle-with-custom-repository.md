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
date: 2020-08-03T18:02:00.005+07:00
lang: en
location: ""
modified: 2020-08-10T20:47:57.089+07:00
subtitle: Fix missing dependencies from your gradle project android, maven, etc
  with this build.gradle. <br/>insert into
tags:
  - JAVA
  - Gradle
  - KOTLIN
  - Android
title: build.gradle with custom repository
type: post
uuid: e536a08c-6257-4888-8667-4b39732b9374
webtitle: WMI Gitlab
updated: 2020-08-10T20:47:57+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Fix missing dependencies from your gradle project android, maven,
  etc with this build.gradle. <br/>insert into
excerpt: Fix missing dependencies from your gradle project android, maven, etc
  with this build.gradle. <br/>insert into
wordcount: 290
---

Fix missing dependencies from your gradle project (android, maven, etc) with this build.gradle. <br>insert into <kbd>YOUR_PROJECT_GRADLE/build.gradle</kbd> <pre>// Top-level build file where you can add configuration options common to all sub-projects/modules.<br><br>buildscript {<br>    repositories {<br>        maven { url "https://maven.google.com" }<br>        jcenter()<br>        maven { url "https://jitpack.io" }<br>        maven { url "https://dl.bintray.com/android/android-tools" }<br>        maven { url "https://plugins.gradle.org/m2/" }<br>        maven { url "https://maven.fabric.io/public" }<br>        mavenCentral()<br>        mavenLocal()<br>    }<br>    dependencies {<br>        classpath 'com.android.tools.build:gradle:3.2.1'<br>    }<br>}<br><br>allprojects {<br>    repositories {<br>        maven { url "https://maven.google.com" }<br>        jcenter()<br>        maven { url "https://jitpack.io" }<br>        maven { url "https://dl.bintray.com/android/android-tools" }<br>        maven { url "https://plugins.gradle.org/m2/" }<br>        maven { url "https://maven.fabric.io/public" }<br>        mavenCentral()<br>        mavenLocal()<br>    }<br>}<br></pre> <h5>Kotlin</h5><kbd>YOUR_PROJECT_GRADLE/build.gradle.kts</kbd><pre><br>buildscript {<br>    repositories {<br>        maven ("https://maven.google.com")<br>        jcenter()<br>        maven ("https://jitpack.io")<br>        maven ("https://dl.bintray.com/android/android-tools")<br>        maven ("https://plugins.gradle.org/m2/")<br>        maven ("https://maven.fabric.io/public")<br>        mavenCentral()<br>        mavenLocal()<br>    }<br>}<br>allprojects {<br>    repositories {<br>        maven ("https://maven.google.com")<br>        jcenter()<br>        maven ("https://jitpack.io")<br>        maven ("https://dl.bintray.com/android/android-tools")<br>        maven ("https://plugins.gradle.org/m2/")<br>        maven ("https://maven.fabric.io/public")<br>        mavenCentral()<br>        mavenLocal()<br>    }<br>}<br></pre>