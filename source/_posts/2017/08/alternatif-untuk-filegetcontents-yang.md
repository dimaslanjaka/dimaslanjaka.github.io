---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2017-08-19T10:35:00.000+07:00
lang: en
location: ""
modified: 2017-08-19T10:35:47.282+07:00
subtitle: h1> cURL alternatif untuk file_get_contents melalui HTTP </h1>Dalam
  versi PHP yang lebih baru, Anda akan sering mendapati bahwa mengambil
tags:
  - PHP
title: Alternatif untuk file_get_contents yang disabled on server by allow_url_fopen=0
type: post
uuid: 9c4fa736-48de-4888-8896-432a54d4b1b0
webtitle: WMI Gitlab
updated: 2017-08-19T10:35:47+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: h1> cURL alternatif untuk file_get_contents melalui HTTP </h1>Dalam
  versi PHP yang lebih baru, Anda akan sering mendapati bahwa mengambil
excerpt: h1> cURL alternatif untuk file_get_contents melalui HTTP </h1>Dalam
  versi PHP yang lebih baru, Anda akan sering mendapati bahwa mengambil
wordcount: 271
---

<h1> cURL alternatif untuk file_get_contents melalui HTTP </h1>Dalam versi PHP yang lebih baru, Anda akan sering mendapati bahwa mengambil file jarak jauh menggunakan    <tt> fopen    </tt> atau    <tt> file_get_contents    </tt> telah dinonaktifkan. Disini kita hadirkan sebuah fungsi    <tt> http_get_contents    </tt> menggunakan cURL yang bisa berfungsi sebagai solusi. <br><h2 id="section_0"> 1. Fungsi http_get_contents </h2>Ini saat ini sedang dalam proses dengan beberapa penyempurnaan dalam pipa.<br><br><pre>function http_get_contents($url)<br>{<br>  $ch = curl_init();<br>  curl_setopt($ch, CURLOPT_TIMEOUT, 1);<br>  curl_setopt($ch, CURLOPT_URL, $url);<br>  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);<br>  if(FALSE === ($retval = curl_exec($ch))) {<br>    error_log(curl_error($ch));<br>  } else {<br>    return $retval;<br>  }<br>}<br></pre><br><strong>Jika perpustakaan cURL belum diaktifkan di PHP anda akan mendapatkan      <em>fungsi     </em> error yang      <em>tidak ditemukan     </em> mencoba memanggil      <tt> curl_ini</tt></strong><strong><tt>t.</tt></strong><br><br>Versi masa depan akan mencakup penanganan kesalahan dan penguraian header respons HTTP yang lebih baik, untuk mendeteksi tautan yang rusak dan mengikuti pengalihan misalnya. <br><h2 id="section_1"> 2. Contoh Penggunaan </h2>Blok kode berikut memeriksa apakah alamat file dimulai dengan    <tt> http    </tt> dan bersyarat memanggil    <tt> http_get_contents    </tt> atau    <tt> file_get_contents    </tt> :    <br><pre>$file = "http://www.the-art-of-web.com/rss.xml";<br>$contents = preg_match("/^http/", $file) ? http_get_contents($file) : file_get_contents($file);<br>  </pre><strong> Pendekatan cURL juga bisa digunakan untuk FTP dan protokol lainnya.    </strong><br><h2 id="section_2"> 3. Peningkatan Fungsi </h2>Setelah meletakkan fungsi ini melalui langkah-langkahnya, kami menemukan beberapa perbaikan. <br>Pertama, Anda sekarang dapat menyediakan serangkaian pilihan tambahan untuk disertakan dalam permintaan dengan mengirimkan array asosiatif (    <tt> $ opts    </tt> ), dan kedua, nilai default disertakan untuk    <tt> HTTP_USER_AGENT    </tt> dengan menggunakan nama domain pemanggil sebagai string User Agent.<br><pre>function http_get_contents($url, $opts = [])<br>{<br>  $ch = curl_init();<br>  curl_setopt($ch, CURLOPT_TIMEOUT, 5);<br>  curl_setopt($ch, CURLOPT_USERAGENT, "{$_SERVER['SERVER_NAME']}");<br>  curl_setopt($ch, CURLOPT_URL, $url);<br>  if(is_array($opts) &amp;&amp; $opts) {<br>    foreach($opts as $key =&gt; $val) {<br>      curl_setopt($ch, $key, $val);<br>    }<br>  }<br>  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);<br>  if(FALSE === ($retval = curl_exec($ch))) {<br>    error_log(curl_error($ch));<br>  } else {<br>    return $retval;<br>  }<br>}<br></pre><br>Melewati string User Agent yang tidak kosong adalah praktik yang baik, dan terkadang diharuskan untuk menghindari permintaan Anda diblokir. <br><h2 id="section_3"> 4. Beberapa contoh </h2>Dalam contoh ini kita bisa mengatasi antarmuka IPv6 buggy di Facebook dengan memaksa koneksi berlangsung di atas IPv4. <br><pre>&lt;?PHP<br>  $endpoint = "https://graph.facebook.com/?id=" . urlencode($uri);<br>  $curlopts = [<br>    CURLOPT_IPRESOLVE =&gt; CURL_IPRESOLVE_V4<br>  ];<br>  $retval = http_get_contents($endpoint, $curlopts);<br>?&gt;<br></pre><br>Mengambil dan mengurai     header respons Apache     untuk permintaan HTTP: <br><pre>&lt;?PHP<br>  function read_header($ch, $string)<br>  {<br>    // function to receive and process the respons headers<br>  }<br><br>  $tmp = http_get_contents($url, [<br>    CURLOPT_HEADERFUNCTION =&gt; __NAMESPACE__ . '\read_header',<br>    CURLOPT_NOBODY =&gt; true<br>  ]);<br>?&gt;<br></pre><br><strong> Perhatikan bahwa dalam semua kasus, konstanta CURLOPT_ * tidak boleh dikutip.    </strong>    <strong> Mereka bukan string, tapi sebenarnya bilangan bulat 'lama'.    </strong><br><h2 id="section_4">5. Kode Lengkap (Bila Digabung) : </h2>Alternatif 1<br><pre>&lt;?php<br>function http_get_contents($url)<br>{<br>  $ch = curl_init();<br>  curl_setopt($ch, CURLOPT_TIMEOUT, 1);<br>  curl_setopt($ch, CURLOPT_URL, $url);<br>  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);<br>  if(FALSE === ($retval = curl_exec($ch))) {<br>    error_log(curl_error($ch));<br>  } else {<br>    return $retval;<br>  }<br>}<br>$getcontents = preg_match("/^http/", $url) ? http_get_contents($url) : file_get_contents($url);<br>echo $getcontents;<br>?&gt;<br></pre><h2 id="section_5">6. Referensi </h2><ul><li>      <a href="https://translate.googleusercontent.com/translate_c?depth=1&amp;nv=1&amp;rurl=translate.google.com&amp;sl=auto&amp;sp=nmt4&amp;tl=id&amp;u=https://curl.haxx.se/&amp;usg=ALkJrhhPnTySpeC1PBtSMBsqjBbcMg6LUA" target="_blank" rel="noopener noreferer nofollow"> Curl dan libcurl      </a>    </li></ul>