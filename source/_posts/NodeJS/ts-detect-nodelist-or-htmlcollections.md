---
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
  image: https://i.pinimg.com/564x/32/bc/65/32bc65e19220728fb290249059a7242a.jpg
category:
  - Programming
  - JS
comments: true
cover: https://i.ytimg.com/vi/ubNP6fbT2Ac/maxresdefault.jpg
date: 2021-11-28T07:00:00+07:00
keywords:
  - typescript
  - NodeListOf
  - HTMLCollectionOf
lang: en
location: Indonesia
subtitle: How to detect HTMLCollection/NodeList in JavaScript/Typescript?
tags:
  - TS
  - JS
title: HTMLCollection/NodeList in JavaScript/Typescript?
toc: false
type: post
uuid: 2aa96bcf-7d7a-4888-875f-1cced5ac4938
webtitle: NodeJS
updated: 2021-12-18T21:07:09+07:00
thumbnail: https://i.ytimg.com/vi/ubNP6fbT2Ac/maxresdefault.jpg
photos:
  - https://i.ytimg.com/vi/ubNP6fbT2Ac/maxresdefault.jpg
description: How to detect HTMLCollection/NodeList in JavaScript/Typescript?
excerpt: How to detect HTMLCollection/NodeList in JavaScript/Typescript?
wordcount: 172
---

<h1 id="how-to-detect-html-collection-node-list-in-java-script-typescript" tabindex="-1"><a class="header-anchor" href="#how-to-detect-html-collection-node-list-in-java-script-typescript">How to detect HTMLCollection/NodeList in JavaScript/Typescript?</a></h1>
<p>Detecting HTML Collection or NodeList in typescript.</p>
<h2 id="html-collection-detect" tabindex="-1"><a class="header-anchor" href="#html-collection-detect">HTMLCollection Detect</a></h2>
<pre><code class="language-javascript">// check if variable is instance of HTMLCollection
HTMLCollection.prototype.isPrototypeOf(variable)
</code></pre>
<h2 id="node-list-detect" tabindex="-1"><a class="header-anchor" href="#node-list-detect">NodeList Detect</a></h2>
<pre><code class="language-javascript">// check if variable is instance of NodeList
NodeList.prototype.isPrototypeOf(variable)
</code></pre>
<h2 id="typescript-comparator-example" tabindex="-1"><a class="header-anchor" href="#typescript-comparator-example">Typescript Comparator Example</a></h2>
<pre><code class="language-typescript">let loaders: NodeListOf&lt;Element&gt; | HTMLCollectionOf&lt;Element&gt;;
loaders = document.getElementsByClassName(&quot;className&quot;); // will return typeof HTMLCollectionOf&lt;Element&gt;
loaders = document.querySelectorAll(&quot;[class*='className']&quot;); // will return typeof NodeListOf&lt;Element&gt;
if (HTMLCollection.prototype.isPrototypeOf(this.loaders)) {
  console.log('loaders is instanceof HTMLCollection');
} else if (NodeList.prototype.isPrototypeOf(this.loaders)) {
  console.log('loaders is instanceof NodeList');
}
</code></pre>
<h2 id="typescript-how-to-iterate-nodelist-or-html-collection-variable-type" tabindex="-1"><a class="header-anchor" href="#typescript-how-to-iterate-nodelist-or-html-collection-variable-type">Typescript how to iterate Nodelist or HTMLCollection variable type</a></h2>
<h3 id="wrong-bad" tabindex="-1"><a class="header-anchor" href="#wrong-bad">Wrong/Bad</a></h3>
<pre><code class="language-typescript">loaders.forEach((el) =&gt; {
  console.log(el);
});
</code></pre>
<blockquote>
<p>codes above will thrown:</p>
<p>Property ‘forEach’ does not exist on type <code>NodeListOf&lt;Element&gt; | HTMLCollectionOf&lt;Element&gt;</code>.</p>
<p>Property ‘forEach’ does not exist on type <code>HTMLCollectionOf&lt;Element&gt;</code>. ts(2339)</p>
</blockquote>
<h3 id="good" tabindex="-1"><a class="header-anchor" href="#good">Good</a></h3>
<pre><code class="language-typescript">let loaders: NodeListOf&lt;Element&gt; | HTMLCollectionOf&lt;Element&gt;;
loaders = document.getElementsByClassName(&quot;className&quot;); // will return typeof HTMLCollectionOf&lt;Element&gt;
loaders = document.querySelectorAll(&quot;[class*='className']&quot;); // will return typeof NodeListOf&lt;Element&gt;
for (let index = 0; index &lt; loaders.length; index++) {
  const element: Element = loaders.item(index); // or loaders[index]
  console.log(element);
}
</code></pre>
