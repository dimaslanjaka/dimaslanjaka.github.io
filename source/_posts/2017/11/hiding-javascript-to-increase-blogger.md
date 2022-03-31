---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://lh5.googleusercontent.com/proxy/zOJPQmOxXy895GIkyGjPcsnz3xVCQZGUJhgMGWk2BJS4JNQcjbpMUA9IeG5TdHv9Yv0q5USG8ipopidYGRGZUZgo-yGy2zPcevf0iMrMACluVNuYUgrAOQ=w300-h300-nc
date: 2017-11-18T13:56:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.862+07:00
subtitle: Me often find comments on blogs Mascots inquiring about blogger
  widgets that can not be performed, such as the blogs stat
tags:
  - JS
  - Blogger
title: Hiding javascript to increase blogger blog speed
type: post
uuid: 03edbb56-cb36-4888-8644-056f684badbd
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://lh5.googleusercontent.com/proxy/zOJPQmOxXy895GIkyGjPcsnz3xVCQZGUJhgMGWk2BJS4JNQcjbpMUA9IeG5TdHv9Yv0q5USG8ipopidYGRGZUZgo-yGy2zPcevf0iMrMACluVNuYUgrAOQ=w300-h300-nc
photos:
  - https://lh5.googleusercontent.com/proxy/zOJPQmOxXy895GIkyGjPcsnz3xVCQZGUJhgMGWk2BJS4JNQcjbpMUA9IeG5TdHv9Yv0q5USG8ipopidYGRGZUZgo-yGy2zPcevf0iMrMACluVNuYUgrAOQ=w300-h300-nc
description: Me often find comments on blogs Mascots inquiring about blogger
  widgets that can not be performed, such as the blogs stat
excerpt: Me often find comments on blogs Mascots inquiring about blogger widgets
  that can not be performed, such as the blogs stat
wordcount: 672
---

<div><div>Me often find comments on blogs Mascots inquiring about blogger<br>            widgets that can not be performed, such as the blog's stat widgets<br>            and more. Well that's because Maskolis add a code that hides<br>            JavaScript Widget widget Blogger so that all bloggers are using<br>            JavaScript automatically become unworkable.<br>        </div><div></div><div><img height="320" src="https://lh5.googleusercontent.com/proxy/zOJPQmOxXy895GIkyGjPcsnz3xVCQZGUJhgMGWk2BJS4JNQcjbpMUA9IeG5TdHv9Yv0q5USG8ipopidYGRGZUZgo-yGy2zPcevf0iMrMACluVNuYUgrAOQ=w300-h300-nc" width="320"><br>        </div></div><div><div></div></div><div><div>It turned out that this is done in order to speed up the loading of<br>            the blog. With the existence of this code, the browser can not<br>            recognize native JavaScript code Blogger.As we have seen, that the<br>            amount of JavaScript code in the blog, the more burdensome loading<br>            the blog.<br>        </div></div><div><div></div></div><div><div>Perhaps some of you ask what the hell that Blogger Widget<br>            Javascript? If you look at the page source of your blog as CTRL +<br>            U, then you will see at the bottom of the HTML template you like<br>            the code below.<br>        </div></div><div><div></div></div><div><pre><code>&lt;script type="text/javascript" src="//www.blogger.com/static/v1/widgets/1384195903-widgets.js"&gt;&lt;/script&gt;</code></pre></div><div></div><div><div>And there are some code below to above the &lt;/ body&gt;. Now the<br>            codes are hidden.For example, please look at the page source of<br>            this page at the bottom.Definitely you will see the above code and<br>            some code underneath the green all. That's because there is a code<br>            that hides the code on top of the brower so javascript links do not<br>            appear as live links.<br>        </div></div><div><div></div></div><div><div>Javascript code that hides Blogger Widget is as below:<br>        </div></div><div><div></div></div><div><pre><code>&amp;lt;!--&lt;/body&gt;--&amp;gt;&amp;lt;/body&amp;gt;</code></pre></div><div><div></div></div><div><div>Well for those of you who have a blog and want to speed up the<br>            loading and want to use the code above, please change the code<br>            &lt;/ body&gt; in the bottom edit HTML code above. After that<br>            please check by looking at the source page. If the Javascript code<br>            Widget Blogger above there at the bottom was green all, it means<br>            you've successfully hide Blogger Widget Javascript.<br>        </div><div></div><div>But if you want to use the widget blogger and it can not be<br>            displayed or an error, let alone check the HTML template of your<br>            blog. Who know the maker of your blog's template using this trick.<br>            If your blog template using &amp; lt;!-&lt;/<br>            body&gt;-&amp;gt;&amp;lt;/body&amp;gt; this, please replace the<br>            &lt;/ body&gt;.<br>        </div></div>