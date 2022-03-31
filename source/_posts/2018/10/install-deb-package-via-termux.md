---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://imgdb.net/images/4271.png
date: 2018-10-26T20:14:00.000+07:00
lang: en
location: ""
modified: 2018-11-12T12:47:16.497+07:00
subtitle: Install deb package via Termux
tags:
  - Script
  - Android
  - Tips & Tricks
title: Install deb package via Termux
type: post
uuid: f13b28f1-d723-4888-8805-83771a68b9fc
webtitle: WMI Gitlab
updated: 2018-11-12T12:47:16+07:00
thumbnail: https://imgdb.net/images/4271.png
photos:
  - https://imgdb.net/images/4271.png
description: Install deb package via Termux
excerpt: Install deb package via Termux
wordcount: 338
---

<div class="w3-center"><img src="https://imgdb.net/images/4271.png"></div> <p>Packages are <strong>manually</strong> installed via the    <strong><code>dpkg</code></strong> command (Debian Package Management System). <code>dpkg</code> is the backend to commands like    <code>apt-get</code> and <code>aptitude</code>, which in turn are the     backend for GUI install apps like the Software Center and Synaptic. </p><p>    Something along the lines of: </p><p>    <code>dpkg</code>    --&gt; <code>apt-get</code>, <code>aptitude</code> --&gt; Synaptic,     Software Center </p><p>    But of course the easiest ways to install a package would be, first, the     GUI apps (Synaptic, Software Center, etc..), followed by the terminal     commands <code>apt-get</code> and <code>aptitude</code> that add a very     nice user friendly approach to the backend dpkg, including but not limited     to packaged dependencies, control over what is installed, needs update, not     installed, broken packages, etc.. Lastly the <code>dpkg</code>command which     is the base for all of them. </p><p>    Since dpkg is the base, you can use it to install packaged directly from     the command line. </p><h3>    Install a package </h3><pre><code>sudo dpkg -i DEB_PACKAGE<br></code></pre><p>    For example if the package file is called <code>askubuntu_2.0.deb</code>then you should do <code>sudo dpkg -i askubuntu_2.0.deb</code>. If<code>dpkg</code> reports an error due to dependency problems, you can run    <code>sudo apt-get install -f</code> to download the missing dependencies     and configure everything. If that reports an error, you'll have to sort out     the dependencies yourself by following for example     <a href="https://askubuntu.com/questions/140246/how-do-i-resolve-unmet-dependencies" rel="noopener noreferer nofollow">        How do I resolve unmet dependencies after adding a PPA?     </a>    . </p><h3>    Remove a package </h3><pre><code>sudo dpkg -r PACKAGE_NAME<br></code></pre><p>    For example if the package is called <code>askubuntu</code> then you should     do <code>sudo dpkg -r askubuntu</code>. </p><h3>    Reconfigure an existing package </h3><pre><code>sudo dpkg-reconfigure PACKAGE_NAME<br></code></pre><p>    This is useful when you need to reconfigure something related to said     package. Some useful examples it the <code>keyboard-configuration</code>when you want to enable the <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+    <kbd>Backspace</kbd> in order to reset the X server, so you would the     following: </p><pre><code>sudo dpkg-reconfigure keyboard-configuration<br></code></pre><p>    Another great one is when you need to set the Timezone for a server or your     local testing computer, so you use use the <code>tzdata</code> package: </p><pre><code>sudo dpkg-reconfigure tzdata</code></pre>