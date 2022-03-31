---
author:
  nick: Kuswati
  link: https://www.blogger.com/profile/09256263851708439294
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2020-08-03T08:26:00.001+07:00
lang: en
location: ""
modified: 2020-08-03T08:26:05.439+07:00
subtitle: If you Got this issue today on windows, but dont need to downgrade
  node, just as discussed on
tags:
  - JS
  - Regular Expression
title: "Fix React Native error Invalid regular expression: /.\\\\__fixtures__"
type: post
uuid: 14f3d748-31a4-4888-8f4c-eaba432bc58a
webtitle: WMI Gitlab
updated: 2020-08-03T08:26:05+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: If you Got this issue today on windows, but dont need to downgrade
  node, just as discussed on
excerpt: If you Got this issue today on windows, but dont need to downgrade
  node, just as discussed on
wordcount: 42
---

<p>If you Got this issue today on windows, but don’t need to downgrade node, just as discussed on</p>
<p><a href="https://stackoverflow.com/a/58199866">Stackoverflow</a></p>
<p>just need to change some hashes on your project:</p>
<p><code>node_modules\react-native\packager\blacklist.js</code></p>
<pre><code class="language-javascript">var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
</code></pre>
<p>Change to:</p>
<pre><code class="language-js">var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
</code></pre>
