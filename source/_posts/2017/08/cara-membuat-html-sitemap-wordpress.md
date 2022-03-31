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
date: 2017-08-05T18:02:00.000+07:00
lang: en
location: ""
modified: 2017-08-05T18:02:00.203+07:00
subtitle: Menjadi pengguna WordPress bertahuntahun saya telah menemukan tidak
  banyak yang bisa salah dengan CMS open source tapi bila Anda memiliki
tags:
  - Wordpress
  - PHP
title: Cara membuat html sitemap wordpress tanpa plugin
type: post
uuid: 8fc54a2e-0266-4888-8b13-5f402223f504
webtitle: WMI Gitlab
updated: 2017-08-05T18:02:00+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Menjadi pengguna WordPress bertahuntahun saya telah menemukan tidak
  banyak yang bisa salah dengan CMS open source tapi bila Anda memiliki
excerpt: Menjadi pengguna WordPress bertahuntahun saya telah menemukan tidak
  banyak yang bisa salah dengan CMS open source tapi bila Anda memiliki
wordcount: 388
---

<div style="background-color: white; box-sizing: border-box; color: #333333; font-family: Lato, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 20px; margin-bottom: 10px;"><span class="notranslate" style="box-sizing: border-box;">Menjadi pengguna WordPress bertahun-tahun saya telah menemukan tidak banyak yang bisa salah dengan CMS open source tapi bila Anda memiliki terlalu banyak plug-in, akan sulit untuk memperbaruinya.</span>&nbsp;<span class="notranslate" style="box-sizing: border-box;">Bila memungkinkan, saya selalu mencoba membangun situs yang tidak akan bergantung pada mereka alasan utama untuk ini.</span></div><ul style="background-color: white; box-sizing: border-box; color: #333333; font-family: Lato, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 14px; margin-bottom: 10px; margin-top: 0px;"><li style="box-sizing: border-box;"><span class="notranslate" style="box-sizing: border-box;">Keamanan yang lebih baik sebagai plug-in adalah sumber utama hacks website</span></li><li style="box-sizing: border-box;"><span class="notranslate" style="box-sizing: border-box;">Tidak ada jaminan plug-in akan dipertahankan atau diperbarui saat versi baru WordPress keluar</span></li><li style="box-sizing: border-box;"><span class="notranslate" style="box-sizing: border-box;">Mereka menyumbat admin</span></li><li style="box-sizing: border-box;"><span class="notranslate" style="box-sizing: border-box;">Mereka tidak selalu bekerja persis seperti yang Anda inginkan</span></li></ul><div style="background-color: white; box-sizing: border-box; color: #333333; font-family: Lato, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 20px; margin-bottom: 10px;"><span class="notranslate" style="box-sizing: border-box;">Berikut adalah sedikit kode yang saya gunakan untuk membuat Peta Situs HTML biasa.</span>&nbsp;<span class="notranslate" style="box-sizing: border-box;">Anda bahkan bisa memodifikasinya untuk menghasilkan sitemap XML juga dengan sedikit kerja.</span></div><div style="background-color: white; box-sizing: border-box; color: #333333; font-family: Lato, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 20px; margin-bottom: 10px;"><span class="notranslate" style="box-sizing: border-box;">Yang harus Anda lakukan adalah menyalin kode berikut ke file functions.php dan akan menambahkan kode singkat HTML Sitemap ke situs Anda.</span>&nbsp;<span class="notranslate" style="box-sizing: border-box;">Hanya menempatkan [&nbsp;<code style="background-color: #f9f2f4; border-radius: 4px; box-sizing: border-box; color: #c7254e; font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; font-size: 18px; padding: 2px 4px;">htmlSitemap</code>&nbsp;] pada halaman yang Anda inginkan untuk muncul.</span></div><pre>/***</pre><pre>*Taruh kode dibawah ini di dalam file functions.php theme anda.<br>***/<br>    function get_html_sitemap( $atts ){<br><br>            $return = '';<br>            $args = array('public'=&gt;1);<br> <br>// If you would like to ignore some post types just add them to the array below<br>            $ignoreposttypes = array('attachment');<br><br>            $post_types = get_post_types( $args, 'objects' ); <br><br>            foreach ( $post_types as $post_type ) {<br>                if( !in_array($post_type-&gt;name,$ignoreposttypes)){<br>                    $return .= '&lt;h2&gt;' . $post_type-&gt;labels-&gt;name.'&lt;/h2&gt;';<br>                    $args = array(<br>                        'posts_per_page'   =&gt; -1,<br>                        'post_type'        =&gt; $post_type-&gt;name,<br>                        'post_status'      =&gt; 'publish'<br>                    );<br>                    $posts_array = get_posts( $args ); <br>                    $return .=  '&lt;ul&gt;';<br>                    foreach($posts_array as $pst){<br>                        $return .=  '&lt;li&gt;&lt;a href="'.get_permalink($pst-&gt;ID).'"&gt;'.$pst-&gt;post_title.'&lt;/a&gt;&lt;/li&gt;';<br>                    }<br>                    $return .=  '&lt;/ul&gt;';<br>                }<br>            }<br><br>        return $return;<br>    }<br>    add_shortcode( 'htmlSitemap', 'get_html_sitemap' );</pre><br><b>Cara penggunaan:</b><br>Cukup buat 1 halaman baru (pages) tambahkan shortcode [htmlSitemap] di mode HTML Editor nya.<br>Selesai. Semoga bermanfaat.