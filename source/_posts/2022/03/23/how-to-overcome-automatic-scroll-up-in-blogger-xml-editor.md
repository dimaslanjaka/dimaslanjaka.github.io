---
cover: https://i.ytimg.com/vi/Py9zUa4MGgs/maxresdefault.jpg
date: 2022-03-23T13:27:20+0000
title: How to Overcome Automatic Scroll Up in Blogger XML Editor
toc: true
updated: 2022-03-23T20:27:20+0000
uuid: 2668bdf8-b6e4-4888-8824-6686c5f999d3
webtitle: Blogger
category:
  - Uncategorized
tags: []
lang: en
description: How to Overcome Automatic Scroll Up in Blogger XML Editor
subtitle: How to Overcome Automatic Scroll Up in Blogger XML Editor
excerpt: How to Overcome Automatic Scroll Up in Blogger XML Editor
thumbnail: https://i.ytimg.com/vi/Py9zUa4MGgs/maxresdefault.jpg
photos:
  - https://i.ytimg.com/vi/Py9zUa4MGgs/maxresdefault.jpg
wordcount: 537
---

<h2 id="blogger-update-information" tabindex="-1"><a class="header-anchor" href="#blogger-update-information">Blogger update information</a></h2>
<p>Some time ago, blogger made an update about the XML editor system. The most striking thing about this update is the change in the behavior of the XML Editor in storing and validating XML code. In the current system, all code processing activities are carried out directly. Such as sorting attributes alphabetically, parsing special characters, and so on.</p>
<blockquote>
<p>On the current system, when the save process is complete, the code that we see in the XML editor is already the final code. This is unlike the previous system which did code processing after the editor interface was closed.</p>
</blockquote>
<h2 id="problem" tabindex="-1"><a class="header-anchor" href="#problem">Problem</a></h2>
<p>On this new system, there is an issue related to the behavior of the XML editor when the XML save process is complete. The editor interface will automatically scroll to the top every time the save process is complete. This is certainly very disturbing because we have to go back and forth to the last editing position. Especially for XML code that already involves tens of thousands of code, this will greatly hinder editing activities.</p>
<h3 id="forum-problem-posts" tabindex="-1"><a class="header-anchor" href="#forum-problem-posts">Forum Problem Posts</a></h3>
<ul>
<li><a href="https://support.google.com/blogger/thread/117960083/html-editor-auto-scroll-up?hl=en">https://support.google.com/blogger/thread/117960083/html-editor-auto-scroll-up?hl=en</a></li>
<li><a href="https://www.quora.com/How-do-I-make-my-blog-header-stop-showing-up-when-scrolling-up">https://www.quora.com/How-do-I-make-my-blog-header-stop-showing-up-when-scrolling-up</a></li>
</ul>
<h2 id="solution" tabindex="-1"><a class="header-anchor" href="#solution">Solution</a></h2>
<p>This problem can be solved by injecting javascript code to prevent the blogger auto scroll event effect. Simply put, when the auto scroll is running and the scroll position is at the top, this function will reset the scroll position to the last position before saving. Function injection is performed using the browser’s <em>bookmark system</em>.</p>
<h3 id="bookmark-script" tabindex="-1"><a class="header-anchor" href="#bookmark-script">Bookmark Script</a></h3>
<pre><code class="language-javascript">javascript:(()=&gt;{/*Bookmark script by webmanajemen.com: Prevent Auto Scroll Up Blogger XML Editor*/const e=window,l=document,t=e=&gt;l.getElementsByClassName(e),n=(e,...l)=&gt;{for(const t of l)e.appendChild(t)},r=e=&gt;l.createElement(e),s=t(&quot;xLh0Gb&quot;),o=t(&quot;CodeMirror-scroll&quot;),a=s?s[s.length-1]:null,c=o?o[o.length-1]:null;if(a&amp;&amp;c){let t,s,o,i;{const e=r(&quot;style&quot;),t=l.getElementsByTagName(&quot;head&quot;)[0],s=[&quot;.{{s}}{background:#f5f5f5;color:#f57c00;font-size:12px;padding:10px 15px;border-radius: 60px;margin-right:10px;transition:all .3s;font-weight:bold}&quot;];n(e,l.createTextNode(s.join(&quot;&quot;).replace(/{{s}}/g,&quot;w-prevent-reset-scroll&quot;))),n(t,e),(i=r(&quot;div&quot;)).className=&quot;w-prevent-reset-scroll&quot;,i.innerHTML=&quot;AUTO SCROLL DISABLED&quot;,((e,l)=&gt;{const t=e.firstElementChild;t?e.insertBefore(l,t):e.appendChild(l)})(a,i)}const d=()=&gt;c.scrollTop,p=()=&gt;c.scrollLeft,f=()=&gt;{if(!t){(e=&gt;{const t=l.getElementsByClassName(e)[0];return t||null})(&quot;aGJE1b&quot;)&amp;&amp;(s=d(),o=p(),0!==s&amp;&amp;(t=!0,c.onscroll=g,e.clearInterval(f)))}},g=()=&gt;{c.scrollTo(o,s),c.onscroll=m,t=!1,e.setInterval(f,500)},m=()=&gt;{};e.setInterval(f,500)}})();
</code></pre>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation">Installation</a></h2>
<p>The point of this installation process is to add a Bookmark in the browser by putting the script above as a URL. This installation guide uses the Google Chrome browser with the following steps:</p>
<ul>
<li>In the <strong>Bookmarks bar</strong> of the browser, <strong>right click</strong> and <strong>select Add page</strong>.
<img src="https://1.bp.blogspot.com/-8DVJrMbfG_I/YNXB85JPCaI/AAAAAAAACuo/xc_8EXjGhmI8G1njfTpAbrDt5Q72vYmpwCLcBGAsYHQ/s0/1%2B-%2BTambahkan%2Bbookmark%2B-%2Bmencegah%2Bauto%2Bscroll%2Beditor%2Bblogger.jpg" alt="Step 1"></li>
<li>Write name the bookmark as you wish in the <strong>Name section</strong>. <strong>Copy and Paste</strong> all the <strong><a href="#bookmark-script">bookmark script</a></strong> code above into the <strong>URL section</strong>. Finally, save bookmarks to complete the installation process.</li>
</ul>
<blockquote>
<p>If there are no errors, the bookmark you added should already be in the Bookmarks bar of the browser. More or less like this: <img src="https://1.bp.blogspot.com/-_spg3vQpyCE/YNXCm-IjgDI/AAAAAAAACu4/IQuz06PqKXQ6un9K_WwWBjBAoZXtQDd5wCLcBGAsYHQ/s0/3%2B-%2Bcara%2Bmencegah%2Botomatis%2Bscroll%2Bke%2Batas%2Beditor%2Bblogger.jpg" alt="Verify"></p>
</blockquote>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage">Usage</a></h2>
<p>On the <strong>XML editor tab</strong>, Click <strong>Created Bookmark</strong>. You will see a new indicator element added at the top of the XML editor informing you that the auto scroll prevention function is enabled. <img src="https://1.bp.blogspot.com/-1UNTCj961BM/YNXDebBxJeI/AAAAAAAACvA/8vax0JxwoZky02ApbXxTNmSDiNlccyTpgCLcBGAsYHQ/s0/4%2B-%2Bhasil%2Bsolusi%2Bmencegah%2Botomatis%2Bscroll%2Bke%2Batas%2Beditor%2Bblogger.jpg" alt=""></p>
<h2 id="browser-support" tabindex="-1"><a class="header-anchor" href="#browser-support">Browser support</a></h2>
<p>This function has been tested and works well on the latest version of <strong>Google Chrome</strong> browser. For other browsers, please try.</p>
