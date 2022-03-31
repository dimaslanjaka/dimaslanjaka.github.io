---
author:
  nick: Unknown
  link: https://www.blogger.com/profile/00073980860956332189
  email: noreply@blogger.com
category:
  - Programming
  - HTML
comments: true
cover: https://2.bp.blogspot.com/-zFYfhcEw2zU/UWfLii_MNyI/AAAAAAAAYC0/8x-A-h5Gbsg/s640/share+this.jpg
date: 2017-08-27T07:15:00.000+07:00
lang: en
location: ""
modified: 2017-08-27T07:15:12.677+07:00
subtitle: If you feel loading a blog a bit heavy or slow, one of the causes is
  the presence of javascript. Maybe one of them is
tags:
  - Blogger
  - HTML
  - Blogging
title: How to Create Social Share Buttons Without Javascript
type: post
uuid: cb4a3dd0-3336-4888-812c-3070394f4e79
webtitle: WMI Gitlab
updated: 2017-08-27T07:15:12+07:00
thumbnail: https://2.bp.blogspot.com/-zFYfhcEw2zU/UWfLii_MNyI/AAAAAAAAYC0/8x-A-h5Gbsg/s640/share+this.jpg
photos:
  - https://2.bp.blogspot.com/-zFYfhcEw2zU/UWfLii_MNyI/AAAAAAAAYC0/8x-A-h5Gbsg/s640/share+this.jpg
description: If you feel loading a blog a bit heavy or slow, one of the causes
  is the presence of javascript. Maybe one of them is
excerpt: If you feel loading a blog a bit heavy or slow, one of the causes is
  the presence of javascript. Maybe one of them is
wordcount: 559
---

<div>If you feel loading a blog a bit heavy or slow, one of the causes is         the presence of javascript. Maybe one of them is         <a href="http://translate.googleusercontent.com/translate_c?depth=1&amp;nv=1&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=http://www.kompiajaib.com/2013/04/membuat-social-share-buttons-tanpa.html&amp;usg=ALkJrhihEXhHEleKNMnpPHACMOAlPoQs8g" title="Create Social Share Buttons Without Javascript" rel="noopener noreferer nofollow">            social share buttons         </a>        on your blog.     </div><div></div><div>Usually we use social share buttons from third parties like AddThis.com         and others.Well to reduce the loading loading blog, you can replace         this social share buttons with social share button without javascript.     </div><div></div><div>This means that share buttons are built using CSS code by including         links for sharing articles to social media such as Facebook, Twitter,         and Google+.     </div><div></div><img alt="Social Share Buttons" height="282" src="https://2.bp.blogspot.com/-zFYfhcEw2zU/UWfLii_MNyI/AAAAAAAAYC0/8x-A-h5Gbsg/s640/share+this.jpg" title="Create Social Share Buttons Without Javascript" width="640"><br><div></div><div>If you are interested in trying to use it, please copy the code below:     </div><div></div><div>1. Social Share Buttons Without Javascript With Images.     <br><pre>&lt;b:if cond='data:blog.pageType == &amp;quot;item&amp;quot;'&gt;<br>&lt;div style='border-top:3px solid #ccc; border-bottom:1px solid #ddd; width:100%;height:35px;text-align:left;font:normal 11px Arial;color:#333;margin:10px 0;padding:10px 0 5px'&gt;<br>&lt;div style='float:left;padding:6px 0 10px 0;margin-right:15px;font:bold 14px Arial;color:#777'&gt;<br>&lt;strong&gt;Share this article&lt;/strong&gt; : <br>&lt;/div&gt;<br>&lt;a expr:href='&amp;quot;http://www.facebook.com/sharer.php?u=&amp;quot; + data:post.url' target='_blank' title='Share to Facebook'&gt;&lt;img alt='Facebook' height='30' src='https://lh3.googleusercontent.com/-ErgrNe7VaTM/T4ywntBsxGI/AAAAAAAAJHA/79YM4bBqnf4/s57/Facebook%2520alt%25202.png' width='30' title='Share to Facebook'/&gt;&lt;/a&gt; &lt;a expr:href='&amp;quot;http://twitter.com/share?url=&amp;quot; + data:post.url' style='margin-left:10px' target='_blank' title='Share to Twitter'&gt;&lt;img alt='Twitter' height='30' src='https://lh5.googleusercontent.com/-jZW7xfQfo5c/T4ywo5r5yBI/AAAAAAAAJHM/4ZtK0i8IXyA/s57/Twitter%2520alt%25204.png' width='30' title='Share to Twitter'/&gt;&lt;/a&gt; &lt;a expr:href='&amp;quot;https://plus.google.com/share?url=&amp;quot; + data:post.url' style='margin-left:10px' target='_blank' title='Share to Google+'&gt;&lt;img alt='Google+' height='30' src='https://lh5.googleusercontent.com/-l682ZOmTPl8/T4ywn1Z13TI/AAAAAAAAJG8/ncHs61veQOo/s57/Google%252B%2520alt%25202.png' width='30' title='Share to Google+'/&gt;&lt;/a&gt;<br>&lt;/div&gt;<br>&lt;/b:if&gt;</pre></div><div>2. Social Share Buttons Without Javascript Pure CSS.     </div><div></div><div><pre><code>&lt;b:if cond='data:blog.pageType == &amp;quot;item&amp;quot;'&gt;<br>&lt;div style='border-top:3px solid #ccc;border-bottom:1px solid #ddd;width:100%;height:24px;text-align:left;font:normal 11px Arial;color:#333;margin:10px 0;padding:10px 0 5px'&gt;<br>&lt;div style='float:left;padding:1px 0;margin-right:15px;font:bold 13px Arial;color:#777'&gt;<br>&lt;strong&gt;Share this article&lt;/strong&gt; :<br>&lt;/div&gt;<br>&lt;a expr:href='&amp;quot;http://www.facebook.com/sharer.php?u=&amp;quot; + data:post.url' target='_blank' title='Share to Facebook' style='color: #fff; background: #3b5998; text-decoration: none; border: 1px solid #313c7d; padding: 3px; border-radius: 3px; font-family: arial, verdana, sans-serif; font-size: 13px; line-height: 20px;'&gt;Share on fb&lt;/a&gt; &lt;a expr:href='&amp;quot;http://twitter.com/share?url=&amp;quot; + data:post.url' target='_blank' title='Share to Twitter' style='color: #fff; background: #4099FF; text-decoration: none; border: 1px solid #3a8be8; padding: 3px; border-radius: 3px; font-family: arial, verdana, sans-serif; font-size: 13px; line-height: 20px;'&gt;Tweet&lt;/a&gt; &lt;a expr:href='&amp;quot;https://plus.google.com/share?url=&amp;quot; + data:post.url' target='_blank' title='Share to Google+' style='color: #fff; background: #c0361a; text-decoration: none; border: 1px solid #9c2c15; padding: 3px; border-radius: 3px;font-family: arial, verdana, sans-serif; font-size: 13px; line-height: 20px;'&gt;Share on G+&lt;/a&gt;<br>&lt;/div&gt;<br>&lt;/b:if&gt;</code></pre></div><div></div><div>You just replace your old         <a href="http://translate.googleusercontent.com/translate_c?depth=1&amp;nv=1&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=http://www.kompiajaib.com/2013/04/membuat-social-share-buttons-tanpa.html&amp;usg=ALkJrhihEXhHEleKNMnpPHACMOAlPoQs8g" title="Create Social Share Buttons Without Javascript" rel="noopener noreferer nofollow">            social share buttons         </a>        HTML code with one of the code above.     </div><div></div><div>Actually you can create more, can be with your own pictures or add         hover effect, and others, so it looks might be better.Hopefully with         this power of creativity and your imagination grows.     <br>If you want more complete visit his blog mas Fajrin Ilham H. blog is         Master Jin         <a href="http://translate.googleusercontent.com/translate_c?depth=1&amp;nv=1&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=http://mas-jin.blogspot.com/2013/04/tombol-share-mirip-blog-mas-sugeng.html&amp;usg=ALkJrhjCY0yjcpiYmai-va9SpqjAL4O5lw" rel="noopener noreferer nofollow" title="Master Jin">            HERE         </a>        .     </div>