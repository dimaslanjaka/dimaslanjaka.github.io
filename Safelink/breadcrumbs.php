<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/
if(function_exists('dimaslanjaka_safelink')){
} else {
include("func.php");
}

echo "<ul class=\"breadcrumb\" id=\"crumbs\" itemscope=\"\" itemtype=\"http://schema.org/BreadcrumbList\">";
$breadcrumbs_parts = explode("/", dirname($url_no_params));
echo "<li class=\"breadcrumb-item\" itemprop='itemListElement' itemscope='' itemtype='http://schema.org/ListItem'><a itemprop='item' href=\"/\"><span itemprop='name'>Home</span></a></li>";
foreach ($breadcrumbs_parts as $breadcrumbs_key => $breadcrumbs_dir) {
switch ($breadcrumbs_dir) {
case "about": $breadcrumbs_label = "About Us"; break;
default: $breadcrumbs_label = ucwords($breadcrumbs_dir); break;
}
$url = "";
for ($breadcrumbs_i = 1; $breadcrumbs_i <= $breadcrumbs_key; $breadcrumbs_i++)
{ $url = $breadcrumbs_parts[$breadcrumbs_i] . "/"; }
if ($breadcrumbs_dir != "")
echo "<li class=\"breadcrumb-item\" itemprop='itemListElement' itemscope='' itemtype='http://schema.org/ListItem'><a href=\"/$url\" itemprop='item'><span itemprop='name'>$breadcrumbs_label</span></a></li>";
}

$variable = ob_get_clean();
$res = preg_match("/<title>(.*)<\/title>/siU", $variable, $title_matches);
$title = preg_replace('/\s+/', ' ', $title_matches[1]);
$title = trim($title);
echo $variable."<li class=\"breadcrumb-item active\" itemprop='itemListElement' itemscope='' itemtype='http://schema.org/ListItem'><a href=\"".$actual_link."\" itemprop='item'><span itemprop='name'>".$title."</span></a></li>";
echo "</ul>";
?>