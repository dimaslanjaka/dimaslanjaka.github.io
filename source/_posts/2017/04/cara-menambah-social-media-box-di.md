---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - HTML
comments: true
cover: https://scontent.fsub2-1.fna.fbcdn.net/v/t1.0-9/fr/cp0/e15/q65/17796846_1773189839677671_6977008867135609966_n.png.jpg?efg=eyJpIjoidCJ9&oh=292c21d1c58e8e185a8d6c63dec60c5a&oe=5957C4B8
date: 2017-04-18T01:38:00.000+07:00
lang: en
location: ""
modified: 2017-04-18T01:38:11.173+07:00
subtitle: Cara menambah social media box di blogger AMP
tags:
  - Blogger
  - HTML
  - AMP
title: Cara menambah social media box di blogger AMP
type: post
uuid: c47ff08d-7907-4888-8914-b04d6b6c04d5
webtitle: WMI Gitlab
updated: 2017-04-18T01:38:11+07:00
thumbnail: https://scontent.fsub2-1.fna.fbcdn.net/v/t1.0-9/fr/cp0/e15/q65/17796846_1773189839677671_6977008867135609966_n.png.jpg?efg=eyJpIjoidCJ9&oh=292c21d1c58e8e185a8d6c63dec60c5a&oe=5957C4B8
photos:
  - https://scontent.fsub2-1.fna.fbcdn.net/v/t1.0-9/fr/cp0/e15/q65/17796846_1773189839677671_6977008867135609966_n.png.jpg?efg=eyJpIjoidCJ9&oh=292c21d1c58e8e185a8d6c63dec60c5a&oe=5957C4B8
description: Cara menambah social media box di blogger AMP
excerpt: Cara menambah social media box di blogger AMP
wordcount: 65
---

<br><div class="thumb-post"><noscript><img src="https://scontent.fsub2-1.fna.fbcdn.net/v/t1.0-9/fr/cp0/e15/q65/17796846_1773189839677671_6977008867135609966_n.png.jpg?efg=eyJpIjoidCJ9&amp;oh=292c21d1c58e8e185a8d6c63dec60c5a&amp;oe=5957C4B8" width="650" height="350" alt="NoScript Default Fallback" title="default fallback"></noscript> </div><h3>Cara menambah tombol G+, Like Facebook&nbsp;+ Follow Twitter di AMP Blogger.</h3><div><br></div><div><img src="https://lh3.googleusercontent.com/N-AY2XwXafWq4TQWfua6VyjPVQvTGRdz9CKOHaBl2nu2GVg7zxS886X5giZ9yY2qIjPh=w300"></div><div><br></div><div>Kali ini saya akan share bagaimana cara menambah tombol suka social media di AMP Blogger.<br>Berikut kodenya:<br><br></div><pre class="tr_bq">&lt;amp-iframe width=300 height=122 sandbox='allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox' layout='responsive' frameborder='0' scrolling='no' src='https://source.l3n4r0x.cf/php/social.php?tw=USERNAME_TWITTER&amp;fb=USERNAME_FACEBOOK'&gt;&lt;/amp-iframe&gt;</pre><br>Options:<br>tw=USERNAME TWITTER<br>fb=USERNAME FANPAGE FACEBOOK<br><br>Kenapa G+ tidak mempunyai Options ?.<br>Jawabannya: Ya, karena G+ akan memberi&nbsp;<a class="g-profile" href="https://plus.google.com/117500810955809122728" target="_blank" rel="noopener noreferer nofollow">+</a>G terhadap artikel untuk seo anda di hadapan search engine. (Rating Section).<br><br>Contoh punya saya:<br><br><pre class="tr_bq">&lt;amp-iframe width=300 height=122 sandbox='allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox' layout='responsive' frameborder='0' scrolling='no' src='https://source.l3n4r0x.cf/php/social.php?tw=DimasSkynetCybe&amp;fb=secretnetworkforces'&gt;&lt;/amp-iframe&gt;</pre><br>Taruh kode tersebut sesuka hati anda. Dimanapun tempat nya pasti OK. Sesuaikan sendiri width=xxx nya. Height nya jangan karena itu menggunakan AMP-IFRAME kata lain IFRAME gak bisa se responsive memakai kode lainnya seperti AMP-FORM. Height tersebut sudah sesuai dengan widget height nya. Bila dipanjangkan maka BLANK putih menjalar dibawah Icon Icon itu. DEMO lihat saja blog ini.<br><a href="https://www.blogger.com/blogger.g?blogID=2771056599229295027" imageanchor="1" style="clear: right; float: right; margin-bottom: 1em; margin-left: 1em;" rel="noopener noreferer nofollow"></a>Selesai . Silahkan reload blog anda.<br>Semoga membantu. Jangan lupa share yah