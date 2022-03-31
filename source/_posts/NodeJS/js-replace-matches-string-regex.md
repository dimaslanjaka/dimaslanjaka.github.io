---
author:
  nick: Dimas Lanjaka
  link: http://webmanajemen.com
cover: https://res.cloudinary.com/practicaldev/image/fetch/s--73FnDTzR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.ibb.co/DWR2ZKQ/carbon-3.png
date: 2021-12-19T15:07:43+07:00
subtitle: How to match regex from string and replace matched string 1-9
tags:
  - JS
title: Replace Matched Regex 1-9 From String
uuid: 765a18cd-4bfd-4888-8919-eff198a9f8de
updated: 2021-12-19T15:20:44+07:00
lang: en
thumbnail: https://res.cloudinary.com/practicaldev/image/fetch/s--73FnDTzR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.ibb.co/DWR2ZKQ/carbon-3.png
photos:
  - https://res.cloudinary.com/practicaldev/image/fetch/s--73FnDTzR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.ibb.co/DWR2ZKQ/carbon-3.png
description: How to match regex from string and replace matched string 1-9
category:
  - Programming
  - JS
excerpt: How to match regex from string and replace matched string 1-9
wordcount: 95
---

<h1 id="node-js-replace-matched-string-from-regex" tabindex="-1"><a class="header-anchor" href="#node-js-replace-matched-string-from-regex">NodeJS Replace Matched String From Regex</a></h1>
<p>How to match regex from string and replace matched string $1-$9</p>
<blockquote>
<p>$1 = matched index 1 and so on</p>
</blockquote>
<p>for example: were going to replace all markdown extensions to html extension.</p>
<pre><code class="language-js">const str = `[text1](url.html) [txt](http://webmanajemen.com/post.md)`; // string to replace
const regex = /\[.*\]\(.*(.md)\)/gm; // regex to match group index 1 (.md)
if (regex.exec(str)) { // check if regex match
  const replaced = str.replace(regex, function (wholeMatch, index1) {
    console.log(wholeMatch, index1);
    return wholeMatch.replace(index1, &quot;.html&quot;); // replace .md to .html
  });
  console.log(replaced); // [text1](url.html) [txt](http://webmanajemen.com/post.html)
}
</code></pre>
<script>
  document.querySelectorAll("pre,code");
  pretext.forEach(function (el) {
    el.classList.toggle("notranslate", true);
  });
</script>
