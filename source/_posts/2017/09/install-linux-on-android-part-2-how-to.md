---
author:
  nick: Dimas Lanjaka 2
  link: https://www.blogger.com/profile/08197822797622284515
  email: noreply@blogger.com
category:
  - Programming
  - MYSQL
comments: true
cover: https://image.ibb.co/fFtDUF/unnamed_5.png
date: 2017-09-02T23:46:00.000+07:00
lang: en
location: ""
modified: 2017-09-02T23:46:07.062+07:00
subtitle: Install Linux on the Android part 2-How to Install Apache2, PHP and
  MYSQL on Android
tags:
  - Android
  - Tips & Tricks
  - MySQL
title: Install Linux on the Android part 2-How to Install Apache2, PHP and MYSQL
  on Android
type: post
uuid: 93d9745f-e9ee-4888-8cf1-9379fe986077
webtitle: WMI Gitlab
updated: 2017-09-02T23:46:07+07:00
thumbnail: https://image.ibb.co/fFtDUF/unnamed_5.png
photos:
  - https://image.ibb.co/fFtDUF/unnamed_5.png
description: Install Linux on the Android part 2-How to Install Apache2, PHP and
  MYSQL on Android
excerpt: Install Linux on the Android part 2-How to Install Apache2, PHP and
  MYSQL on Android
wordcount: 673
---

<h3 lang="en">    Install Linux on the Android part 2-How to Install Apache2, PHP and MYSQL     on Android<div class="separator" style="clear: both; text-align: center;"><a href="https://image.ibb.co/fFtDUF/unnamed_5.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="411" data-original-width="358" height="320" src="https://image.ibb.co/fFtDUF/unnamed_5.png" width="278"></a></div></h3><div><div></div></div><div id="artikel"><div>There are a few applications to run the AMP (Apache, Mysql, PHP) on             android smartphone, but the features are dimikiki by that             application is very limited. Some of the features in php like some             framework, the composer, the database migration cannot be used. To             be able to run it all then we have to do linux installation first             android system. Usually the widely used linux is ubuntu, ubuntu             installed only after we can install apache2, php and mysql.         </div><div></div><div>To install ubuntu in the android system, we can use the linux             deploy applications. For the tutorial can be found             <a href="https://web-manajemen.blogspot.com/2017/09/install-linux-on-android-part-1-running.html" rel="nofollow" target="_blank">                here            </a>            . After ubuntu installed in the android system, we can proceed with             installing apache2, php and mysql. The trick is:         </div><div></div><div>1. Open a terminal, and log in as user root by way of typing             commands         </div><div></div><div>sudo-i         </div><div></div><div>then enter         </div><div></div><div>2. Update the repository by way of typing commands         </div><div>apt-get update (enter)         </div><div></div><div>Until here we are ready to do the installation.         </div><div></div><div>3. install apache2         </div><div></div><div>apt-get install apache2 libapache2-mod-php (enter)         </div><div></div><div>4. install php         </div><div></div><div>apt-get install php (enter)         <br>If we want to use the framework, usually the framework requires some additional php plugins, such as php-zip etc. Note what plugins are needed, then install. As a note plugin can be installed later. We just do the installation as follows:<br>apt-get install php-curl php-cli php-mbstring php-zip php-gettext             (enter)         </div><div></div><div>5. install mysql-server         </div><div></div><div>apt-get install mysql-server (enter)         </div><div></div><div>6. install the mysql tool like phpmyadmin and mysql workbench         </div><div></div><div>apt-get install phpmyadmin (enter)         </div><div>apt-get install mysql-workbench (enter)         </div><div></div><div></div><div>If the installation process there is unmet dependency error             messages, and we are asked to type the command apt-get-f install,             thentype command         </div><div></div><div>apt-get-f install (enter)         </div><div></div><div>But if the installation goes smoothly, the above command does not             need to be run.         <br>On ubuntu with linux normally deploy apache2 and mysql is not             running automatically, therefore it must berun manually dengan how             to mengetik's command:         <br>Service apache2 start (enter)         <br>mysql service start (enter)         <br><br></div><div></div><div>The tutorial install apache2, php, and mysql in android. May be             useful.         </div></div>
