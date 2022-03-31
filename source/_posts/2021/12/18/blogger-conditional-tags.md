---
cover: https://res.cloudinary.com/practicaldev/image/fetch/s--73FnDTzR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://3.bp.blogspot.com/-2x-KTSHQ7Sk/V3fogcBcWjI/AAAAAAAAASk/JIZkwUf6r5QLH3soYaG0q0LeLxp2xjhOACLcB/w1200-h630-p-k-no-nu/blogger-conditioanl-tags-ultimate-blogger-guide.jpg
date: 2021-12-08T19:48:00+07:00
lang: en
category:
  - Programming
  - Blogger
tags:
  - Blogger
  - XML
  - Templates
  - Themes
title: Blogger Conditional Tags
toc: true
uuid: ae9c4084-655b-4888-8bf2-1f716589ab5d
updated: 2022-03-20T20:57:28+07:00
thumbnail: https://res.cloudinary.com/practicaldev/image/fetch/s--73FnDTzR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://3.bp.blogspot.com/-2x-KTSHQ7Sk/V3fogcBcWjI/AAAAAAAAASk/JIZkwUf6r5QLH3soYaG0q0LeLxp2xjhOACLcB/w1200-h630-p-k-no-nu/blogger-conditioanl-tags-ultimate-blogger-guide.jpg
photos:
  - https://res.cloudinary.com/practicaldev/image/fetch/s--73FnDTzR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://3.bp.blogspot.com/-2x-KTSHQ7Sk/V3fogcBcWjI/AAAAAAAAASk/JIZkwUf6r5QLH3soYaG0q0LeLxp2xjhOACLcB/w1200-h630-p-k-no-nu/blogger-conditioanl-tags-ultimate-blogger-guide.jpg
description: Blogger Conditional Tags
subtitle: Blogger Conditional Tags
excerpt: Blogger Conditional Tags
wordcount: 678
---

<h1 id="basic" tabindex="-1"><a class="header-anchor" href="#basic">Basic</a></h1>
<p>Basic blogger conditional tags</p>
<h2 id="homepage" tabindex="-1"><a class="header-anchor" href="#homepage">Homepage</a></h2>
<p>Blogger Conditional Tag for determine current page is homepage</p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.url == data:blog.homepageUrl'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.isHomepage'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="post" tabindex="-1"><a class="header-anchor" href="#post">Post</a></h2>
<p>Blogger Conditional Tag for determine current page is post ex: <a href="http://web-manajemen.blogspot.com/p/privacy.html">http://web-manajemen.blogspot.com/p/privacy.html</a> (<strong>Is Post</strong>)</p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.pageType == &amp;quot;item&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.isPost'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="page" tabindex="-1"><a class="header-anchor" href="#page">Page</a></h2>
<p>Blogger Conditional Tag for determine current page is page or static page (<strong>Is Page Or Static Page</strong>)</p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.pageType == &amp;quot;static_page&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.isPage'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="custom-post-page" tabindex="-1"><a class="header-anchor" href="#custom-post-page">Custom Post Page</a></h2>
<p><code>data:blog.url</code> is the code to display the original opened url. In the latest version can use <code>data:view.url</code>. When the url is the same as the filled url, then the result will be true so that . If you move to a custom domain, the Page Url from blogspot must also be replaced with a custom domain.</p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.url == &amp;quot;Url Post Or Page&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<p>Example: Determine current page is <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93ZWItbWFuYWplbWVuLmJsb2dzcG90LmNvbS8yMDE3LzA0L2luc3RhbC1waHAtY2xpLXBhZGEtYW5kcm9pZC1pbnN0YWxhc2kuaHRtbA==" target="_blank" rel="nofollow noopener">https://web-manajemen.blogspot.com/2017/04/instal-php-cli-pada-android-instalasi.html</a></p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.url == &amp;quot;https://web-manajemen.blogspot.com/2017/04/instal-php-cli-pada-android-instalasi.html&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="index" tabindex="-1"><a class="header-anchor" href="#index">Index</a></h2>
<p>Blogger Conditional Tag for pages that have features to find articles, such as homepage, search, label and archive pages. (<strong>Is Index Blogger Conditional Tag</strong>)</p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.pageType == &amp;quot;index&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.isMultipleItems'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="label" tabindex="-1"><a class="header-anchor" href="#label">Label</a></h2>
<p>Blogger Conditional Tag to display element while on label page (current page is label) ex: <a href="http://web-manajemen.blogspot.com/search/label/Blogger">http://web-manajemen.blogspot.com/search/label/Blogger</a> (<strong>Is label (Tags/Categories)</strong>)</p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.searchLabel'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.isLabelSearch'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="custom-label" tabindex="-1"><a class="header-anchor" href="#custom-label">Custom Label</a></h2>
<p>Blogger Conditional tag to display on the page a predefined label</p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.searchLabel == &amp;quot;Label Name&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.search.label == &amp;quot;Label Name&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="search-page" tabindex="-1"><a class="header-anchor" href="#search-page">Search Page</a></h2>
<p>Blogger conditional tag to display an element when it is on a search page or query data in a blog. ex: <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93ZWItbWFuYWplbWVuLmJsb2dzcG90LmNvbS9zZWFyY2g/cT1JbnN0YWxsK3BocCtjbGk=" target="_blank" rel="nofollow noopener">https://web-manajemen.blogspot.com/search?q=Install+php+cli</a></p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.searchQuery'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.search.query'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="custom-search-page" tabindex="-1"><a class="header-anchor" href="#custom-search-page">Custom Search Page</a></h2>
<p>Blogger conditional tag to display an element when it is on a search page or query data with custom keywords in a blog.</p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.searchQuery == &amp;quot;Keywords&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.search.query == &amp;quot;Keywords&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="archives" tabindex="-1"><a class="header-anchor" href="#archives">Archives</a></h2>
<p>Blogger conditional tag to determine current page is Archive Blog. ex: <a href="http://web-manajemen.blogspot.com/2017/05/">http://web-manajemen.blogspot.com/2017/05/</a></p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.pageType == &amp;quot;archive&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.isArchive'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="error-page-404" tabindex="-1"><a class="header-anchor" href="#error-page-404">Error Page (404)</a></h2>
<p>This blogger conditional tag is used to display a warning that the page you are looking for does not exist or is the result of a url error or 404 not found.</p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.pageType == &amp;quot;error_page&amp;quot;'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.isError'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="layout-preview-page" tabindex="-1"><a class="header-anchor" href="#layout-preview-page">Layout Preview Page</a></h2>
<p>This blogger conditional tag can be used to not display adsense js on page layout (layout) and preview (preview). The goal is of course so that the ad does not appear when the article is opened in preview.</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.isLayoutMode and data:view.isPreview'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="mobile-requests" tabindex="-1"><a class="header-anchor" href="#mobile-requests">Mobile Requests</a></h2>
<p>This blogger conditional tag code will only read for HTML code that is displayed specifically on mobile devices aka HandPhones and Tablets. ex: <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93ZWItbWFuYWplbWVuLmJsb2dzcG90LmNvbS8yMDE3LzA0L2luc3RhbC1waHAtY2xpLXBhZGEtYW5kcm9pZC1pbnN0YWxhc2kuaHRtbD9tPTE=" target="_blank" rel="nofollow noopener">https://web-manajemen.blogspot.com/2017/04/instal-php-cli-pada-android-instalasi.html?m=1</a></p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.isMobileRequest'&gt;&lt;/b:if&gt;
</code></pre>
<h1 id="not-and-or-declaration-function-in-blogger-conditional-tags" tabindex="-1"><a class="header-anchor" href="#not-and-or-declaration-function-in-blogger-conditional-tags">NOT, AND, OR Declaration Function in Blogger Conditional Tags</a></h1>
<p>In using the blogger conditional tag, we can also provide a declaration function on the conditional tag to make it shorter</p>
<h2 id="not" tabindex="-1"><a class="header-anchor" href="#not">NOT</a></h2>
<p>In the use of the blogger conditional tag if it is <strong>NOT</strong> the page in question, which means the code will <strong>NOT</strong> be displayed on the page in question. Add function ! (exclamation mark)</p>
<pre><code class="language-xml">&lt;b:if cond='data:blog.url != data:blog.homepageUrl'&gt;&lt;/b:if&gt;
</code></pre>
<p>or</p>
<pre><code class="language-xml">&lt;b:if cond='!data:view.isPost'&gt;
</code></pre>
<h2 id="and" tabindex="-1"><a class="header-anchor" href="#and">AND</a></h2>
<p>In blogger conditional tag use Condition if both are true. Add <code>AND</code> function</p>
<pre><code class="language-xml">&lt;b:if cond='!data:view.isPost AND data:view.isMultipleItems'&gt;&lt;/b:if&gt;
</code></pre>
<h2 id="or" tabindex="-1"><a class="header-anchor" href="#or">OR</a></h2>
<p>condition if one of them is true. Add <code>OR</code> function</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.isPost OR data:view.isMultipleItems'&gt;
</code></pre>
<p><strong>Addition :</strong>
To concatenate multiple page urls on a specific page tag. If the code like no.11 above is only 1 url, then for multiple urls:</p>
<pre><code class="language-xml">&lt;b:if cond='data:view.url in {&amp;quot;URL page 1&amp;quot;,&amp;quot;URL page 2&amp;quot;,&amp;quot;Next page URL&amp;quot;}'&gt;&lt;/b:if&gt;
</code></pre>
<p>Notice there is a <strong>comma</strong>. On the other hand you can use and, which means that if the use of both or more conditions is true it will be displayed. If one is not correct then it will not be displayed.</p>
<p>Thus a collection of blogger conditional tag codes that I can show you all, good luck and happy experimenting.</p>
<p>See Also:</p>
<ul>
<li><a href="/2017/05/conditional-tags-blogger-for-desktop.html">Conditional Tags For Desktop</a></li>
<li><a href="/2017/05/how-to-add-featured-post-image-slider.html">Add Featured Post Image Slider</a></li>
<li><a href="/2017/05/conditional-tags-for-targeting-on.html">Conditional Tags For Targeting</a></li>
<li><a href="/2017/04/cara-menyembunyikan-javascript-di.html">Menyembunyikan Javascript Di Blogger AMP</a></li>
</ul>
<h3 id="bookmark-this" tabindex="-1"><a class="header-anchor" href="#bookmark-this">Bookmark This</a></h3>
<p><strong>THIS ARTICLE WILL CONTINUE TO BE UPDATED AS THE BLOGGER DEVELOPES FROM TIME TO TIME</strong></p>
