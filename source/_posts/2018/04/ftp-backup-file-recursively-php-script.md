---
author:
  nick: Dimas Lanjaka 2
  link: https://www.blogger.com/profile/08197822797622284515
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://i.ytimg.com/vi/UJ2O4SRxwkA/maxresdefault.jpg
date: 2018-04-05T23:33:00.000+07:00
lang: en
location: ""
modified: 2018-04-05T23:34:19.535+07:00
subtitle: FTP Backup File Recursively PHP Script
tags:
  - Hosting
  - Script
  - PHP
title: FTP Backup File Recursively PHP Script
type: post
uuid: b0bbaa57-3fc2-4888-8b44-07e3d3ee0f41
webtitle: WMI Gitlab
updated: 2018-04-05T23:34:19+07:00
thumbnail: https://i.ytimg.com/vi/UJ2O4SRxwkA/maxresdefault.jpg
photos:
  - https://i.ytimg.com/vi/UJ2O4SRxwkA/maxresdefault.jpg
description: FTP Backup File Recursively PHP Script
excerpt: FTP Backup File Recursively PHP Script
wordcount: 271
---

<center><h2>FTP FILE BACKUP RECURSIVELY</h2><div><img src="https://i.ytimg.com/vi/UJ2O4SRxwkA/maxresdefault.jpg"></div></center> <ol><li>Auto Zipping All files Inside Directory</li><li>Auto Send Zipped files to FTP at once</li><li>Auto Cleaning sent Zipped files on local storage</li></ol><pre rel="copyright script"><br>&lt;?php<br>define("user", "username_ftp", true); //Your FTP Username<br>define("password", "password_ftp", true); //Your FTP Password<br>define("host", "host_ftp", true); //eg: ftp.drivehq.com<br>define("port", "21", true); //default ftp port is 21<br><br>/*** Script_By_Dimas_Lanjaka ***/<br>if (defined("user") &amp;&amp; defined("password") &amp;&amp; defined("host")){<br>// Get real path for our folder// Get real path fo <br>$rootPath = realpath(__DIR__);<br>//array_map('unlink', glob("$rootPath*.zip"));<br><br>// Initialize archive object<br>$zip = new ZipArchive();<br>$cdate = str_replace('.', '-', $_SERVER['HTTP_HOST']);<br>$zip-&gt;open($cdate . '.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);<br><br>// Create recursive directory iterator<br>/** @var SplFileInfo[] $files */<br>$files = new RecursiveIteratorIterator(<br>    new RecursiveDirectoryIterator($rootPath),<br>    RecursiveIteratorIterator::LEAVES_ONLY<br>);<br><br>foreach ($files as $name =&gt; $file)<br>{<br>    // Skip directories (they would be added automatically)<br>    if (!$file-&gt;isDir())<br>    {<br>        // Get real and relative path for current file<br>        $filePath = $file-&gt;getRealPath();<br>        $relativePath = substr($filePath, strlen($rootPath) + 1);<br><br>        // Add current file to archive<br>        $zip-&gt;addFile($filePath, $relativePath);<br>    }<br>}<br><br>// Zip archive will be created only after closing object<br>$zip-&gt;close();<br><br>function sendfile($file){<br>$host = host;<br>$port = port;<br>$timeout = "60";<br>$user = user;<br>$pass = password;<br>$dest_file = $file;<br>$source_file = $file;<br>$ftp = ftp_connect($host,$port,$timeout);<br>ftp_login($ftp,$user,$pass);<br>ftp_pasv($ftp, true);<br><br>//if (ftp_delete($ftp, $file)) {<br>$ret = ftp_nb_put($ftp, $dest_file, $source_file, FTP_BINARY, FTP_AUTORESUME);<br>//}<br><br>while (FTP_MOREDATA == $ret)<br>    {<br>        // display progress bar, or someting<br>        $ret = ftp_nb_continue($ftp);<br>    }<br>}<br><br>function list_zipfiles($mydirectory) {<br><br>    // directory we want to scan<br>    $dircontents = scandir($mydirectory);<br><br>    // list the contents<br>    echo '&lt;ul&gt;';<br>    foreach ($dircontents as $file) {<br>        $extension = pathinfo($file, PATHINFO_EXTENSION);<br>        if ($extension == 'zip') {<br>            echo "&lt;center&gt;&lt;li&gt;$file Backup Successfully&lt;/li&gt;&lt;/center&gt;";<br>sendfile($file);<br>unlink($file);<br>        }<br>    }<br>    echo '&lt;/ul&gt;';<br>}<br>?&gt;<br>&lt;!DOCTYPE HTML&gt;<br>&lt;html&gt;<br>&lt;head&gt;<br>&lt;title&gt;Backup File Recursively&lt;/title&gt;<br>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;<br>&lt;/head&gt;<br>&lt;body&gt;<br>&lt;h6 class="header1"&gt;PRODUCTION&lt;/h6&gt;<br>&lt;hr class="style1"&gt;<br>&lt;?php<br>call_user_func('list_zipfiles', "./");<br>}<br>?&gt;<br>&lt;/body&gt;<br>&lt;/html&gt;<br>&lt;?php /*** Mohon Jangan Hapus Credit Copyright | Please Dont Remove Copyright Credits ***/ ?&gt;<br></pre>