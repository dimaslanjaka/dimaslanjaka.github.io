---
ads: false
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
category:
  - Programming
  - Regular Expression
comments: false
cover: https://www.w3programmers.com/wp-content/uploads/2012/07/regex.jpg
date: 2021-09-22T00:00:00+07:00
lang: en
location: Indonesia
subtitle: Regular Expression is a
tags:
  - RegExp
title: What is RegExp
type: post
uuid: 4cd70405-503d-4888-85a2-55b39642d633
webtitle: RegExp
updated: 2021-12-19T06:34:45+07:00
thumbnail: https://www.w3programmers.com/wp-content/uploads/2012/07/regex.jpg
photos:
  - https://www.w3programmers.com/wp-content/uploads/2012/07/regex.jpg
description: Regular Expression is a
excerpt: Regular Expression is a
wordcount: 1124
---


<h2 id="what-is-regular-expression" tabindex="-1"><a class="header-anchor" href="#what-is-regular-expression">What Is Regular Expression ?</a></h2>
<p>Regular Expression (RegExp) a sequence of symbols and characters expressing a string or pattern to be searched for within a longer piece of text. <a href="https://en.wikipedia.org/wiki/Regular_expression">Read More</a></p>
<h2 id="what-can-a-regular-expression-be-used-for" tabindex="-1"><a class="header-anchor" href="#what-can-a-regular-expression-be-used-for">What can a regular expression be used for ?</a></h2>
<p>A regular expression can be a single character, or a more complicated pattern. Regular expressions can be used to perform all types of text search and text replace operations. /w3schools/i is a regular expression.</p>
<h2 id="which-is-the-best-example-of-a-regex" tabindex="-1"><a class="header-anchor" href="#which-is-the-best-example-of-a-regex">Which is the best example of a regex ?</a></h2>
<ul>
<li>
<p><strong>Anchors — ^ and $</strong></p>
<table>
<thead>
<tr>
<th>RegExp</th>
<th>Explanations</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>^</b>Hello</td>
<td>matches any string that <em>starts with <strong>Hello</strong></em> -&gt;  <a href="https://regex101.com/r/cO8lqs/2">Try it!</a></td>
</tr>
<tr>
<td>world<b>$</b></td>
<td>matches a string that <em>ends with <strong>world</strong></em></td>
</tr>
<tr>
<td><b>^</b>Hello world<b>$</b></td>
<td><em>exact string match</em> (starts and ends with <strong>Hello world</strong>)</td>
</tr>
<tr>
<td>Hello</td>
<td><em>matches any string</em> that has the text <strong>Hello</strong> in it</td>
</tr>
</tbody>
</table>
</li>
<li>
<p><strong>Quantifiers — * + ? and {}</strong></p>
<table>
<thead>
<tr>
<th>RegExp</th>
<th>Explanations</th>
</tr>
</thead>
<tbody>
<tr>
<td>abc*</td>
<td>matches a string that has ab followed by zero or more c -&gt;  <a href="https://regex101.com/r/cO8lqs/1">Try it!</a></td>
</tr>
<tr>
<td>abc+</td>
<td>matches a string that has ab followed by one or more</td>
</tr>
<tr>
<td>abc<b>?</b></td>
<td>matches a string that has ab followed by zero or one</td>
</tr>
<tr>
<td>abc<b>{2}</b></td>
<td>matches a string that has ab followed by 2</td>
</tr>
<tr>
<td>abc<b>{2,}</b></td>
<td>matches a string that has ab followed by 2 or more</td>
</tr>
<tr>
<td>abc<b>{2,5}</b></td>
<td>matches a string that has ab followed by 2 up to 5</td>
</tr>
<tr>
<td>ca<b>(bc)*</b></td>
<td>matches a string that has a followed by zero or more copies of the sequence</td>
</tr>
<tr>
<td>bca<b>(bc){2,5}</b></td>
<td>matches a string that has a followed by 2 up to 5 copies of the sequence bc</td>
</tr>
</tbody>
</table>
</li>
<li>
<p><strong>OR operator — | or []</strong></p>
<table>
<thead>
<tr>
<th>RegExp</th>
<th>Explanations</th>
</tr>
</thead>
<tbody>
<tr>
<td>a(b|c)</td>
<td>matches a string that has <strong><em>a</em> followed by <em>b</em> or <em>c</em></strong> (and captures <strong><em>b</em> or <em>c</em></strong>) -&gt; <a href="https://regex101.com/r/cO8lqs/3">Try it!</a></td>
</tr>
<tr>
<td>a[bc]</td>
<td>same as previous, <strong>but without capturing <em>b</em> or <em>c</em></strong></td>
</tr>
</tbody>
</table>
</li>
<li>
<p><strong>Character classes — \d \w \s and .</strong></p>
<table>
<thead>
<tr>
<th>RegExp</th>
<th>Explanations</th>
</tr>
</thead>
</table>
</li>
</ul>
