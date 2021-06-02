<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/
if(function_exists('dimaslanjaka_safelink')){
} else {
include("func.php");
}
//header('Content-Type: text/html;charset=UTF-8');
//https://www.googleapis.com/youtube/v3/videos?part=snippet&id=IQmW2fXvz8A&fields=items/snippet/title,items/snippet/description&key=AIzaSyCMOA-5fKPxshju1wmEyxYGMHj8PBIpZ8I
$APIky = 'AIzaSyCMOA-5fKPxshju1wmEyxYGMHj8PBIpZ8I'; //API Youtube v3
$YTkyw = "Lawyers And Insurances"; //Keywords YouTube
$JSONyt = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key='.$APIky.'&type=video&videoEmbeddable=any&videoDefinition=high&order=rating&videoLicense=any&autoplay=true&q='.urlencode($YTkyw);
$jsonc = file_get_contents_YT($JSONyt);

$arrX = array("0");
$randIndex = array_rand($arrX);
$RNUM = $arrX[$randIndex];

$get_video_details = json_decode($jsonc);
$videoID = $get_video_details->items[$RNUM]->id->videoId;
$videoTitle = $get_video_details->items[$RNUM]->snippet->title;
$videoDesc = $get_video_details->items[$RNUM]->snippet->description;
$channelTitle = $get_video_details->items[$RNUM]->snippet->channelId;

$srcyt = 'https://www.youtube.com/v/'.$videoID.'?version=3&amp;hl=en_US&amp;rel=0&amp;autohide=1&amp;autoplay=1';
echo '
<div class="jumbotron">
<div class="embed-responsive embed-responsive-16by9">
<embed class="embed-responsive-item" src="'.$srcyt.'" wmode="transparent" type="application/x-shockwave-flash" width="100%" height="100%" allowfullscreen="true" title="'.$videoTitle.'">
</div>
<div class="d-inline-block">
   <div class="panel panel-default">
   <div class="panel-heading">
   <button type="button" class="btn btn-default btn-xs spoiler-trigger" data-toggle="collapse">Show Source Videos</button> <small class="pull-right">Courtesy: <a href="'.$srcyt.'" title="'.$videoTitle.'" rel="nofollow noopener" target="_blank">Youtube</a></small>
   </div>
   <div class="panel-collapse collapse out">
   <div class="panel-body">
   Video Source: <a href="//youtu.be/'.$videoID.'" title="'.$videoTitle.'" rel="nofollow noopener">https://youtu.be/'.$videoID.'</a> ('.$RNUM.').
   </div>
   </div></div>
</div><!--/container-->
</div><!--/JumboTron-->
';
?> 