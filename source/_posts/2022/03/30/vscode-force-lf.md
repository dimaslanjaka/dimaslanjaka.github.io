---
cover: https://miro.medium.com/max/1400/1*HSXWWE7wkg9phEJ7ImhT2Q.jpeg
date: 2022-03-29T20:32:29+0000
title: Force Change ALl End Of Line VSCode To LF
updated: 2022-03-29T20:32:29+0000
uuid: 2f56d454-ee7d-4888-838d-8c92369290cb
category:
  - Uncategorized
tags: []
lang: en
description: Force Change ALl End Of Line VSCode To LF
subtitle: Force Change ALl End Of Line VSCode To LF
excerpt: Force Change ALl End Of Line VSCode To LF
thumbnail: https://miro.medium.com/max/1400/1*HSXWWE7wkg9phEJ7ImhT2Q.jpeg
photos:
  - https://miro.medium.com/max/1400/1*HSXWWE7wkg9phEJ7ImhT2Q.jpeg
wordcount: 51
---

<h2 id="git-change-all-crlf-to-lf-for-vscode" tabindex="-1"><a class="header-anchor" href="#git-change-all-crlf-to-lf-for-vscode">Git change all crlf to lf for vscode</a></h2>
<pre><code class="language-shell">git add -A
git commit -m &quot;Commit Message Before Changing End Of Line&quot;
git push
# begin changing end of line globally
git config core.autocrlf false
git rm --cached -r .
git reset --hard
</code></pre>
<h2 id="change-vs-code-settings-json-option" tabindex="-1"><a class="header-anchor" href="#change-vs-code-settings-json-option">Change VSCode <code>settings.json</code> Option</a></h2>
<pre><code class="language-json">{
  &quot;files.eol&quot;: &quot;\n&quot;
}
</code></pre>
<p><img src="https://imgs.developpaper.com/imgs/287058866-5bfb8bd1d4851_articlex.png" alt="Preview settings.json"></p>
