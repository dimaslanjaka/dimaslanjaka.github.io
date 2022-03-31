---
author:
  nick: Dimas Lanjaka
  link: https://www.blogger.com/profile/07981649157148639830
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://parzibyte.me/blog/wp-content/uploads/2018/11/Configuraci%C3%B3n-httpd-en-termux-Android.jpg
date: 2021-06-02T20:52:00.004+07:00
lang: en
location: ""
modified: 2021-06-02T21:48:37.630+07:00
subtitle: php apache setup on android with Termux without root Download Termux
  allow installation from unknwon sources and
tags:
  - PHP
  - Android
  - Tips & Tricks
title: Install XAMPP/LAMPP On Android Non-Root
type: post
uuid: fe9bd82e-f555-4888-8952-a281475f8148
webtitle: WMI Gitlab
updated: 2021-06-02T21:48:37+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://parzibyte.me/blog/wp-content/uploads/2018/11/Configuraci%C3%B3n-httpd-en-termux-Android.jpg
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://parzibyte.me/blog/wp-content/uploads/2018/11/Configuraci%C3%B3n-httpd-en-termux-Android.jpg
description: php apache setup on android with Termux without root Download
  Termux allow installation from unknwon sources and
excerpt: php apache setup on android with Termux without root Download Termux
  allow installation from unknwon sources and
wordcount: 1083
---

<div id="bootstrap-wrapper">
  <h2 id="php-apache-setup-on-android-with-termux-without-root-">php apache setup on android with Termux (without root)</h2>
  <ul>
    <li>
      <a href="https://f-droid.org/repository/browse/?fdid=com.termux" rel="noopener noreferer nofollow"> Download Termux </a> (allow
      installation from unknwon sources and install the termux app)
    </li>
<li> <a href="https://www.mediafire.com/file/v3d4nk933le6t1u/htdocs.rar/file">Example htdocs files</a>
  </ul>
  <h2 id="termux-setup-steps">Termux Setup Steps</h2>
  <ul>
    <li>
      update packages (If it asks you, choose yes in both cases.)
      <pre><code class="lang-bash">apt <span class="hljs-keyword">update</span> -y &amp;&amp; apt <span class="hljs-keyword">upgrade</span> -y<br>  </code></pre>
    </li>
    <li>Install Apache and PHP 7</li>
  </ul>
  <p>
    There is as of now a bundle that serves to introduce these two things together. That is, through apache PHP documents are prepared. To
    introduce our LAMPP on Android we will run:
  </p>
  <pre><code class="lang-bash">apt <span class="hljs-keyword">install</span> php-apache<br>  </code></pre>
  <p>That will install apache, PHP and a few libraries that will permit us to join the two things.</p>
  <ul>
    <li>configure apache to process the PHP files</li>
  </ul>
  <p>
    We are going to configure the httpd.conf file. Attention here, because the route is important. The apache configuration file is in
    <code>/data/data/com.termux/files/usr/etc/apache2/httpd.conf</code>
  </p>
  <p>You can change to that folder with:</p>
  <pre><code class="lang-bash">cd <span class="hljs-regexp">/data/</span>data<span class="hljs-regexp">/com.termux/</span>files<span class="hljs-regexp">/usr/</span>etc<span class="hljs-regexp">/apache2/</span><br>  </code></pre>
  <p>Then open the file with nano:</p>
  <pre><code class="lang-bash"><span class="hljs-selector-tag">nano</span> <span class="hljs-selector-tag">httpd</span><span class="hljs-selector-class">.conf</span><br>  </code></pre>
  <ul>
    <li>Load PHP module</li>
  </ul>
  <p>on httpd.conf, scroll down until you see string start with <strong>LoadModule</strong>. Then add new line and type bellow code:</p>
  <pre><code class="lang-conf">LoadModule php7_module <span class="hljs-regexp">/data/</span>data<span class="hljs-regexp">/com.termux/</span>files<span class="hljs-regexp">/usr/</span>libexec<span class="hljs-regexp">/apache2/</span>libphp7.so<br>  </code></pre>
  <ul>
    <li>Set handler</li>
  </ul>
  <p>Add new line after <code>LoadModule php7_module</code> and type bellow code:</p>
  <pre><code class="lang-conf"><span class="hljs-section">&lt;FilesMatch \.php$&gt;</span><br>    <span class="hljs-attribute"><span class="hljs-nomarkup">SetHandler</span></span> application/x-httpd-php<br>  <span class="hljs-section">&lt;/FilesMatch&gt;</span><br>  </code></pre>
  <p>
    We are revealing to Apache that records that conform to a standard articulation/regex (where the document is one of PHP) are prepared by
    a controller.
  </p>
  <p>
    Now above steps looks like:
    <img
      src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://parzibyte.me/blog/wp-content/uploads/2018/11/Configuraci%C3%B3n-httpd-en-termux-Android.jpg"
      alt="Preview" />
  </p>
  <ul>
    <li>Change Index</li>
  </ul>
  <p>Scroll again, and find text contains <code>DirectoryIndex index.html</code>. Looks like bellow:</p>
  <pre><code class="lang-conf"><span class="hljs-section">&lt;IfModule dir_module&gt;</span><br>    <span class="hljs-attribute">DirectoryIndex</span> index.html<br>  <span class="hljs-section">&lt;/IfModule&gt;</span><br>  </code></pre>
  <p>Change extension <code>html</code> to <code>php</code>, seem looks like bellow:</p>
  <pre><code class="lang-conf"><span class="hljs-section">&lt;IfModule dir_module&gt;</span><br>    <span class="hljs-attribute">DirectoryIndex</span> index.php<br>  <span class="hljs-section">&lt;/IfModule&gt;</span><br>  </code></pre>
  <p>We do this to advise apache to serve index.php over index.html (this is a change and that doesn't mean we can not serve HTML).</p>
  <p>
    For instance, in the event that we visit <code>example.com</code> apache will default to index.html, rather this change will serve
    index.php. Save changes and close the record. <code>CRTL+X -&gt; Save Dont Rename</code>
  </p>
  <ul>
    <li>Write first index.php on public directory</li>
  </ul>
  <p>Our htdocs located in <code>/data/data/com.termux/files/usr/share/apache2/default-site/htdocs</code>. Just type bellow code:</p>
  <pre><code>cd <span class="hljs-regexp">/data/</span>data<span class="hljs-regexp">/com.termux/</span>files<span class="hljs-regexp">/usr/</span>share<span class="hljs-regexp">/apache2/</span><span class="hljs-keyword">default</span>-site/htdocs<br>  nano index.php<br>  </code></pre>
  <p>Write your first php code or any text. I suggest type bellow code:</p>
  <pre><code class="lang-php"><span class="php"><span class="hljs-meta">&lt;?php</span><br>  phpinfo();<br>  <span class="hljs-meta">?&gt;</span></span><br>  </code></pre>
  <p>Now save it. <code>CTRL+X -&gt; Save don't rename</code></p>
  <ul>
    <li>Start apache</li>
  </ul>
  <p>To start apache daemon, type bellow commands:</p>
  <pre><code class="lang-bash">apachectl <span class="hljs-literal">start</span><br>  </code></pre>
  <p>On the off chance that it doesn't show errors at that point all is well.</p>
  <p>
    apache is running a threaded mpm but your php module is not compiled to be threadsafe, How to fix ?
    <a
      href="/2021/06/fix-apache-wont-run-on-android.html"
      alt="How to fix apache is running a threaded mpm but your php module is not compiled to be 		threadsafe"
      >See here</a
    >
    <br />
    Fix error retrieving pid file apache. <a href="/2021/06/fix-error-retrieving-pid-file-on-termux.html">See here</a>
  </p>
  <div class="mt-3">
    See also:
    <ul>
      <li><a href="/2017/04/instal-php-cli-pada-android-instalasi.html" rel="follow"> Install php cli on android root </a></li>
    </ul>
  </div>
</div>
<style></style>
<script>
  hljs.initHighlightingOnLoad();
</script>
