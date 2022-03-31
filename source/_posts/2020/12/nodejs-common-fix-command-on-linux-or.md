---
author:
  nick: Dimas Lanjaka
  link: https://www.blogger.com/profile/07981649157148639830
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2020-12-31T15:11:00.003+07:00
lang: en
location: ""
modified: 2020-12-31T15:11:37.895+07:00
subtitle: NodeJS Common Fix Command On Linux Or Windows
tags:
  - Windows
  - Tips & Tricks
  - Linux/Unix
title: NodeJS Common Fix Command On Linux Or Windows
type: post
uuid: 3584efed-319f-4888-876a-74f129bb2333
webtitle: WMI Gitlab
updated: 2020-12-31T15:11:37+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: NodeJS Common Fix Command On Linux Or Windows
excerpt: NodeJS Common Fix Command On Linux Or Windows
wordcount: 94
---

<p></p><h3>Linux</h3> <pre class="bash"><br># add new repository<br>sudo add-apt-repository ppa:deadsnakes/ppa<br>sudo apt-get update -y<br>sudo apt install libgtk-3-0 -y<br>sudo apt install software-properties-common checkinstall -y<br>sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev build-essential libncurses5-dev libgmp-dev libnss3-dev wget -y<br><br># nodejs additional packages<br>npm install --global lerna node-pre-gyp typescript<br><br># python 2.7<br>sudo apt install python-minimal -y<br>sudo apt install python-pip -y<br><br># Install<br>npm --build-from-source install<br><br># Fix Chrome Sandbox<br>sudo chown root:root node_modules/electron/dist/chrome-sandbox<br>sudo chmod 4755 node_modules/electron/dist/chrome-sandbox<br><br># run<br>sudo npm run start<br></pre> <h3>Windows</h3><li>install <a href="https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools" rel="noopener noreferer nofollow">Visual Studio Installer</a></li><pre><br>npm config set msvs_version 2017 --global<br>npm i electron-builder-squirrel-windows electron-builder node-gyp electron electron-rebuild -g<br>node-gyp configure --msvs_version=2017<br>npm install --global --production windows-build-tools<br>npm install<br></pre> <p></p>