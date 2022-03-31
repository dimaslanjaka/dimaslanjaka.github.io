---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://4.bp.blogspot.com/-G8uvcGY1HKk/XRJ2h07bE2I/AAAAAAAAAZ4/xFxE1oVc6nctLlNdnpbGx-xvqOADFqcfQCLcBGAs/s1600/iconfinder_folder_black_PHP_51814.png
date: 2019-06-26T02:24:00.000+07:00
lang: en
location: ""
modified: 2019-06-26T02:36:59.505+07:00
subtitle: How to automatically create folder if not exists on spesific PATH
tags: []
title: Create Folder Recursive PHP
type: post
uuid: de885efa-8101-4888-85f5-befdd26e92be
webtitle: WMI Gitlab
updated: 2019-06-26T02:36:59+07:00
thumbnail: https://4.bp.blogspot.com/-G8uvcGY1HKk/XRJ2h07bE2I/AAAAAAAAAZ4/xFxE1oVc6nctLlNdnpbGx-xvqOADFqcfQCLcBGAs/s1600/iconfinder_folder_black_PHP_51814.png
photos:
  - https://4.bp.blogspot.com/-G8uvcGY1HKk/XRJ2h07bE2I/AAAAAAAAAZ4/xFxE1oVc6nctLlNdnpbGx-xvqOADFqcfQCLcBGAs/s1600/iconfinder_folder_black_PHP_51814.png
description: How to automatically create folder if not exists on spesific PATH
excerpt: How to automatically create folder if not exists on spesific PATH
wordcount: 124
---

<blockquote><span class="tr-en">How to automatically create folder if not exists on spesific PATH</span><br><span class="tr-id">Bagaimana cara membuat folder secara rekursif bila tidak ada pada spesifik PATH</span></blockquote><img src="https://4.bp.blogspot.com/-G8uvcGY1HKk/XRJ2h07bE2I/AAAAAAAAAZ4/xFxE1oVc6nctLlNdnpbGx-xvqOADFqcfQCLcBGAs/s1600/iconfinder_folder_black_PHP_51814.png" data-original-width="512" data-original-height="512"><pre><br>&lt;?php<br>//<span class="tr-en">define document root first</span> <span class="tr-id">define document root dahulu</span><br>define('APP', $_SERVER['DOCUMENT_ROOT'], true);<br>// [func] path extraction and creation<br>function _folder_($d){<br>    $d = str_replace(APP, '', rtrim($d, '/'));<br>    $explode = explode('/', rtrim($d,'/'));<br>    $explode = array_filter($explode);<br>    $ready = (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN' ? '' : '/');<br>    foreach ($explode as $x) {<br>      $ready = rtrim($ready,'/');<br>      $ready .= '/'.$x;<br>      $status = file_exists(APP.$ready);<br>      if ($status === false){<br>        mdir(APP.$ready);<br>      }<br>    }<br>    return $d;<br>}<br>// [func] create folder permission 777<br>function mdir($x)<br>{<br>  $oldmask = umask(0);<br>  mkdir($x, 0777);<br>  umask($oldmask);<br>}<br><br>//<span class="tr-en">Usage</span> <span class="tr-id">Penggunaan</span><br>$folder_target = <br>?&gt;<br></pre>