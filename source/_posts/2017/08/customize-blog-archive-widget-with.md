---
author:
  nick: Unknown
  link: ""
  email: noreply@blogger.com
category:
  - Programming
  - CSS
comments: true
cover: https://1.bp.blogspot.com/-GV7abCMrwuY/VFjH5bdO0II/AAAAAAAAHgI/zvsV7trZFXY/s1600/archive%2Bcopy.jpg
date: 2017-08-03T16:06:00.000+07:00
lang: en
location: ""
modified: 2017-08-03T16:06:00.348+07:00
subtitle: The Blog Document gadget is one of Bloggers legitimate gadgets. The
  main issue with the default Blog File gadget is that it will take up
tags:
  - CSS
  - Blogger
title: Customize Blog Archive Widget With Scrollbar
type: post
uuid: 07b42ba8-12ac-4888-8539-1a68544878e7
webtitle: WMI Gitlab
updated: 2017-08-03T16:06:00+07:00
thumbnail: https://1.bp.blogspot.com/-GV7abCMrwuY/VFjH5bdO0II/AAAAAAAAHgI/zvsV7trZFXY/s1600/archive%2Bcopy.jpg
photos:
  - https://1.bp.blogspot.com/-GV7abCMrwuY/VFjH5bdO0II/AAAAAAAAHgI/zvsV7trZFXY/s1600/archive%2Bcopy.jpg
description: The Blog Document gadget is one of Bloggers legitimate gadgets. The
  main issue with the default Blog File gadget is that it will take up
excerpt: The Blog Document gadget is one of Bloggers legitimate gadgets. The
  main issue with the default Blog File gadget is that it will take up
wordcount: 318
---

<h3>How Can You Style the Blog Archive Widget With Scrollbar</h3><div><div><a href="https://1.bp.blogspot.com/-GV7abCMrwuY/VFjH5bdO0II/AAAAAAAAHgI/zvsV7trZFXY/s1600/archive%2Bcopy.jpg" rel="noopener noreferer nofollow"><img alt="Scrollable Blog Archive widget by Anjana" border="0" src="https://1.bp.blogspot.com/-GV7abCMrwuY/VFjH5bdO0II/AAAAAAAAHgI/zvsV7trZFXY/s1600/archive%2Bcopy.jpg" title="Scrollable Blog Archive widget"></a></div>The Blog Document gadget is one of Blogger's legitimate gadgets. The main issue with the default Blog File gadget is that it will take up an extensive space when you have many number of posts on your blog. Here comes the need of a scrollable Blog Chronicle gadget. Immaculate CSS is utilized to style this gadget. Here I have utilized the Level Rundown style.<br><br></div><div></div><div><strong>Step 1: Adding the Blog Archive Widget to Your Blog</strong></div><br><div>Go to your Blog's Dashboard --&gt; Layout--&gt; Add a Gadget and select Blog Archive from the list.<br><a href="https://draft.blogger.com/null" name="more" rel="noopener noreferer nofollow"></a></div><div></div><div><a href="https://2.bp.blogspot.com/-jpOSPDZEpGI/VFjgTZZ65XI/AAAAAAAAHgY/2Y7jOF63hHE/s1600/Untitled-1%2Bcopy.jpg" rel="noopener noreferer nofollow"><img alt="configuring the blog archive widget by Anjana" border="0" height="287" src="https://2.bp.blogspot.com/-jpOSPDZEpGI/VFjgTZZ65XI/AAAAAAAAHgY/2Y7jOF63hHE/s280/Untitled-1%2Bcopy.jpg" title="configuring the blog archive widget" width="280"></a></div><br><div>Don't forget to select Flat List Style. Select the Date Format you prefer from the drop down list and save the Gadget.</div><br><div><strong>Step II: Replacing the Default CSS (&nbsp;<em>If you are using Simple or Travel Template, ignore Step II and go to Step III&nbsp;</em>)</strong></div><br><div>From your Blog's Dashboard, explore to Layout. Tap on the Reinforcement/Reestablish catch on upper right and take a reinforcement of the layout. Presently click Alter HTML.</div><br><div>(i): Press Ctrl+F and search for "<em>Archive</em>". You may find the below code:</div><br><em>.main-inner .widget ul, .main-inner .widget #ArchiveList ul.flat {code}&nbsp;</em><br><br>Please be careful while editing the template. We need to delete the part "&nbsp;<em>, .main-inner .widget #ArchiveList ul.flat</em>" from the above code.<br><br>(ii) Now you could see another code which look like the below one:<br><br><em>.main-inner .widget ul li, .main-inner .widget #ArchiveList ul.flat li {code}&nbsp;</em><br><br>Carefully delete "<em>, .main-inner .widget #ArchiveList ul.flat li</em>" from the above code.<br><br>(iii) Press Ctrl+F and search for "&nbsp;<em>.main-inner .widget #ArchiveList ul li</em>". You may find something similar to the below code (Only some templates have this code):<br><br><em>.main-inner .widget #ArchiveList ul li {padding-top: .25em; padding-bottom: .25em;}&nbsp;</em><br><br><div>Delete the above code.</div><br><strong>Step III: Adding CSS</strong><br><br>Okay. Now Press Ctrl+F and search for "]]&gt;&lt;/b:skin&gt;". Add the below code above "]]&gt;&lt;/b:skin&gt;".<br><br><pre class="css"><em>.BlogArchive .widget-content {margin:0; padding:0;}</em><br><em>.BlogArchive #ArchiveList {height: 142px; overflow: auto;}</em><br><em>.main-inner .widget #ArchiveList {margin: 0; padding:0; border: 1px ridge #999;}&nbsp;</em><br><em>.BlogArchive #ArchiveList ul{margin:0; padding:8px 8px 0 8px;}</em><br><em>.main-inner .widget #ArchiveList ul.flat li {padding:8px 0 8px 0;}</em><br><em>.main-inner .widget #ArchiveList ul.flat li a {font:14px Verdana; text-decoration:none; color:#666;}&nbsp;</em></pre><br><div>Now Save the Template.<br><br>Done. I hope this article be help you. Please share ya...</div>