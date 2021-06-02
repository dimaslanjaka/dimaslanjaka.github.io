<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/
$transdate = date('d-m-Y', time());
//echo $transdate;
$month = date('m');
if($month == 12){
$p_title = "Donate Car for Tax Credit";
$p_desc = "";
$p_key = "";
$p_density = "Sell Annuity Payment";
   } else if($month == 11){ 
$p_title = "Hard drive Data Recovery Services";
$p_desc = "";
$p_key = "";
$p_density = "";
   } else if($month == 10){ 
$p_title = "Structures Annuity Settlement";
$p_desc = "";
$p_key = "";
$p_density = "";
   } else if($month == 9){ 
$p_title = "Home Phone Internet Bundle";
$p_desc = "";
$p_key = "";
$p_density = "";
   } else if($month == 8){ 
$p_title = "How to Donate A Car in California";
$p_desc = "";
$p_key = "";
$p_density = "";
   } else if($month == 7){ 
$p_title = "PHD on Counseling Education";
$p_desc = "";
$p_key = "";
$p_density = "";
   } else if($month == 6){ 
$p_title = "Donate Car to Charity California";
$p_desc = "";
$p_key = "";
$p_density = "";
   } else if($month == 5){ 
$p_title = "Register Free Domains";
$p_desc = "";
$p_key = "";
$p_density = "";
   } else if($month == 4){ 
$p_title = "World Trade Center Footage";
$p_desc = "";
$p_key = "";
$p_density = "";
   } else if($month == 3){ 
//echo "<br />March";
$p_title = "Compare Gas and Electricity Prices in Ireland";
$p_desc = "FREE Gas and Electricity Comparison Tool. Accredited by Commission for Regulation of Utilities. Don't Overpay on Your Utility Bills. SWITCH to the CHEAPEST Energy Plan";
$p_key = "switch electricity, switch gas, change electricity supplier, change gas supplier, change dual fuel supplier, switch, comparison, online";
$p_density = "Gas and Electricity";
   } else if($month == 2){ 
//echo "<br />February";
$p_title = "Qs Distance Autocar Insurance";
$p_desc = "Atlanta, GA Personal Injury lawyers with detailed profiles and recommendations. Find your Atlanta, GA Personal Injury Attorney or Law Firm.";
$p_key = "Personal, Injury, Lawyers, Law Firms, insurance, QS Distance, Cheap Car Insurance, Cheap Auto Insurance";
$p_density = "Insurance";
   } else if($month == 1){ 
$p_title = "Donate Your Car for Kids";
$p_desc = "";
$p_key = "";
$p_density = "";
   }

echo '
<title>'.$p_title.'</title>
<meta name="robots" content="noindex, nofollow"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
<meta name="description" content="'.$p_desc.'"/>
<meta name="title" content="'.$p_title.'"/>
<meta content="'.$p_key.'" name="keywords"/>
<!-- Schema.org markup for Google+ -->
<meta itemprop="name" content="'.$p_title.'"/>
<meta itemprop="description" content="'.$p_desc.'"/>
<meta itemprop="image" content="http://i.imgur.com/4rggJAz.jpg"/>

<!-- Twitter Card data -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@publisher_handle">
<meta name="twitter:title" content="'.$p_title.'">
<meta name="twitter:description" content="'.$p_desc.'">
<meta name="twitter:creator" content="@DimasSkynetCybe">
<!-- Twitter summary card with large image must be at least 280x150px -->
<meta name="twitter:image:src" content="http://urlz.fr/6Aog">

<!-- Open Graph data -->
<meta property="og:title" content="'.$p_title.'" />
<meta property="og:type" content="article" />
<meta property="og:url" content="'.$actual_link.'" />
<meta property="og:image" content="http://urlz.fr/6Aog" />
<meta property="og:description" content="'.$p_desc.'" />
<meta property="og:site_name" content="'.$p_title.'" />
<meta property="article:published_time" content="2013-09-17T05:59:00+01:00" />
<meta property="article:modified_time" content="2013-09-16T19:08:47+01:00" />
<meta property="article:section" content="'.$p_title.'" />
<meta property="article:tag" content="'.$p_key.'" />
<meta content="100001995776790" property="fb:admins" />
<meta content="2220160424875815" property="fb:app_id" />
<link href="https://plus.google.com/108171489708218648681" rel="author" />
<link href="https://plus.google.com/108171489708218648681" rel="publisher" />
';
   ?>