---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2017-10-04T23:36:00.000+07:00
lang: en
location: ""
modified: 2017-10-04T23:36:03.439+07:00
subtitle: Edit your functions.php of your themes. This also work on amp plugin
  wp AMP ninja -gt; Edit on functions.php too. <br /><h3>Codes
tags:
  - Wordpress
  - PHP
title: Get first post WORDPRESS tutorial
type: post
uuid: 45f43922-4882-4888-8a2d-eb9133ac6054
webtitle: WMI Gitlab
updated: 2017-10-04T23:36:03+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: Edit your functions.php of your themes. This also work on amp
  plugin wp AMP ninja -gt; Edit on functions.php too. <br /><h3>Codes
excerpt: Edit your functions.php of your themes. This also work on amp plugin wp
  AMP ninja -gt; Edit on functions.php too. <br /><h3>Codes
wordcount: 875
---

Edit your functions.php of your themes. This also work on amp plugin (wp AMP ninja) -&gt; Edit on functions.php too. <br><h3>Codes 1:</h3><pre>&lt;?php<br><br> /*<br><br>These functions are great for WordPress sites with posts and media that have been imported. Some images are   featured images, some in the content itself, and of the content images, some are internal, others external. These images are grabbed to use at the correct size for archive/homepage thumbnails*/<br><br>  1) Look for featured image, show if present<br>  2) Otherwise look for the first image in the content (whether internal or external)<br>  3) Check for an attachment ID, if present, show image at correct dimensions<br>  4) Otherwise show image at normal URL<br><br>  $size = post thumbnail / custom image sizes<br>  $url = return a URL or full image tag<br>*/<br><br><br>  /*Find the image id from a URL*/<br><br>function url_get_image_id($image_url) {<br>    global $wpdb;<br>    $attachment = $wpdb-&gt;get_col($wpdb-&gt;prepare("SELECT ID FROM $wpdb-&gt;posts WHERE guid='%s';", $image_url )); <br>    return $attachment[0]; <br>}<br><br>/* determine whether post has a featured image, if not, find the first image inside the post content, $size passes the thumbnail size, $url determines whether to return a URL or a full image tag*/<br><br>function checkImageType($size, $type) {<br> <br> global $post;<br> $content = $post-&gt;post_content;     <br> $first_img = '';<br> ob_start();<br> ob_end_clean();<br> $output = preg_match_all('/&lt;img.+src=[\'"]([^\'"]+)[\'"].*&gt;/i', $content, $matches);<br> $first_img = $matches[1][0];<br> <br> /*If there's a featured image, show it*/<br>   <br> if (get_the_post_thumbnail($post_id) != '' ) {<br>  if($type=='url') {<br>         the_post_thumbnail_url($size);<br>        } else {<br>         the_post_thumbnail($size);<br>        }<br>    } else {<br>     <br>     /*No featured image, so we get the first image inside the post content*/<br>     <br>     if ($first_img) {<br>      <br>      //let's get the correct image dimensions<br> <br>   $image_id = url_get_image_id($first_img);<br>   $image_thumb = wp_get_attachment_image_src($image_id, $size);<br>   <br>   // if we've found an image ID, correctly display it<br>   <br>   if($image_thumb) { <br>       if($type=='url') {<br>           echo $image_thumb[0];<br>          } else {<br>           <br>           echo '&lt;img src="'.$image_thumb[0].'" alt="'.get_the_title().'"/&gt;';<br>          }<br>      } else {<br>       <br>       //if no image (i.e. from an external source), echo the original URL<br>       <br>       if($type=='url') {<br>           echo $first_img;<br>          } else {<br>           <br>           echo '&lt;img src="'.$first_img.'" alt="'.get_the_title().'"/&gt;';<br>          }<br>              <br>      }<br>       }<br>    }<br>}<br><br>// Sample Uses<br><br>checkImageType('full', 'url'); <br><br>// Returns: http://domain.com/image-url.jpg)<br><br>checkImageType('post-thumb');<br><br>// Returns: &lt;img src="http://domain.com/image-url.jpg" alt="Alt text"&gt;<br><br>?&gt;</pre><h3>Codes 2:</h3><pre>/*<br> * Display Image from the_post_thumbnail or the first image of a post else display a default Image<br> * Chose the size from "thumbnail", "medium", "large", "full" or your own defined size using filters.<br> * USAGE: &lt;?php echo my_image_display(); ?&gt;<br> */<br><br>function my_image_display($size = 'full') {<br> if (has_post_thumbnail()) {<br>  $image_id = get_post_thumbnail_id();<br>  $image_url = wp_get_attachment_image_src($image_id, $size);<br>  $image_url = $image_url[0];<br> } else {<br>  global $post, $posts;<br>  $image_url = '';<br>  ob_start();<br>  ob_end_clean();<br>  $output = preg_match_all('/&lt;img.+src=[\'"]([^\'"]+)[\'"].*&gt;/i', $post-&gt;post_content, $matches);<br>  $image_url = $matches [1] [0];<br>  <br>  //Defines a default image<br>  if(empty($image_url)){<br>   $image_url = get_bloginfo('template_url') . "/img/default.jpg";<br>  }<br> }<br> return $image_url;<br>}</pre><br><b>so Get first post WORDPRESS tutorial, hopefully useful.</b>