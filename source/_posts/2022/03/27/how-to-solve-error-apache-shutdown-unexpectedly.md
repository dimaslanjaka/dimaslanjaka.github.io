---
cover: https://i.ytimg.com/vi/alj5it9EwIM/maxresdefault.jpg
date: 2022-03-26T23:46:00+0700
subtitle: Various step to fix xampp windows updated 2022
tags:
  - Apache
  - XAMPP
  - PHP
  - MySQL
title: How to solve Error Apache shutdown unexpectedly updated 2022
updated: 2022-03-27T23:46:00+0700
uuid: 60adad91-cafd-4888-8da8-a84bfff539a9
category:
  - Programming
  - PHP
excerpt: Various step to fix xampp windows updated 2022
description: Various step to fix xampp windows updated 2022
lang: en
thumbnail: https://i.ytimg.com/vi/alj5it9EwIM/maxresdefault.jpg
photos:
  - https://i.ytimg.com/vi/alj5it9EwIM/maxresdefault.jpg
wordcount: 265
---

<h2 id="how-to-solve-error-apache-shutdown-unexpectedly" tabindex="-1"><a class="header-anchor" href="#how-to-solve-error-apache-shutdown-unexpectedly">How to solve “Error: Apache shutdown unexpectedly”?</a></h2>
<h3 id="xampp-log-error" tabindex="-1"><a class="header-anchor" href="#xampp-log-error">XAMPP Log Error</a></h3>
<pre><code class="language-log">16:50:25  [Apache]     Status change detected: running
16:50:26  [Apache]     Status change detected: stopped
16:50:26  [Apache]     Error: Apache shutdown unexpectedly.
16:50:26  [Apache]     This may be due to a blocked port, missing dependencies,
16:50:26  [Apache]     improper privileges, a crash, or a shutdown by another method.
16:50:26  [Apache]     Press the Logs button to view error logs and check
16:50:26  [Apache]     the Windows Event Viewer for more clues
16:50:26  [Apache]     If you need more help, copy and post this
16:50:26  [Apache]     entire log window on the forums
</code></pre>
<p>how to solve <a href="#xampp-log-error">above log</a> ?</p>
<h4 id="folder-location" tabindex="-1"><a class="header-anchor" href="#folder-location">Folder Location</a></h4>
<p>Make sure the location of the <code>XAMPP</code> folder is outside the drive. Basically xampp only reads from your drive letter. for example:</p>
<pre><code class="language-text">D:\xampp
C:\xampp
</code></pre>
<h4 id="changing-port" tabindex="-1"><a class="header-anchor" href="#changing-port">Changing Port</a></h4>
<ul>
<li>Try changing port.</li>
</ul>
<blockquote>
<p>in <strong>Control Panel</strong> change apache port <code>80</code> -&gt; <code>8081</code>, <code>443</code> -&gt; <code>4433</code>
<img src="https://i.stack.imgur.com/McjHN.png" alt="Port XAMPP"></p>
</blockquote>
<ul>
<li>Open folder <code>D:\xampp\apache\conf\extra</code> and open all conf files one by one. (change <code>D:</code> with your drive letter)</li>
</ul>
<blockquote>
<p>Find <code>&lt;VirtualHost _default_:443&gt;</code> and change it to <code>&lt;VirtualHost _default_:4443&gt;</code>.</p>
<p>Find <code>ServerName localhost:443</code>. It’s possible that this hasn’t been set up yet and it reads <code>ServerName www.example.com:443</code>. In any case, change it to <code>ServerName localhost:4443</code>.</p>
</blockquote>
<h4 id="restart-xampp" tabindex="-1"><a class="header-anchor" href="#restart-xampp">Restart XAMPP</a></h4>
<ul>
<li>Stop and Start apache</li>
<li>Stop and start mysql</li>
</ul>
