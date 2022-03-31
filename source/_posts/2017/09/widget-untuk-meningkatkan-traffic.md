---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2017-09-04T08:57:00.000+07:00
lang: en
location: ""
modified: 2019-07-22T03:23:17.956+07:00
subtitle: Widget untuk meningkatkan traffic blogger
tags:
  - JS
  - Blogger
title: Widget untuk meningkatkan traffic blogger
type: post
uuid: 1a8db9a0-4d3e-4888-8fc6-cbc0d515ed62
webtitle: WMI Gitlab
updated: 2019-07-22T03:23:17+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Widget untuk meningkatkan traffic blogger
excerpt: Widget untuk meningkatkan traffic blogger
wordcount: 640
---

Hari ini saya akan share widget untuk meningkatkan traffic blog setiap harinya.<br>Script ini bertujuan agar webcrawler ikut membuat tester untuk website anda.<br><br>Ga pake lama ikuti tutorial dibawah ini:<br><br>1. Buka dashboard blogger --&gt; Layout --&gt; Cari mau dibagian manakah yang ingin anda tambah kan widget ini. Saran saya sih di footer atau sidebar. --&gt; add widget html/javascript --&gt; masukkan kode berikut ini:<br><br><pre class="tr_bq">&lt;script async='async' type="text/javascript"&gt;<br>function getQueryVariable(variable) {<br><span class="Apple-tab-span" style="white-space: pre;"> </span>var query = window.location.search.substring(1);<br><span class="Apple-tab-span" style="white-space: pre;"> </span>var vars = query.split("&amp;");<br><span class="Apple-tab-span" style="white-space: pre;"> </span>for (var i=0;i&lt;vars.length;i++) {<br><span class="Apple-tab-span" style="white-space: pre;">  </span>var pair = vars[i].split("=");<br><span class="Apple-tab-span" style="white-space: pre;">  </span>if(pair[0] == variable){return pair[1];}<br><span class="Apple-tab-span" style="white-space: pre;"> </span>}<br><span class="Apple-tab-span" style="white-space: pre;"> </span>return(false);<br>}<br>var ref = getQueryVariable("target"); //add target= in last iframe source<br>var url = window.location.href;<br>var host = window.location.hostname;<br>&nbsp;<br>document.write('&lt;a target="_blank" href="https://geopeeker.com/fetch/?url=' + url + '" rel="follow" alt="geopeeker" title="geopeeker"&gt;Geopeeker&lt;/a&gt; | &lt;a target="_blank" href="https://www.browserling.com/browse/win/7/chrome/58/' + url + '" target="_blank" alt="chrome58" title="chrome58"&gt;chrome58&lt;/a&gt; | &lt;a href="http://free.pagepeeker.com/v2/thumbs.php?size=x&amp;url=' + host + '" alt="pagepeeker" title="pagepeeker"&gt;Pagepeeker&lt;/a&gt; | &lt;a href="https://seositecheckup.com/seo-audit/site-loading-speed-test/' + url + '" target="_blank" title="seositecheckup" alt="seositecheckup"&gt;Seo Site Checkup&lt;/a&gt; | &lt;a rel="nofollow" rel="noreferrer"href="https://performance.sucuri.net/domain/' + host + '" rel="follow" alt="sucuri" title="sucuri"&gt;Sucuri Performance&lt;/a&gt; | &lt;a rel="nofollow" rel="noreferrer"href="http://www.monitis.com/pageload/?url=' + url + '" rel="follow" alt="monitis" title="monitis"&gt;Monitis Test&lt;/a&gt; | &lt;a href="http://googleweblight.com/?lite_url=' + url + '" rel="follow" alt="googleweblight" title="googleweblight"&gt;Googleweblight&lt;/a&gt; | &lt;a alt="mobile test" title="mobile test" target="_blank" rel="nofollow" href="https://search.google.com/search-console/mobile-friendly?url=' + url + '"&gt;Mobile Test&lt;/a&gt; | &lt;a alt="pagespeed" title="pagespeed" target="_blank" rel="nofollow" href="https://developers.google.com/speed/pagespeed/insights/?hl=id&amp;url=' + url + '"&gt;Pagespeed Insight&lt;/a&gt; | &lt;a alt="google cache" title="google cache" target="_blank" rel="nofollow" href="https://webcache.googleusercontent.com/search?q=cache:' + url + '"&gt;Cache&lt;/a&gt; | &lt;a alt="web archive" title="web archive" target="_blank" rel="nofollow" href="https://web.archive.org/save/_embed/' + url + '"&gt;Archive&lt;/a&gt; | &lt;a target="_blank" rel="nofollow" alt="Structure" title="Structure" href="https://search.google.com/structured-data/testing-tool/u/0/#url=' + url + '"&gt;Structure&lt;/a&gt; | &lt;a href="view-source:' + url + '"&gt;Source&lt;/a&gt; | &lt;a target="_blank" rel="nofollow" title="copyscape test" alt="copyscape test" href="http://www.copyscape.com/?q=' + url + '"&gt;Copyscape&lt;/a&gt; | &lt;a target="_blank" rel="nofollow" title="copyscape test" alt="AMP TEST" href="https://search.google.com/search-console/amp?url=' + url + '"&gt;AMP Test&lt;/a&gt;');<br>&lt;/script&gt;</pre><br>Save widget.<br><br><blockquote class="tr_bq">NOTE: tambah kode pemanggil jquery &lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"&gt;&lt;/script&gt; diatas &lt;/head&gt;. Namun, bila template anda sudah memilikinya ga usah di tambah lagi pemanggil jquery tersebut.</blockquote><br><blockquote class="tr_bq">NOTE 2: Bila ingin webcrawler mengikuti fungsi widget. Ubah rel="nofollow" diatas dengan rel="follow", yang belum ada rel="follow" tambahkan saja.</blockquote><br>Selesai. Semoga bermanfaat.