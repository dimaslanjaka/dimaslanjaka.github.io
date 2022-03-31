---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBSJoxKxnt9n6oeRW1QcYweC0Y5-T_t-bexOhydafI1lnSIDQx
date: 2017-04-26T04:30:00.000+07:00
lang: en
location: ""
modified: 2020-01-09T04:00:58.675+07:00
subtitle: h2>Bagaimana cara menambah syntax highlighter dengan prettyprint tanpa
  mengurangi waktu response loading blog.</h2><img height=207
tags:
  - Wordpress
  - JS
  - Blogger
  - HTML
  - Blogging
title: Cara menambah syntax highlighter dengan prettyprint di blog tanpa
  mengurangi kecepatan loading website 100 Work Tested
type: post
uuid: 91708df3-7078-4888-850d-3231dff222a2
webtitle: WMI Gitlab
updated: 2020-01-09T04:00:58+07:00
thumbnail: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBSJoxKxnt9n6oeRW1QcYweC0Y5-T_t-bexOhydafI1lnSIDQx
photos:
  - https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBSJoxKxnt9n6oeRW1QcYweC0Y5-T_t-bexOhydafI1lnSIDQx
description: h2>Bagaimana cara menambah syntax highlighter dengan prettyprint
  tanpa mengurangi waktu response loading blog.</h2><img height=207
excerpt: h2>Bagaimana cara menambah syntax highlighter dengan prettyprint tanpa
  mengurangi waktu response loading blog.</h2><img height=207
wordcount: 22
---

<h2>Bagaimana cara menambah syntax highlighter dengan prettyprint tanpa mengurangi waktu response loading blog.</h2><img height="207" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBSJoxKxnt9n6oeRW1QcYweC0Y5-T_t-bexOhydafI1lnSIDQx" width="320"><br>Nah kali ini saya akan membagikan script syntax highlighter untuk blog tanpa mengurangi kecepatan website sedikitpun. Bisa untuk blogger wordpress joomla drupal dan lainnya.<br><br>Ga pake lama ini dia script nya:<br><br><pre class="lang-html">&lt;script&gt;function loadCSS(e,t,a){var n=window.document.createElement("link"),o=t||window.document.getElementsByTagName("script")[0];n.rel="stylesheet",n.href=e,n.media="only x",o.parentNode.insertBefore(n,o),setTimeout(function(){n.media=a||"all"})}function loadPrettyPrint(e){var t=document.createElement("script");t.src="https://cdn.statically.io/gh/google/code-prettify/master/loader/run_prettify.js";var a=document.getElementsByTagName("head")[0],n=!1;t.onload=t.onreadystatechange=function(){n||this.readyState&amp;&amp;"loaded"!=this.readyState&amp;&amp;"complete"!=this.readyState||(n=!0,"function"==typeof e&amp;&amp;e(),t.onload=t.onreadystatechange=null)},a.appendChild(t)}loadPrettyPrint(function(){loadCSS("https://cdn.statically.io/gh/google/code-prettify/f1c3473a/styles/sunburst.css");var e=document.querySelectorAll("pre");if(e.length)for(var t=0;t&lt;e.length;t++)e[t].classList.toggle("prettyprint")});&lt;/script&gt;</pre><br><b>Deskripsi</b>:<br><br>Tutorial blogger.<br><br>1. Buka dashboard blog anda -&gt; edit template HTML (blogger) -&gt;<br><br>1.2. Tambah kode &lt;script src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'/&gt; diatas &lt;/head&gt; NAMUN: bila template anda sudah ada kode pemanggil jquery framework tidak usah dipanggil lagi cukup tambahkan script diatas &lt;/body&gt; saja.<br><br>1.3. Hapus CSS yang merender &lt;pre&gt;, &lt;pre&gt;&lt;code&gt;, &lt;code&gt; yang ada di b:skin template anda (agar mengurangi ukuran page blog anda tentunya untuk mempercepat loading website anda). Misal seperti ini pre{background:#…} pre code{font-family:…} code{font-color:…} . KENAPA Harus dihapus: yah karena syntax highlighter ini sudah mempunyai css tersebut.<br><br>1.4. Ganti template syntax highlighter yang saya tandai dengan warna 'orange' dengan template yang sudah saya sediakan di <a href="http://source.l3n4r0x.cf/css/prettyprint/" rel="noopener noreferer nofollow">http://source.l3n4r0x.cf/css/prettyprint/</a> ambil salah satu saja. Lalu ganti <a href="https://source.l3n4r0x.cf/css/prettyprint/sunbrust.css" rel="noopener noreferer nofollow">https://source.l3n4r0x.cf/css/prettyprint/sunbrust.css</a> dengan template yang anda inginkan.<br><br>1.5. Taruh kode diatas diatas &lt;/body&gt;<br><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-EBq5Eox1_Ax1QuEwHUvZZ7ZMFVQ3LfHrSaOB-dXD08TbL9JLarkQpXjY"><br>Save template. Selesai .<br><br>Tutorial untuk wordpress:<br><br>2. Buka dashboard wordpress -&gt; Theme editor -&gt; edit footer.php -&gt; tambahkan script diatas dibagian atas &lt;/body&gt; -&gt; ULANGI BAGIAN 1.2 , 1.3, 1.4 DIATAS.<br><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-EBq5Eox1_Ax1QuEwHUvZZ7ZMFVQ3LfHrSaOB-dXD08TbL9JLarkQpXjY"><br>Cara memanggil syntax highlighter :<br><br>Cukup anda ketik &lt;pre&gt;KODE HTML CSS JS PHP RUBY DAN LAIN LAIN&lt;/pre&gt; atau &lt;pre&gt;&lt;code&gt;KODE HTML CSS JS RUBY PHP DAN LAIN LAIN&lt;/code&gt;&lt;/pre&gt; atau &lt;code&gt;KODE HTML CSS JS JAVASCRIPT DAN LAIN LAIN&lt;/code&gt;<br><br>&nbsp;Simple 100% work.<br><br>Semoga artikel ini membantu. Share yah jangan lupa loh....<br><br>Incoming Terms:&nbsp;Cara menambah syntax highlighter dengan prettyprint di blog tanpa mengurangi kecepatan loading blog | prettyprint blogger | defer prettyprint | mempercepat prettyprint di blog | mempercepat loading blog yang menggunakan syntax highlighter