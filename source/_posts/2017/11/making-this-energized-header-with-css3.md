---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://netdna-webdesignerdepot-com.cdn.ampproject.org/i/s/netdna.webdesignerdepot.com/uploads/2014/05/thumbnail8.jpg
date: 2017-11-19T10:00:00.000+07:00
lang: en
location: ""
modified: 2017-11-19T10:00:12.194+07:00
subtitle: Making this energized header with CSS3 properties
tags:
  - CSS
title: Making this energized header with CSS3 properties
type: post
uuid: 2d00c7aa-0dc4-4888-89ce-220967f64c96
webtitle: WMI Gitlab
updated: 2017-11-19T10:00:12+07:00
thumbnail: https://netdna-webdesignerdepot-com.cdn.ampproject.org/i/s/netdna.webdesignerdepot.com/uploads/2014/05/thumbnail8.jpg
photos:
  - https://netdna-webdesignerdepot-com.cdn.ampproject.org/i/s/netdna.webdesignerdepot.com/uploads/2014/05/thumbnail8.jpg
description: Making this energized header with CSS3 properties
excerpt: Making this energized header with CSS3 properties
wordcount: 710
---

<img alt="thumbnail" src="https://netdna-webdesignerdepot-com.cdn.ampproject.org/i/s/netdna.webdesignerdepot.com/uploads/2014/05/thumbnail8.jpg"><br>Patterns come and patterns go. The ones that stick around the longest do as such since they take care of a specific issue. A pattern that is well known right presently for that very reason, is sticky components; components that act typically until we parchment, and after that keep up their nearness on the page by one means or another.<br>The pattern begun with sidebars, yet where it's truly developed in notoriety is headers. Why? Since headers have a tendency to contain route, and steady route is prevalent with clients.<br><br>In this instructional exercise we'll make a header that adheres to the highest point of the viewport, however so it doesn't meddle with the substance, will limit it when the client looks down the page.<br>This is what it will look like when we're set:<br>In the event that you'd get a kick out of the chance to take after alongside the code, you can&nbsp;<a href="http://netdna.webdesignerdepot.com/uploads7/how-to-create-an-animated-sticky-header-with-css3-and-jquery/download.zip" rel="noopener noreferer nofollow" target="_top">download it here.</a><br><br><br><h1>  The HTML<br></h1>The HTML for our illustration is truly straightforward, all we need is a h1 inside a header. Beneath that we have a picture to compel the page to scroll with the goal that we can test the impact.<br><br><pre><code>&lt;header&gt;&lt;h1&gt;Sticky Header&lt;/h1&gt;&lt;/header&gt; <br>&lt;img src="large-image.jpg" width="782" height="2000" alt="Big Image" /&gt;<br></code><br></pre><h1>  The jQuery<br></h1>CSS moves are the most ideal method for dealing with the activity segment of our sticky header. All we're utilizing jQuery for is recognizing the parchment position of the window.<br><br>At the point when the parchment position of the window is more prominent than 1—implying that the client has looked over downwards—then we need to include the class "sticky" to the header; else we need to expel it (if it's there). This implies we'll have the capacity to style the header in view of whether the "sticky" class is connected.<br><pre><code>$(window).scroll(function() { <br>if ($(this).scrollTop() &gt; 1){   <br>$('header').addClass("sticky"); <br>} <br>else{ <br>$('header').removeClass("sticky"); <br>} <br>});<br></code><span style="font-family: Times New Roman;"><span style="white-space: normal;"><br></span></span></pre>The vital thing to note is that utilizing jQuery along these lines debases nimbly; if JavaScript is crippled, the route will in any case work, the header will basically be styled in the non-sticky default state. <br><h1>  The CSS<br></h1>Our CSS is utilized to style the two unique expresses, the default state, and the "sticky" state; and to move between the two states.<br><br>To begin with, how about we include some basic styles that enhance the look of the header:<br><pre><code>header{ <br>position: fixed; <br>width: 100%; <br>text-align: center; <br>font-size: 72px; <br>line-height: 108px; <br>height: 108px; <br>background: #335C7D; <br>color: #fff; <br>font-family: 'PT Sans', sans-serif; <br>}<br></code><span style="font-family: Times New Roman;"><span style="white-space: normal;"><br></span></span></pre>Presently for the fun part: when the client looks down, the "sticky" class will be connected, and we can now style the header diversely to mirror that new need on the page. We likewise set the position to settled, with the goal that we're not changing situating mid-scroll.<br><br>There are a few things we need to do: initially, we need to change the size with the goal that it goes through less screen space; we additionally need to change the shading and adjust to one side so that outwardly it doesn't meddle excessively:<br><pre><code>header.sticky { <br>font-size: 24px; <br>line-height: 48px; <br>height: 48px; <br>background: #efc47D; <br>text-align: left; <br>padding-left: 20px; <br>}<br></code><span style="font-family: Times New Roman;"><span style="white-space: normal;"><br></span></span></pre>Actually, what you do here will rely on upon the plan you're attempting to accomplish. You can do pretty much anything you like.<br><br>On the off chance that you test this now, you'll see that the header changes when we look down.<br><br>Presently, to vitalize the change, we should simply set a move on the header, similar to so:<br><pre><code>transition: all 0.4s ease;<br></code><br></pre><h1>  Conclusion (Finally)<br></h1>Making this energized header with CSS3 properties and flipping the class with jQuery is to a great degree basic and includes a huge amount of UX goodness to your site outline.<br><br>In addition, the code corrupts smoothly, so there truly is no drawback to the usage.