---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2019-07-17T17:05:00.001+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:18.020+07:00
subtitle: "Set timezone javascript without using any pluginsconst DATE new
  Date.toLocaleStringen-US, timeZone:"
tags:
  - JS
title: "[JS] Set Timezone"
type: post
uuid: c3b80075-3eee-4888-8b07-fbc473d62555
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:18+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: "Set timezone javascript without using any pluginsconst DATE new
  Date.toLocaleStringen-US, timeZone:"
excerpt: "Set timezone javascript without using any pluginsconst DATE new
  Date.toLocaleStringen-US, timeZone:"
wordcount: 44
---

<div dir="ltr" style="text-align: left;" trbidi="on"><b>Set timezone javascript without using any plugins</b><br><br><pre class="snippet-code-js lang-js prettyprint prettyprinted" style="background-color: #eff0f1; border-radius: 3px; border: 0px; box-sizing: inherit; color: #393318; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; font-stretch: inherit; font-variant-east-asian: inherit; font-variant-numeric: inherit; line-height: inherit; margin-bottom: 1em; max-height: 600px; overflow-wrap: normal; overflow: auto; padding: 12px 8px; vertical-align: baseline; width: auto;">const DATE = new Date().toLocaleString('en-US', {<br>  timeZone: 'Asia/Jakarta'<br>});<br></pre><pre class="snippet-code-js lang-js prettyprint prettyprinted" style="background-color: #eff0f1; border-radius: 3px; border: 0px; box-sizing: inherit; color: #393318; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; font-stretch: inherit; font-variant-east-asian: inherit; font-variant-numeric: inherit; line-height: inherit; margin-bottom: 1em; max-height: 600px; overflow-wrap: normal; overflow: auto; padding: 12px 8px; vertical-align: baseline; width: auto;">console.log(DATE); //debug</pre><pre class="snippet-code-js lang-js prettyprint prettyprinted" style="background-color: #eff0f1; border-radius: 3px; border: 0px; box-sizing: inherit; color: #393318; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; font-stretch: inherit; font-variant-east-asian: inherit; font-variant-numeric: inherit; line-height: inherit; margin-bottom: 1em; max-height: 600px; overflow-wrap: normal; overflow: auto; padding: 12px 8px; vertical-align: baseline; width: auto;">document.write(JSON.stringify(DATE)); //debug dynamically print</pre><br><ol style="text-align: left;"><li>compatible with ANY Javascript</li></ol></div>