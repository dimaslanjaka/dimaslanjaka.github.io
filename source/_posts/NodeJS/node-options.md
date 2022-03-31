---
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
category:
  - Programming
  - JS
comments: true
cover: https://www.bleepstatic.com/content/hl-images/2020/08/04/nodejs-header.jpg
date: 2021-11-17T16:00:00+07:00
keywords:
  - nodejs
  - arguments
  - cli
lang: en
location: Indonesia
subtitle: Usage, explanations of node options for nodejs
tags:
  - JS
  - NodeJS
title: Node Options For NodeJS
type: post
uuid: 586f70e0-6dec-4888-8cac-99671aad2296
webtitle: NodeJS
updated: 2021-12-10T19:53:25+07:00
thumbnail: https://www.bleepstatic.com/content/hl-images/2020/08/04/nodejs-header.jpg
photos:
  - https://www.bleepstatic.com/content/hl-images/2020/08/04/nodejs-header.jpg
description: Usage, explanations of node options for nodejs
excerpt: Usage, explanations of node options for nodejs
wordcount: 216
---

<h1 id="nodejs-options-node-options" tabindex="-1"><a class="header-anchor" href="#nodejs-options-node-options">NODEJS OPTIONS [ NODE_OPTIONS ]</a></h1>
<p>Node.js accompanies an assortment of CLI choices. These choices uncover worked in investigating, different ways of executing scripts, and other accommodating runtime choices.</p>
<p>To see this documentation as a manual page in a terminal, run ‘man hub’. <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9ub2RlanMub3JnL2FwaS9jbGkuaHRtbA==" target="_blank" rel="nofollow noopener">Read more</a></p>
<h2 id="how-to-setup-multiple-options-on-git-hub-workflow" tabindex="-1"><a class="header-anchor" href="#how-to-setup-multiple-options-on-git-hub-workflow">How to setup multiple options on GitHub Workflow</a></h2>
<pre><code class="language-yaml">jobs:
  build:
    name: Build www.webmanajemen.com
    runs-on: ubuntu-latest
    env:
      NODE_OPTIONS: &quot;--experimental-vm-modules --max_old_space_size=8192&quot;
</code></pre>
<h2 id="how-to-performance-run-nodejs-on-low-devices" tabindex="-1"><a class="header-anchor" href="#how-to-performance-run-nodejs-on-low-devices">How to performance run nodejs on low devices</a></h2>
<p>The recommended amounts for a “low memory device”.</p>
<p>for 32-bit and/or Android are:</p>
<pre><code class="language-shell">node --max-executable-size=96 --max-old-space-size=128 --max-semi-space-size=1 app.js
</code></pre>
<p>for 64-bit non-android are:</p>
<pre><code class="language-shell">node --max-executable-size=192 --max-old-space-size=256 --max-semi-space-size=2 app.js
</code></pre>
<p>These above codes would limit the heap totals to 225mb and 450mb respectively. It doesn’t include memory usage outside JS. For instance buffers are allocated as “c memory” , not in the JavaScript heap.</p>
<h3 id="flags" tabindex="-1"><a class="header-anchor" href="#flags">Flags</a></h3>
<ul>
<li><code>--max-executable-size</code> the maximum size of heap reserved for executable code (the native code result of just-in-time compiled JavaScript).</li>
<li><code>--max-old-space-size</code> the maximum size of heap reserved for long term objects</li>
<li><code>--max-semi-space-size</code> the maximum size of heap reserved for short term objects</li>
</ul>
