---
Category:
  - Programming
  - IDE
cover: https://fabianlee.org/wp-content/uploads/2021/12/vscode-logo.png
date: 2022-02-20T07:00:00+07:00
tags:
  - VSCode
title: Custom PATH VSCode Integrated Terminal Options
updated: 2022-03-29T21:23:48+0000
uuid: 3b1b7031-6ca3-4888-8c93-4812c6cc40c2
webtitle: VSCode
category:
  - Uncategorized
subtitle: null
excerpt: null
description: null
lang: en
thumbnail: https://fabianlee.org/wp-content/uploads/2021/12/vscode-logo.png
photos:
  - https://fabianlee.org/wp-content/uploads/2021/12/vscode-logo.png
wordcount: 97
---

<p>Determining custom path on vscode IDE made easily development programs within multiple platforms.</p>
<h2 id="linux-env" tabindex="-1"><a class="header-anchor" href="#linux-env">Linux Env</a></h2>
<p>Add custom path to terminal linux</p>
<pre><code class="language-json">{
  &quot;terminal.integrated.env.linux&quot;: {
    &quot;PATH&quot;: &quot;./bin:${env:PATH}&quot;
  }
}
</code></pre>
<h2 id="windows-env" tabindex="-1"><a class="header-anchor" href="#windows-env">Windows Env</a></h2>
<p>Add path into vscode terminal windows</p>
<pre><code class="language-json">{
  &quot;terminal.integrated.env.windows&quot;: {
    &quot;PATH&quot;: &quot;${env:PATH};C:\\bin;C:\\another\\folder&quot;
  }
}
</code></pre>
<h2 id="mac-osx-env" tabindex="-1"><a class="header-anchor" href="#mac-osx-env">MAC OSX Env</a></h2>
<p>Add path into vscode terminal mac osx</p>
<pre><code class="language-json">{
  &quot;terminal.integrated.env.osx&quot;: {
    &quot;PATH&quot;: &quot;/home&quot;
  }
}
</code></pre>
<p>Now open Terminal and look at PATH</p>
<pre><code class="language-shell">echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/home
</code></pre>
<h3 id="also-see" tabindex="-1"><a class="header-anchor" href="#also-see">Also See</a></h3>
<ul>
<li><a href="/2022/03/26/file-is-a-commonjs-module-it-may-be-converted-to-an-es-module.html">vscode alert: CommonJS may be converted to an es module</a></li>
<li><a href="/p/search.html?q=vscode+crossplatform+setting">vscode crossplatform settings</a></li>
</ul>
