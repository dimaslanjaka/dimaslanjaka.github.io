---
cover: https://i.stack.imgur.com/Xo2sA.png
date: 2022-03-26T04:27:16+0000
subtitle: disable vscode alert File is a CommonJS module; it may be converted to
  an ES module
tags:
  - TS
  - JS
  - IDE
title: disable vscode alert File is a CommonJS module; it may be converted to an
  ES module
updated: 2022-03-26T04:27:16+0000
uuid: 1d699a76-b023-4888-85f3-bd25b793aa3d
category:
  - Programming
  - JS
excerpt: disable vscode alert File is a CommonJS module; it may be converted to
  an ES module
description: disable vscode alert File is a CommonJS module; it may be converted
  to an ES module
lang: en
thumbnail: https://i.stack.imgur.com/Xo2sA.png
photos:
  - https://i.stack.imgur.com/Xo2sA.png
wordcount: 137
---

<h1 id="file-is-a-common-js-module-it-may-be-converted-to-an-es-module" tabindex="-1"><a class="header-anchor" href="#file-is-a-common-js-module-it-may-be-converted-to-an-es-module">File is a CommonJS module; it may be converted to an ES module</a></h1>
<p>This is a new feature added in Visual Studio Code called “Suggestion Code Actions”. “Suggestion Code Actions” are enabled by default in JavaScript and TypeScript.</p>
<p>You can disable them by setting: <code>&quot;typescript.suggestionActions.enabled&quot;: false</code> or <code>&quot;javascript.suggestionActions.enabled&quot;: false</code> in your user/workspace settings. The documentation can be found <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9jb2RlLnZpc3VhbHN0dWRpby5jb20vZG9jcy9nZXRzdGFydGVkL3NldHRpbmdz" target="_blank" rel="nofollow noopener">here</a>.</p>
<h3 id="open-settings-json-file" tabindex="-1"><a class="header-anchor" href="#open-settings-json-file">open settings.json file</a></h3>
<p>insert below option</p>
<pre><code class="language-jsonc">{
    &quot;javascript.suggestionActions.enabled&quot;: false, // disable vscode alert on javascript
    &quot;typescript.suggestionActions.enabled&quot;: false // disable vscode alert on typescript
}
</code></pre>
<h3 id="preview-example-it-should-be-looks-like" tabindex="-1"><a class="header-anchor" href="#preview-example-it-should-be-looks-like">[Preview Example] it should be looks like:</a></h3>
<p><img src="https://i.stack.imgur.com/2AUwp.png" alt="Preview Setting"></p>
<h2 id="this-solution-also-fix-vscode-alerts-below" tabindex="-1"><a class="header-anchor" href="#this-solution-also-fix-vscode-alerts-below">This solution also fix vscode alerts below</a></h2>
<ul>
<li>fix vscode alert This may be converted to an async function.</li>
</ul>
