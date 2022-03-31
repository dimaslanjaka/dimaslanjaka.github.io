---
cover: https://res.cloudinary.com/practicaldev/image/fetch/https://images.ctfassets.net/f20lfrunubsq/3VjnlRLGZqdWhDPENCTGQl/ab3c078638607cf2a3d35f4b0cf10fa1/Screenshot_2019-11-03_at_16.57.11__2_.png
date: 2022-03-30T06:43:38+0000
title: RegExp Match Doesnt Contain Words
updated: 2022-03-30T06:43:38+0000
uuid: 838eebf3-a7ed-4888-884d-2b361639e7c9
category:
  - Uncategorized
tags: []
lang: en
description: RegExp Match Doesnt Contain Words
subtitle: RegExp Match Doesnt Contain Words
excerpt: RegExp Match Doesnt Contain Words
thumbnail: https://res.cloudinary.com/practicaldev/image/fetch/https://images.ctfassets.net/f20lfrunubsq/3VjnlRLGZqdWhDPENCTGQl/ab3c078638607cf2a3d35f4b0cf10fa1/Screenshot_2019-11-03_at_16.57.11__2_.png
photos:
  - https://res.cloudinary.com/practicaldev/image/fetch/https://images.ctfassets.net/f20lfrunubsq/3VjnlRLGZqdWhDPENCTGQl/ab3c078638607cf2a3d35f4b0cf10fa1/Screenshot_2019-11-03_at_16.57.11__2_.png
wordcount: 823
---

<h2 id="reg-ex-to-tell-if-a-string-does-not-contain-a-specific-character" tabindex="-1"><a class="header-anchor" href="#reg-ex-to-tell-if-a-string-does-not-contain-a-specific-character">RegEx to tell if a string does not contain a specific character</a></h2>
<p>Are you trying to test whether or not a string does not contain a character using regular expressions ?
Are you trying:</p>
<ul>
<li>Use Regex to enable the widest range of validations, and</li>
<li>Always look for a positive match (i.e. instead of using !Regex.IsMatch(cell, regexvariable), I wanted to rely on always being able to use Regex.IsMatch(cell, regexvariable) since the majority of DataTables invoking this method will be using the positive match instead of the negative.</li>
</ul>
<h2 id="solution" tabindex="-1"><a class="header-anchor" href="#solution">Solution</a></h2>
<p>I came across this question looking for the same thing but for JavaScript. The expression above did not work in my case, but I came across the below expression which did:</p>
<h3 id="reg-exp" tabindex="-1"><a class="header-anchor" href="#reg-exp">RegExp</a></h3>
<pre><code class="language-reg">^((?!0).)*$
</code></pre>
<h3 id="reg-exp-explanation" tabindex="-1"><a class="header-anchor" href="#reg-exp-explanation">RegExp Explanation</a></h3>
<blockquote>
<ul>
<li>Match whole strings except <code>0</code> (zero)</li>
</ul>
</blockquote>
<h2 id="other-example" tabindex="-1"><a class="header-anchor" href="#other-example">Other example</a></h2>
<p>i want to find and match a <code>string</code> from all <code>local javascript file import statement</code> without <code>.js</code> extension:</p>
<h3 id="reg-exp-1" tabindex="-1"><a class="header-anchor" href="#reg-exp-1">RegExp</a></h3>
<pre><code class="language-regexp">^import.*\/((?!.js).)*([\'\&quot;]);$
</code></pre>
<h4 id="reg-exp-modern-approach" tabindex="-1"><a class="header-anchor" href="#reg-exp-modern-approach">RegExp Modern Approach</a></h4>
<pre><code class="language-regexp">^import.*\/((?!.js).)*(['&quot;]);$
</code></pre>
<h3 id="string-to-match" tabindex="-1"><a class="header-anchor" href="#string-to-match">String to match</a></h3>
<pre><code class="language-js">import notranslate from '../translator/notranslate.js';
import notranslate from '../translator/notranslate'; // &lt;-- i want match this
</code></pre>
<p><img src="https://gcdnb.pbrd.co/images/bdtnVlEUocwy.png?o=1" alt="https://pasteboard.co/bdtnVlEUocwy.png"></p>
<h3 id="reg-exp-explanation-1" tabindex="-1"><a class="header-anchor" href="#reg-exp-explanation-1">RegExp Explanation</a></h3>
<ul>
<li><code>^</code> asserts position at start of a line</li>
<li><code>import</code> matches the characters import literally (case sensitive)</li>
<li><code>((?!.js).)*</code> 1st Capturing Group</li>
<li>
<ul>
<li><code>*</code> matches the previous token between zero and unlimited times, as many times as possible, giving back as needed (greedy)</li>
</ul>
<blockquote>
<p>A repeated capturing group will only capture the last iteration. Put a capturing group around the repeated group to capture all iterations or use a non-capturing group instead if you’re not interested in the data</p>
</blockquote>
</li>
<li>
<ul>
<li><code>/</code> matches the character <code>/</code> with literally (case sensitive)</li>
</ul>
</li>
<li><code>(?!.js)</code> Negative Lookahead
<blockquote>
<p>Assert that the Regex below does not match</p>
</blockquote>
</li>
<li>
<ul>
<li><code>.</code> matches any character (except for line terminators)</li>
</ul>
</li>
<li>
<ul>
<li><code>js</code> matches the characters js literally (case sensitive)</li>
</ul>
</li>
<li><code>.</code> matches any character (except for line terminators)</li>
<li><code>([\'\&quot;])</code> 2nd Capturing Group</li>
<li>
<ul>
<li><code>[\'\&quot;]</code> Match a single character present in the list below</li>
</ul>
</li>
<li>
<ul>
<li><code>\'</code> matches the character <code>'</code> with literally (case sensitive)</li>
</ul>
</li>
<li>
<ul>
<li><code>\&quot;</code> matches the character <code>&quot;</code> with literally (case sensitive)</li>
</ul>
</li>
<li><code>;</code> matches the character <code>;</code> with literally (case sensitive)</li>
<li><code>$</code> asserts position at the end of a line</li>
</ul>
<p>Global pattern flags</p>
<ul>
<li><code>g</code> modifier: <strong>g</strong>lobal. All matches (don’t return after first match)</li>
<li><code>m</code> modifier: <strong>m</strong>ulti line. Causes <code>^</code> and <code>$</code> to match the begin/end of each line (not only begin/end of string)</li>
</ul>
<h2 id="reg-exp-online-playground" tabindex="-1"><a class="header-anchor" href="#reg-exp-online-playground">RegExp Online Playground</a></h2>
<p><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9yZWdleDEwMS5jb20vci90cDFlUVo=" target="_blank" rel="nofollow noopener">RegExp Playground <strong>regex101</strong></a></p>
